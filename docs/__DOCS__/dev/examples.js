var app = (function (exports) {
  'use strict';

  let raf = null;
  function requestAnimationFrame (callback) {
    if (!raf) {
      raf = (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          return setTimeout(callback, 16)
        }
      ).bind(window);
    }
    return raf(callback)
  }

  let caf = null;
  function cancelAnimationFrame (id) {
    if (!caf) {
      caf = (
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        function (id) {
          clearTimeout(id);
        }
      ).bind(window);
    }

    caf(id);
  }

  function createStyles (styleText) {
    var style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = styleText;
    } else {
      style.appendChild(document.createTextNode(styleText));
    }
    (document.querySelector('head') || document.body).appendChild(style);
    return style
  }

  function createElement (tagName, props = {}) {
    let elem = document.createElement(tagName);
    Object.keys(props).forEach(key => {
      elem[key] = props[key];
    });
    return elem
  }

  function getComputedStyle (elem, prop, pseudo) {
    // for older versions of Firefox, `getComputedStyle` required
    // the second argument and may return `null` for some elements
    // when `display: none`
    let computedStyle = window.getComputedStyle(elem, pseudo || null) || {
      display: 'none'
    };

    return computedStyle[prop]
  }

  function getRenderInfo (elem) {
    if (!document.documentElement.contains(elem)) {
      return {
        detached: true,
        rendered: false
      }
    }

    let current = elem;
    while (current !== document) {
      if (getComputedStyle(current, 'display') === 'none') {
        return {
          detached: false,
          rendered: false
        }
      }
      current = current.parentNode;
    }

    return {
      detached: false,
      rendered: true
    }
  }

  var css = ".resize-triggers{visibility:hidden;opacity:0;pointer-events:none}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:\"\";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}";

  let total = 0;

  function addListener (elem, callback) {
    if (!elem.__resize_mutation_handler__) {
      elem.__resize_mutation_handler__ = handleMutation.bind(elem);
    }

    let listeners = elem.__resize_listeners__;

    if (!listeners) {
      elem.__resize_listeners__ = [];
      if (window.ResizeObserver) {
        let { offsetWidth, offsetHeight } = elem;
        let ro = new ResizeObserver(() => {
          if (!elem.__resize_observer_triggered__) {
            elem.__resize_observer_triggered__ = true;
            if (elem.offsetWidth === offsetWidth && elem.offsetHeight === offsetHeight) {
              return
            }
          }
          runCallbacks(elem);
        });

        // initially display none won't trigger ResizeObserver callback
        let { detached, rendered } = getRenderInfo(elem);
        elem.__resize_observer_triggered__ = detached === false && rendered === false;
        elem.__resize_observer__ = ro;
        ro.observe(elem);
      } else if (elem.attachEvent && elem.addEventListener) {
        // targeting IE9/10
        elem.__resize_legacy_resize_handler__ = function handleLegacyResize () {
          runCallbacks(elem);
        };
        elem.attachEvent('onresize', elem.__resize_legacy_resize_handler__);
        document.addEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
      } else {
        if (!total) {
          createStyles(css);
        }
        initTriggers(elem);

        elem.__resize_rendered__ = getRenderInfo(elem).rendered;
        if (window.MutationObserver) {
          let mo = new MutationObserver(elem.__resize_mutation_handler__);
          mo.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
          elem.__resize_mutation_observer__ = mo;
        }
      }
    }

    elem.__resize_listeners__.push(callback);
    total++;
  }

  function getUpdatedSize (elem) {
    let { width, height } = elem.__resize_last__;
    let { offsetWidth, offsetHeight } = elem;
    if (offsetWidth !== width || offsetHeight !== height) {
      return {
        width: offsetWidth,
        height: offsetHeight
      }
    }
    return null
  }

  function handleMutation () {
    // `this` denotes the scrolling element
    let { rendered, detached } = getRenderInfo(this);
    if (rendered !== this.__resize_rendered__) {
      if (!detached && this.__resize_triggers__) {
        resetTriggers(this);
        this.addEventListener('scroll', handleScroll, true);
      }
      this.__resize_rendered__ = rendered;
      runCallbacks(this);
    }
  }

  function handleScroll () {
    // `this` denotes the scrolling element
    resetTriggers(this);
    if (this.__resize_raf__) {
      cancelAnimationFrame(this.__resize_raf__);
    }
    this.__resize_raf__ = requestAnimationFrame(() => {
      let updated = getUpdatedSize(this);
      if (updated) {
        this.__resize_last__ = updated;
        runCallbacks(this);
      }
    });
  }

  function runCallbacks (elem) {
    if (!elem || !elem.__resize_listeners__) {
      return
    }
    elem.__resize_listeners__.forEach(callback => {
      callback.call(elem, elem);
    });
  }

  function initTriggers (elem) {
    let position = getComputedStyle(elem, 'position');
    if (!position || position === 'static') {
      elem.style.position = 'relative';
    }

    elem.__resize_old_position__ = position;
    elem.__resize_last__ = {};

    let triggers = createElement('div', {
      className: 'resize-triggers'
    });
    let expand = createElement('div', {
      className: 'resize-expand-trigger'
    });
    let expandChild = createElement('div');
    let contract = createElement('div', {
      className: 'resize-contract-trigger'
    });
    expand.appendChild(expandChild);
    triggers.appendChild(expand);
    triggers.appendChild(contract);
    elem.appendChild(triggers);

    elem.__resize_triggers__ = {
      triggers,
      expand,
      expandChild,
      contract
    };

    resetTriggers(elem);
    elem.addEventListener('scroll', handleScroll, true);

    elem.__resize_last__ = {
      width: elem.offsetWidth,
      height: elem.offsetHeight
    };
  }

  function resetTriggers (elem) {
    let { expand, expandChild, contract } = elem.__resize_triggers__;

    // batch read
    let { scrollWidth: csw, scrollHeight: csh } = contract;
    let { offsetWidth: eow, offsetHeight: eoh, scrollWidth: esw, scrollHeight: esh } = expand;

    // batch write
    contract.scrollLeft = csw;
    contract.scrollTop = csh;
    expandChild.style.width = eow + 1 + 'px';
    expandChild.style.height = eoh + 1 + 'px';
    expand.scrollLeft = esw;
    expand.scrollTop = esh;
  }

  let iframe_id = 0;

  function getHeight(){
      return document.documentElement.offsetHeight
  }

  window.addEventListener('message', function (event) {
      if (event.data.hasOwnProperty("COMPONENT")) {
          const Example = app[event.data.COMPONENT];
          iframe_id = event.data.iframe_id;
   

          addListener(document.body, (e)=>{
              event.source.postMessage({ 'HEIGHT': getHeight(), iframe_id }, "*");
          });

          new Example({
              target: document.body,
              props: {}
          });    
      }
  });

  function noop$1() { }
  function run$1(fn) {
      return fn();
  }
  function blank_object$1() {
      return Object.create(null);
  }
  function run_all$1(fns) {
      fns.forEach(run$1);
  }
  function is_function$1(thing) {
      return typeof thing === 'function';
  }
  function safe_not_equal$1(a, b) {
      return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
  }
  function is_empty$1(obj) {
      return Object.keys(obj).length === 0;
  }

  // Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
  // at the end of hydration without touching the remaining nodes.
  let is_hydrating = false;
  function start_hydrating() {
      is_hydrating = true;
  }
  function end_hydrating() {
      is_hydrating = false;
  }
  function upper_bound(low, high, key, value) {
      // Return first index of value larger than input value in the range [low, high)
      while (low < high) {
          const mid = low + ((high - low) >> 1);
          if (key(mid) <= value) {
              low = mid + 1;
          }
          else {
              high = mid;
          }
      }
      return low;
  }
  function init_hydrate(target) {
      if (target.hydrate_init)
          return;
      target.hydrate_init = true;
      // We know that all children have claim_order values since the unclaimed have been detached
      const children = target.childNodes;
      /*
      * Reorder claimed children optimally.
      * We can reorder claimed children optimally by finding the longest subsequence of
      * nodes that are already claimed in order and only moving the rest. The longest
      * subsequence subsequence of nodes that are claimed in order can be found by
      * computing the longest increasing subsequence of .claim_order values.
      *
      * This algorithm is optimal in generating the least amount of reorder operations
      * possible.
      *
      * Proof:
      * We know that, given a set of reordering operations, the nodes that do not move
      * always form an increasing subsequence, since they do not move among each other
      * meaning that they must be already ordered among each other. Thus, the maximal
      * set of nodes that do not move form a longest increasing subsequence.
      */
      // Compute longest increasing subsequence
      // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
      const m = new Int32Array(children.length + 1);
      // Predecessor indices + 1
      const p = new Int32Array(children.length);
      m[0] = -1;
      let longest = 0;
      for (let i = 0; i < children.length; i++) {
          const current = children[i].claim_order;
          // Find the largest subsequence length such that it ends in a value less than our current value
          // upper_bound returns first greater value, so we subtract one
          const seqLen = upper_bound(1, longest + 1, idx => children[m[idx]].claim_order, current) - 1;
          p[i] = m[seqLen] + 1;
          const newLen = seqLen + 1;
          // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
          m[newLen] = i;
          longest = Math.max(newLen, longest);
      }
      // The longest increasing subsequence of nodes (initially reversed)
      const lis = [];
      // The rest of the nodes, nodes that will be moved
      const toMove = [];
      let last = children.length - 1;
      for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
          lis.push(children[cur - 1]);
          for (; last >= cur; last--) {
              toMove.push(children[last]);
          }
          last--;
      }
      for (; last >= 0; last--) {
          toMove.push(children[last]);
      }
      lis.reverse();
      // We sort the nodes being moved to guarantee that their insertion order matches the claim order
      toMove.sort((a, b) => a.claim_order - b.claim_order);
      // Finally, we move the nodes
      for (let i = 0, j = 0; i < toMove.length; i++) {
          while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
              j++;
          }
          const anchor = j < lis.length ? lis[j] : null;
          target.insertBefore(toMove[i], anchor);
      }
  }
  function append$1(target, node) {
      if (is_hydrating) {
          init_hydrate(target);
          if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
              target.actual_end_child = target.firstChild;
          }
          if (node !== target.actual_end_child) {
              target.insertBefore(node, target.actual_end_child);
          }
          else {
              target.actual_end_child = node.nextSibling;
          }
      }
      else if (node.parentNode !== target) {
          target.appendChild(node);
      }
  }
  function insert$1(target, node, anchor) {
      if (is_hydrating && !anchor) {
          append$1(target, node);
      }
      else if (node.parentNode !== target || (anchor && node.nextSibling !== anchor)) {
          target.insertBefore(node, anchor || null);
      }
  }
  function detach$1(node) {
      node.parentNode.removeChild(node);
  }
  function text$1(data) {
      return document.createTextNode(data);
  }
  function space() {
      return text$1(' ');
  }
  function children$1(element) {
      return Array.from(element.childNodes);
  }

  let current_component$1;
  function set_current_component$1(component) {
      current_component$1 = component;
  }

  const dirty_components$1 = [];
  const binding_callbacks$1 = [];
  const render_callbacks$1 = [];
  const flush_callbacks$1 = [];
  const resolved_promise$1 = Promise.resolve();
  let update_scheduled$1 = false;
  function schedule_update$1() {
      if (!update_scheduled$1) {
          update_scheduled$1 = true;
          resolved_promise$1.then(flush$1);
      }
  }
  function add_render_callback$1(fn) {
      render_callbacks$1.push(fn);
  }
  let flushing$1 = false;
  const seen_callbacks$1 = new Set();
  function flush$1() {
      if (flushing$1)
          return;
      flushing$1 = true;
      do {
          // first, call beforeUpdate functions
          // and update components
          for (let i = 0; i < dirty_components$1.length; i += 1) {
              const component = dirty_components$1[i];
              set_current_component$1(component);
              update$1(component.$$);
          }
          set_current_component$1(null);
          dirty_components$1.length = 0;
          while (binding_callbacks$1.length)
              binding_callbacks$1.pop()();
          // then, once components are updated, call
          // afterUpdate functions. This may cause
          // subsequent updates...
          for (let i = 0; i < render_callbacks$1.length; i += 1) {
              const callback = render_callbacks$1[i];
              if (!seen_callbacks$1.has(callback)) {
                  // ...so guard against infinite loops
                  seen_callbacks$1.add(callback);
                  callback();
              }
          }
          render_callbacks$1.length = 0;
      } while (dirty_components$1.length);
      while (flush_callbacks$1.length) {
          flush_callbacks$1.pop()();
      }
      update_scheduled$1 = false;
      flushing$1 = false;
      seen_callbacks$1.clear();
  }
  function update$1($$) {
      if ($$.fragment !== null) {
          $$.update();
          run_all$1($$.before_update);
          const dirty = $$.dirty;
          $$.dirty = [-1];
          $$.fragment && $$.fragment.p($$.ctx, dirty);
          $$.after_update.forEach(add_render_callback$1);
      }
  }
  const outroing$1 = new Set();
  let outros;
  function transition_in$1(block, local) {
      if (block && block.i) {
          outroing$1.delete(block);
          block.i(local);
      }
  }
  function transition_out(block, local, detach, callback) {
      if (block && block.o) {
          if (outroing$1.has(block))
              return;
          outroing$1.add(block);
          outros.c.push(() => {
              outroing$1.delete(block);
              if (callback) {
                  if (detach)
                      block.d(1);
                  callback();
              }
          });
          block.o(local);
      }
  }
  function create_component(block) {
      block && block.c();
  }
  function mount_component$1(component, target, anchor, customElement) {
      const { fragment, on_mount, on_destroy, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      if (!customElement) {
          // onMount happens before the initial afterUpdate
          add_render_callback$1(() => {
              const new_on_destroy = on_mount.map(run$1).filter(is_function$1);
              if (on_destroy) {
                  on_destroy.push(...new_on_destroy);
              }
              else {
                  // Edge case - component was destroyed immediately,
                  // most likely as a result of a binding initialising
                  run_all$1(new_on_destroy);
              }
              component.$$.on_mount = [];
          });
      }
      after_update.forEach(add_render_callback$1);
  }
  function destroy_component$1(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
          run_all$1($$.on_destroy);
          $$.fragment && $$.fragment.d(detaching);
          // TODO null out other refs, including component.$$ (but need to
          // preserve final state?)
          $$.on_destroy = $$.fragment = null;
          $$.ctx = [];
      }
  }
  function make_dirty$1(component, i) {
      if (component.$$.dirty[0] === -1) {
          dirty_components$1.push(component);
          schedule_update$1();
          component.$$.dirty.fill(0);
      }
      component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
  }
  function init$1(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
      const parent_component = current_component$1;
      set_current_component$1(component);
      const $$ = component.$$ = {
          fragment: null,
          ctx: null,
          // state
          props,
          update: noop$1,
          not_equal,
          bound: blank_object$1(),
          // lifecycle
          on_mount: [],
          on_destroy: [],
          on_disconnect: [],
          before_update: [],
          after_update: [],
          context: new Map(parent_component ? parent_component.$$.context : options.context || []),
          // everything else
          callbacks: blank_object$1(),
          dirty,
          skip_bound: false
      };
      let ready = false;
      $$.ctx = instance
          ? instance(component, options.props || {}, (i, ret, ...rest) => {
              const value = rest.length ? rest[0] : ret;
              if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                  if (!$$.skip_bound && $$.bound[i])
                      $$.bound[i](value);
                  if (ready)
                      make_dirty$1(component, i);
              }
              return ret;
          })
          : [];
      $$.update();
      ready = true;
      run_all$1($$.before_update);
      // `false` as a special case of no DOM component
      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
      if (options.target) {
          if (options.hydrate) {
              start_hydrating();
              const nodes = children$1(options.target);
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.l(nodes);
              nodes.forEach(detach$1);
          }
          else {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.c();
          }
          if (options.intro)
              transition_in$1(component.$$.fragment);
          mount_component$1(component, options.target, options.anchor, options.customElement);
          end_hydrating();
          flush$1();
      }
      set_current_component$1(parent_component);
  }
  /**
   * Base class for Svelte components. Used when dev=false.
   */
  class SvelteComponent$1 {
      $destroy() {
          destroy_component$1(this, 1);
          this.$destroy = noop$1;
      }
      $on(type, callback) {
          const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
          callbacks.push(callback);
          return () => {
              const index = callbacks.indexOf(callback);
              if (index !== -1)
                  callbacks.splice(index, 1);
          };
      }
      $set($$props) {
          if (this.$$set && !is_empty$1($$props)) {
              this.$$.skip_bound = true;
              this.$$set($$props);
              this.$$.skip_bound = false;
          }
      }
  }

  function noop() { }
  function run(fn) {
      return fn();
  }
  function blank_object() {
      return Object.create(null);
  }
  function run_all(fns) {
      fns.forEach(run);
  }
  function is_function(thing) {
      return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
      return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
  }
  function is_empty(obj) {
      return Object.keys(obj).length === 0;
  }

  function append(target, node) {
      target.appendChild(node);
  }
  function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
  }
  function detach(node) {
      node.parentNode.removeChild(node);
  }
  function element(name) {
      return document.createElement(name);
  }
  function text(data) {
      return document.createTextNode(data);
  }
  function attr(node, attribute, value) {
      if (value == null)
          node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
          node.setAttribute(attribute, value);
  }
  function children(element) {
      return Array.from(element.childNodes);
  }
  function set_data(text, data) {
      data = '' + data;
      if (text.wholeText !== data)
          text.data = data;
  }
  function toggle_class(element, name, toggle) {
      element.classList[toggle ? 'add' : 'remove'](name);
  }

  let current_component;
  function set_current_component(component) {
      current_component = component;
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
      if (!update_scheduled) {
          update_scheduled = true;
          resolved_promise.then(flush);
      }
  }
  function add_render_callback(fn) {
      render_callbacks.push(fn);
  }
  let flushing = false;
  const seen_callbacks = new Set();
  function flush() {
      if (flushing)
          return;
      flushing = true;
      do {
          // first, call beforeUpdate functions
          // and update components
          for (let i = 0; i < dirty_components.length; i += 1) {
              const component = dirty_components[i];
              set_current_component(component);
              update(component.$$);
          }
          set_current_component(null);
          dirty_components.length = 0;
          while (binding_callbacks.length)
              binding_callbacks.pop()();
          // then, once components are updated, call
          // afterUpdate functions. This may cause
          // subsequent updates...
          for (let i = 0; i < render_callbacks.length; i += 1) {
              const callback = render_callbacks[i];
              if (!seen_callbacks.has(callback)) {
                  // ...so guard against infinite loops
                  seen_callbacks.add(callback);
                  callback();
              }
          }
          render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
          flush_callbacks.pop()();
      }
      update_scheduled = false;
      flushing = false;
      seen_callbacks.clear();
  }
  function update($$) {
      if ($$.fragment !== null) {
          $$.update();
          run_all($$.before_update);
          const dirty = $$.dirty;
          $$.dirty = [-1];
          $$.fragment && $$.fragment.p($$.ctx, dirty);
          $$.after_update.forEach(add_render_callback);
      }
  }
  const outroing = new Set();
  function transition_in(block, local) {
      if (block && block.i) {
          outroing.delete(block);
          block.i(local);
      }
  }
  function mount_component(component, target, anchor, customElement) {
      const { fragment, on_mount, on_destroy, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      if (!customElement) {
          // onMount happens before the initial afterUpdate
          add_render_callback(() => {
              const new_on_destroy = on_mount.map(run).filter(is_function);
              if (on_destroy) {
                  on_destroy.push(...new_on_destroy);
              }
              else {
                  // Edge case - component was destroyed immediately,
                  // most likely as a result of a binding initialising
                  run_all(new_on_destroy);
              }
              component.$$.on_mount = [];
          });
      }
      after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
          run_all($$.on_destroy);
          $$.fragment && $$.fragment.d(detaching);
          // TODO null out other refs, including component.$$ (but need to
          // preserve final state?)
          $$.on_destroy = $$.fragment = null;
          $$.ctx = [];
      }
  }
  function make_dirty(component, i) {
      if (component.$$.dirty[0] === -1) {
          dirty_components.push(component);
          schedule_update();
          component.$$.dirty.fill(0);
      }
      component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
  }
  function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
      const parent_component = current_component;
      set_current_component(component);
      const $$ = component.$$ = {
          fragment: null,
          ctx: null,
          // state
          props,
          update: noop,
          not_equal,
          bound: blank_object(),
          // lifecycle
          on_mount: [],
          on_destroy: [],
          on_disconnect: [],
          before_update: [],
          after_update: [],
          context: new Map(parent_component ? parent_component.$$.context : options.context || []),
          // everything else
          callbacks: blank_object(),
          dirty,
          skip_bound: false
      };
      let ready = false;
      $$.ctx = instance
          ? instance(component, options.props || {}, (i, ret, ...rest) => {
              const value = rest.length ? rest[0] : ret;
              if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                  if (!$$.skip_bound && $$.bound[i])
                      $$.bound[i](value);
                  if (ready)
                      make_dirty(component, i);
              }
              return ret;
          })
          : [];
      $$.update();
      ready = true;
      run_all($$.before_update);
      // `false` as a special case of no DOM component
      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
      if (options.target) {
          if (options.hydrate) {
              const nodes = children(options.target);
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.l(nodes);
              nodes.forEach(detach);
          }
          else {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.c();
          }
          if (options.intro)
              transition_in(component.$$.fragment);
          mount_component(component, options.target, options.anchor, options.customElement);
          flush();
      }
      set_current_component(parent_component);
  }
  /**
   * Base class for Svelte components. Used when dev=false.
   */
  class SvelteComponent {
      $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
      }
      $on(type, callback) {
          const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
          callbacks.push(callback);
          return () => {
              const index = callbacks.indexOf(callback);
              if (index !== -1)
                  callbacks.splice(index, 1);
          };
      }
      $set($$props) {
          if (this.$$set && !is_empty($$props)) {
              this.$$.skip_bound = true;
              this.$$set($$props);
              this.$$.skip_bound = false;
          }
      }
  }

  /* src/Button.svelte generated by Svelte v3.38.2 */

  function create_fragment$1(ctx) {
  	let button;
  	let t;

  	return {
  		c() {
  			button = element("button");
  			t = text(/*label*/ ctx[0]);
  			attr(button, "class", "iroco-ui-button svelte-1mekbzs");
  			attr(button, "type", /*type*/ ctx[1]);
  			button.disabled = /*disabled*/ ctx[2];
  			toggle_class(button, "disabled", /*disabled*/ ctx[2]);
  		},
  		m(target, anchor) {
  			insert(target, button, anchor);
  			append(button, t);
  		},
  		p(ctx, [dirty]) {
  			if (dirty & /*label*/ 1) set_data(t, /*label*/ ctx[0]);

  			if (dirty & /*type*/ 2) {
  				attr(button, "type", /*type*/ ctx[1]);
  			}

  			if (dirty & /*disabled*/ 4) {
  				button.disabled = /*disabled*/ ctx[2];
  			}

  			if (dirty & /*disabled*/ 4) {
  				toggle_class(button, "disabled", /*disabled*/ ctx[2]);
  			}
  		},
  		i: noop,
  		o: noop,
  		d(detaching) {
  			if (detaching) detach(button);
  		}
  	};
  }

  function instance$1($$self, $$props, $$invalidate) {
  	let { label } = $$props;
  	let { type } = $$props;
  	let { disabled = false } = $$props;

  	$$self.$$set = $$props => {
  		if ("label" in $$props) $$invalidate(0, label = $$props.label);
  		if ("type" in $$props) $$invalidate(1, type = $$props.type);
  		if ("disabled" in $$props) $$invalidate(2, disabled = $$props.disabled);
  	};

  	return [label, type, disabled];
  }

  class Button extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance$1, create_fragment$1, safe_not_equal, { label: 0, type: 1, disabled: 2 });
  	}
  }

  /* Ex_0_ed78ec265f41da31351640aadba5be37.svelte generated by Svelte v3.38.3 */

  function create_fragment(ctx) {
  	let button0;
  	let t;
  	let button1;
  	let current;

  	button0 = new Button({
  			props: { label: "click me", type: "button" }
  		});

  	button1 = new Button({
  			props: {
  				label: "disabled",
  				type: "button",
  				disabled: "true"
  			}
  		});

  	return {
  		c() {
  			create_component(button0.$$.fragment);
  			t = space();
  			create_component(button1.$$.fragment);
  		},
  		m(target, anchor) {
  			mount_component$1(button0, target, anchor);
  			insert$1(target, t, anchor);
  			mount_component$1(button1, target, anchor);
  			current = true;
  		},
  		p: noop$1,
  		i(local) {
  			if (current) return;
  			transition_in$1(button0.$$.fragment, local);
  			transition_in$1(button1.$$.fragment, local);
  			current = true;
  		},
  		o(local) {
  			transition_out(button0.$$.fragment, local);
  			transition_out(button1.$$.fragment, local);
  			current = false;
  		},
  		d(detaching) {
  			destroy_component$1(button0, detaching);
  			if (detaching) detach$1(t);
  			destroy_component$1(button1, detaching);
  		}
  	};
  }

  class Ex_0_ed78ec265f41da31351640aadba5be37 extends SvelteComponent$1 {
  	constructor(options) {
  		super();
  		init$1(this, options, null, create_fragment, safe_not_equal$1, {});
  	}
  }

  exports.Ex_0_ed78ec265f41da31351640aadba5be37 = Ex_0_ed78ec265f41da31351640aadba5be37;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
