
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
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
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
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
    function append(target, node) {
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
    function insert(target, node, anchor) {
        if (is_hydrating && !anchor) {
            append(target, node);
        }
        else if (node.parentNode !== target || (anchor && node.nextSibling !== anchor)) {
            target.insertBefore(node, anchor || null);
        }
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
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
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
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(claimed_nodes) {
            this.e = this.n = null;
            this.l = claimed_nodes;
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                if (this.l) {
                    this.n = this.l;
                }
                else {
                    this.h(html);
                }
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
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
                start_hydrating();
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
            end_hydrating();
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

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function get_interpolator(a, b) {
        if (a === b || a !== a)
            return () => a;
        const type = typeof a;
        if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
            throw new Error('Cannot interpolate values of different type');
        }
        if (Array.isArray(a)) {
            const arr = b.map((bi, i) => {
                return get_interpolator(a[i], bi);
            });
            return t => arr.map(fn => fn(t));
        }
        if (type === 'object') {
            if (!a || !b)
                throw new Error('Object cannot be null');
            if (is_date(a) && is_date(b)) {
                a = a.getTime();
                b = b.getTime();
                const delta = b - a;
                return t => new Date(a + t * delta);
            }
            const keys = Object.keys(b);
            const interpolators = {};
            keys.forEach(key => {
                interpolators[key] = get_interpolator(a[key], b[key]);
            });
            return t => {
                const result = {};
                keys.forEach(key => {
                    result[key] = interpolators[key](t);
                });
                return result;
            };
        }
        if (type === 'number') {
            const delta = b - a;
            return t => a + t * delta;
        }
        throw new Error(`Cannot interpolate ${type} values`);
    }
    function tweened(value, defaults = {}) {
        const store = writable(value);
        let task;
        let target_value = value;
        function set(new_value, opts) {
            if (value == null) {
                store.set(value = new_value);
                return Promise.resolve();
            }
            target_value = new_value;
            let previous_task = task;
            let started = false;
            let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
            if (duration === 0) {
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                store.set(value = target_value);
                return Promise.resolve();
            }
            const start = now() + delay;
            let fn;
            task = loop(now => {
                if (now < start)
                    return true;
                if (!started) {
                    fn = interpolate(value, new_value);
                    if (typeof duration === 'function')
                        duration = duration(value, new_value);
                    started = true;
                }
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                const elapsed = now - start;
                if (elapsed > duration) {
                    store.set(value = new_value);
                    return false;
                }
                // @ts-ignore
                store.set(value = fn(easing(elapsed / duration)));
                return true;
            });
            return task.promise;
        }
        return {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe
        };
    }

    /* src/pages/index.md generated by Svelte v3.38.3 */

    function create_fragment$c(ctx) {
    	let h1;
    	let t1;
    	let p0;
    	let t3;
    	let h2;
    	let t5;
    	let p1;
    	let t7;
    	let html_tag;
    	let t8;
    	let p2;
    	let t10;
    	let html_tag_1;
    	let html_anchor;

    	return {
    		c() {
    			h1 = element("h1");
    			h1.textContent = "Iroco UI components";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "How to use the iroco-ui components.";
    			t3 = space();
    			h2 = element("h2");
    			h2.textContent = "Installation";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "Run this command:";
    			t7 = space();
    			html_tag = new HtmlTag();
    			t8 = space();
    			p2 = element("p");
    			p2.textContent = "Then you can import it in your projects:";
    			t10 = space();
    			html_tag_1 = new HtmlTag();
    			html_anchor = empty();
    			attr(h1, "id", "iroco-ui-components");
    			attr(h2, "id", "installation");
    			html_tag.a = t8;
    			html_tag_1.a = html_anchor;
    		},
    		m(target, anchor) {
    			insert(target, h1, anchor);
    			insert(target, t1, anchor);
    			insert(target, p0, anchor);
    			insert(target, t3, anchor);
    			insert(target, h2, anchor);
    			insert(target, t5, anchor);
    			insert(target, p1, anchor);
    			insert(target, t7, anchor);
    			html_tag.m(CODEBLOCK_1, target, anchor);
    			insert(target, t8, anchor);
    			insert(target, p2, anchor);
    			insert(target, t10, anchor);
    			html_tag_1.m(CODEBLOCK_2, target, anchor);
    			insert(target, html_anchor, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(h1);
    			if (detaching) detach(t1);
    			if (detaching) detach(p0);
    			if (detaching) detach(t3);
    			if (detaching) detach(h2);
    			if (detaching) detach(t5);
    			if (detaching) detach(p1);
    			if (detaching) detach(t7);
    			if (detaching) html_tag.d();
    			if (detaching) detach(t8);
    			if (detaching) detach(p2);
    			if (detaching) detach(t10);
    			if (detaching) detach(html_anchor);
    			if (detaching) html_tag_1.d();
    		}
    	};
    }

    const META$2 = {};

    const CODEBLOCK_1 = `<pre><code class="language-shell"><span class="hljs-meta">$</span><span class="bash"> npm install -D @irco/ui</span>
</code></pre>
`;

    const CODEBLOCK_2 = `<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"> 
    <span class="hljs-keyword">import</span> &#123; Button &#125; <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@iroco/ui/lib&#x27;</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
`;

    class Pages extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$c, safe_not_equal, {});
    	}
    }

    /* src/includes/error.md generated by Svelte v3.38.3 */

    function create_fragment$b(ctx) {
    	let h1;
    	let t1;
    	let p;

    	return {
    		c() {
    			h1 = element("h1");
    			h1.textContent = "Page not found!";
    			t1 = space();
    			p = element("p");
    			p.innerHTML = `<a href="/">Go to start page</a>`;
    			attr(h1, "id", "page-not-found");
    			attr(h1, "class", "svelte-aiue6m");
    			attr(p, "class", "svelte-aiue6m");
    		},
    		m(target, anchor) {
    			insert(target, h1, anchor);
    			insert(target, t1, anchor);
    			insert(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(h1);
    			if (detaching) detach(t1);
    			if (detaching) detach(p);
    		}
    	};
    }

    const META$1 = { "layout": "no_sidebar" };

    class Error$1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$b, safe_not_equal, {});
    	}
    }

    /* node_modules/@svelte-docs/themes/default/components/Example.svelte generated by Svelte v3.38.3 */

    const get_code_slot_changes = dirty => ({});
    const get_code_slot_context = ctx => ({});
    const get_result_slot_changes = dirty => ({});
    const get_result_slot_context = ctx => ({});

    function create_fragment$a(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let current;
    	const result_slot_template = /*#slots*/ ctx[1].result;
    	const result_slot = create_slot(result_slot_template, ctx, /*$$scope*/ ctx[0], get_result_slot_context);
    	const code_slot_template = /*#slots*/ ctx[1].code;
    	const code_slot = create_slot(code_slot_template, ctx, /*$$scope*/ ctx[0], get_code_slot_context);

    	return {
    		c() {
    			div2 = element("div");
    			div0 = element("div");
    			if (result_slot) result_slot.c();
    			t = space();
    			div1 = element("div");
    			if (code_slot) code_slot.c();
    			attr(div0, "class", "result");
    			attr(div1, "class", "code");
    			attr(div2, "class", "example");
    		},
    		m(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div0);

    			if (result_slot) {
    				result_slot.m(div0, null);
    			}

    			append(div2, t);
    			append(div2, div1);

    			if (code_slot) {
    				code_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (result_slot) {
    				if (result_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(result_slot, result_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, get_result_slot_changes, get_result_slot_context);
    				}
    			}

    			if (code_slot) {
    				if (code_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot(code_slot, code_slot_template, ctx, /*$$scope*/ ctx[0], !current ? -1 : dirty, get_code_slot_changes, get_code_slot_context);
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(result_slot, local);
    			transition_in(code_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(result_slot, local);
    			transition_out(code_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div2);
    			if (result_slot) result_slot.d(detaching);
    			if (code_slot) code_slot.d(detaching);
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Example$1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$4, create_fragment$a, safe_not_equal, {});
    	}
    }

    var basepath = '/';

    /* node_modules/@svelte-docs/core/builtins/Example/Example.svelte generated by Svelte v3.38.3 */

    function create_result_slot(ctx) {
    	let iframe_1;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			iframe_1 = element("iframe");
    			attr(iframe_1, "slot", "result");
    			set_style(iframe_1, "height", /*iframe_height*/ ctx[2] + "px");
    			attr(iframe_1, "title", "Result");
    			attr(iframe_1, "scrolling", "no");
    			attr(iframe_1, "sandbox", "allow-same-origin allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-scripts");
    			attr(iframe_1, "srcdoc", /*srcdoc*/ ctx[3]);
    			attr(iframe_1, "class", "svelte-y9biys");
    		},
    		m(target, anchor) {
    			insert(target, iframe_1, anchor);
    			/*iframe_1_binding*/ ctx[7](iframe_1);

    			if (!mounted) {
    				dispose = listen(iframe_1, "load", /*sendMessage*/ ctx[4]);
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*iframe_height*/ 4) {
    				set_style(iframe_1, "height", /*iframe_height*/ ctx[2] + "px");
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(iframe_1);
    			/*iframe_1_binding*/ ctx[7](null);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (55:5) 
    function create_code_slot(ctx) {
    	let pre;
    	let code_1;
    	let raw_value = /*code*/ ctx[0].trim() + "";

    	return {
    		c() {
    			pre = element("pre");
    			code_1 = element("code");
    			attr(pre, "slot", "code");
    			attr(pre, "class", "hljs svelte-y9biys");
    		},
    		m(target, anchor) {
    			insert(target, pre, anchor);
    			append(pre, code_1);
    			code_1.innerHTML = raw_value;
    		},
    		p(ctx, dirty) {
    			if (dirty & /*code*/ 1 && raw_value !== (raw_value = /*code*/ ctx[0].trim() + "")) code_1.innerHTML = raw_value;		},
    		d(detaching) {
    			if (detaching) detach(pre);
    		}
    	};
    }

    function create_fragment$9(ctx) {
    	let examplelayout;
    	let current;

    	examplelayout = new Example$1({
    			props: {
    				$$slots: {
    					code: [create_code_slot],
    					result: [create_result_slot]
    				},
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(examplelayout.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(examplelayout, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const examplelayout_changes = {};

    			if (dirty & /*$$scope, code, iframe_height, iframe*/ 1031) {
    				examplelayout_changes.$$scope = { dirty, ctx };
    			}

    			examplelayout.$set(examplelayout_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(examplelayout.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(examplelayout.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(examplelayout, detaching);
    		}
    	};
    }

    let uid = 1;

    function instance$3($$self, $$props, $$invalidate) {
    	let { name } = $$props;
    	let { code } = $$props;
    	let { height = false } = $$props;
    	const fixedheight = Number.isInteger(height);
    	let iframe;
    	let iframe_id = uid++;
    	let iframe_height = fixedheight ? height : 70;

    	const srcdoc = `<!doctype html>
<html style="height: auto !important">
    <head>
        <meta charset='utf-8'>
        <base href='${basepath}' />
        <link rel='stylesheet' href='examples.css'>
        <scr` + `ipt defer src='examples.js'></scr` + `ipt>
    </head>
    <body style="height: auto !important"></body>
</html>`;

    	const sendMessage = function () {
    		iframe.contentWindow.postMessage({ "COMPONENT": name, iframe_id }, "*");
    	};

    	window.addEventListener("message", function (event) {
    		if (event.data.iframe_id && event.data.iframe_id === iframe_id) {
    			if (!fixedheight && event.data.hasOwnProperty("HEIGHT")) {
    				$$invalidate(2, iframe_height = event.data.HEIGHT);
    			}
    		}
    	});

    	function iframe_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			iframe = $$value;
    			$$invalidate(1, iframe);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(5, name = $$props.name);
    		if ("code" in $$props) $$invalidate(0, code = $$props.code);
    		if ("height" in $$props) $$invalidate(6, height = $$props.height);
    	};

    	return [
    		code,
    		iframe,
    		iframe_height,
    		srcdoc,
    		sendMessage,
    		name,
    		height,
    		iframe_1_binding
    	];
    }

    class Example extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$3, create_fragment$9, safe_not_equal, { name: 5, code: 0, height: 6 });
    	}
    }

    /* src/pages/components/button.md generated by Svelte v3.38.3 */

    function create_fragment$8(ctx) {
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let h20;
    	let t5;
    	let example;
    	let t6;
    	let h21;
    	let t8;
    	let dl;
    	let current;

    	example = new Example({
    			props: {
    				name: "Ex_0_ed78ec265f41da31351640aadba5be37",
    				code: "<span class=\"xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span></span><span class=\"javascript\">\n    <span class=\"hljs-keyword\">import</span> &#123; Button &#125; <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&quot;@iroco/ui&quot;</span>;\n</span><span class=\"xml\"><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Button</span> <span class=\"hljs-attr\">label</span>=<span class=\"hljs-string\">&quot;click me&quot;</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">&quot;button&quot;</span> /&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Button</span> <span class=\"hljs-attr\">label</span>=<span class=\"hljs-string\">&quot;disabled&quot;</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">&quot;button&quot;</span> <span class=\"hljs-attr\">disabled</span>=<span class=\"hljs-string\">&quot;true&quot;</span> /&gt;</span></span>",
    				height: false
    			}
    		});

    	return {
    		c() {
    			h1 = element("h1");
    			h1.textContent = "Button";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Iroco button component";
    			t3 = space();
    			h20 = element("h2");
    			h20.textContent = "Usage";
    			t5 = space();
    			create_component(example.$$.fragment);
    			t6 = space();
    			h21 = element("h2");
    			h21.textContent = "Properties";
    			t8 = space();
    			dl = element("dl");
    			dl.innerHTML = `<dt>type</dt><dd><dfn><i>&#39;button&#39;</i>,<i>&#39;submit&#39;</i></dfn></dd><dd>&#39;button&#39;</dd><dd>Type of the button</dd><dt>disabled</dt><dd><dfn>bool</dfn></dd><dd>false</dd><dd>Make button disabled</dd>`;
    			attr(h1, "id", "button");
    			attr(h20, "id", "usage");
    			attr(h21, "id", "properties");
    			attr(dl, "class", "properties");
    		},
    		m(target, anchor) {
    			insert(target, h1, anchor);
    			insert(target, t1, anchor);
    			insert(target, p, anchor);
    			insert(target, t3, anchor);
    			insert(target, h20, anchor);
    			insert(target, t5, anchor);
    			mount_component(example, target, anchor);
    			insert(target, t6, anchor);
    			insert(target, h21, anchor);
    			insert(target, t8, anchor);
    			insert(target, dl, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(example.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(example.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(h1);
    			if (detaching) detach(t1);
    			if (detaching) detach(p);
    			if (detaching) detach(t3);
    			if (detaching) detach(h20);
    			if (detaching) detach(t5);
    			destroy_component(example, detaching);
    			if (detaching) detach(t6);
    			if (detaching) detach(h21);
    			if (detaching) detach(t8);
    			if (detaching) detach(dl);
    		}
    	};
    }

    const META = {};

    class Button extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$8, safe_not_equal, {});
    	}
    }

    const url = writable(getURL());

    function go(href){
        history.pushState({}, '', href === '' ? getBasepath() : href);
        url.set(href.split('#')[0]);
    }

    function initNavigation() {
        addEventListener('click', click);
        addEventListener('popstate', gohistory);
        
        return function() {
            removeEventListener('click', click);
            removeEventListener('popstate', gohistory);
        }
    }

    function gohistory(){
        url.set(getURL());
    }

    function getURL() {
        let path = location.pathname;
        path = cleanURL(path);
        return path;
    }

    function click (event) {

        const a = event.target.closest('a');
        if(!a) return;

        const href = a.getAttribute('href');
        
        if(!href) return;
        
        // Open external links in new tab
        if(/^\w+:\/\//.test(href)) {
            a.setAttribute('target','_blank');
            return;
        }
        
        event.preventDefault();

        if(/^\/$/.test(href)) {
            return go('')
        }
        return go(href);
    }

    function cleanURL(url){
        const basepath = getBasepath();
        if(url.startsWith(basepath)) url = url.slice(basepath.length);
        if(url.startsWith('/')) url = url.slice(1);
        if(url.endsWith('/')) url = url.slice(0,-1);
        return url;
    }

    function getBasepath(){
        let basepath = (document.querySelector('base') || {}).href.replace(window.location.origin,'').slice(0,-1);
        return basepath === '' ? '/' : basepath;
    }

    const routes = [
            {
            url: '', 
            component:Pages, 
            title: (META$2.hasOwnProperty('title')) ? META$2.title : 'Iroco UI components',
            meta:META$2
        },
    {
            url: 'sd:error', 
            component:Error$1, 
            title: (META$1.hasOwnProperty('title')) ? META$1.title : 'Page not found!',
            meta:META$1
        },
    {
            url: 'components/button', 
            component:Button, 
            title: (META.hasOwnProperty('title')) ? META.title : 'Button',
            meta:META
        },
    {
            url: 'index', 
            component:Pages, 
            title: (META$2.hasOwnProperty('title')) ? META$2.title : 'Iroco UI components',
            meta:META$2
        }
        ];

        const error_route = routes.filter(r => r.url === 'sd:error')[0];

        const current_page = derived(url,$url => {

            const route = routes.filter(r => r.url === $url);
            
            if(route.length > 0)
                return route[0];
            else
                return error_route;
        });

    var maintitle = 'Svelte Thing Documentation';

    /* src/includes/logo.md generated by Svelte v3.38.3 */

    function create_fragment$7(ctx) {
    	let h1;

    	return {
    		c() {
    			h1 = element("h1");
    			h1.innerHTML = `<a href="/">Svelte<span class="svelte-19hlx4g">Docs</span></a>`;
    			attr(h1, "id", "sveltesvelte-md-block-tag-1");
    		},
    		m(target, anchor) {
    			insert(target, h1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(h1);
    		}
    	};
    }

    class Logo extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$7, safe_not_equal, {});
    	}
    }

    /* src/includes/topbar.md generated by Svelte v3.38.3 */

    function create_fragment$6(ctx) {
    	let ul;

    	return {
    		c() {
    			ul = element("ul");
    			ul.innerHTML = `<li><a href="https://github.com/alexxnb/svelte-docs">Svelte docs</a></li>`;
    		},
    		m(target, anchor) {
    			insert(target, ul, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(ul);
    		}
    	};
    }

    class Topbar extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$6, safe_not_equal, {});
    	}
    }

    /* node_modules/@svelte-docs/themes/default/components/Topbar.svelte generated by Svelte v3.38.3 */

    function create_fragment$5(ctx) {
    	let section0;
    	let logo;
    	let t;
    	let section1;
    	let topbar;
    	let current;
    	logo = new Logo({});
    	topbar = new Topbar({});

    	return {
    		c() {
    			section0 = element("section");
    			create_component(logo.$$.fragment);
    			t = space();
    			section1 = element("section");
    			create_component(topbar.$$.fragment);
    		},
    		m(target, anchor) {
    			insert(target, section0, anchor);
    			mount_component(logo, section0, null);
    			insert(target, t, anchor);
    			insert(target, section1, anchor);
    			mount_component(topbar, section1, null);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(topbar.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(topbar.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(section0);
    			destroy_component(logo);
    			if (detaching) detach(t);
    			if (detaching) detach(section1);
    			destroy_component(topbar);
    		}
    	};
    }

    class Topbar_1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$5, safe_not_equal, {});
    	}
    }

    /* src/includes/sidebar.md generated by Svelte v3.38.3 */

    function create_fragment$4(ctx) {
    	let ul1;

    	return {
    		c() {
    			ul1 = element("ul");

    			ul1.innerHTML = `<li>Components<ul><li><a href="components/button">Button</a></li></ul></li> 
<li><a href="https://github.com/iroco-co/iroco-ui">Github</a></li>`;
    		},
    		m(target, anchor) {
    			insert(target, ul1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(ul1);
    		}
    	};
    }

    class Sidebar extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$4, safe_not_equal, {});
    	}
    }

    /* node_modules/@svelte-docs/themes/default/components/Sections.svelte generated by Svelte v3.38.3 */

    function create_fragment$3(ctx) {
    	let sidebar;
    	let current;
    	sidebar = new Sidebar({});

    	return {
    		c() {
    			create_component(sidebar.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(sidebar, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(sidebar.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(sidebar.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(sidebar, detaching);
    		}
    	};
    }

    class Sections extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$3, safe_not_equal, {});
    	}
    }

    /* node_modules/@svelte-docs/themes/default/components/Document.svelte generated by Svelte v3.38.3 */

    function create_fragment$2(ctx) {
    	let article;
    	let switch_instance;
    	let current;
    	var switch_value = /*$current_page*/ ctx[0].component;

    	function switch_props(ctx) {
    		return {};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	return {
    		c() {
    			article = element("article");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    		},
    		m(target, anchor) {
    			insert(target, article, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, article, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (switch_value !== (switch_value = /*$current_page*/ ctx[0].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, article, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(article);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $current_page;
    	component_subscribe($$self, current_page, $$value => $$invalidate(0, $current_page = $$value));

    	current_page.subscribe(() => {
    		window.scrollTo(0, 0);
    	});

    	return [$current_page];
    }

    class Document extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});
    	}
    }

    /* node_modules/@svelte-docs/themes/default/components/Layout.svelte generated by Svelte v3.38.3 */

    const { document: document_2 } = globals;

    function create_if_block_3(ctx) {
    	let main;
    	let document_1;
    	let current;
    	document_1 = new Document({});

    	return {
    		c() {
    			main = element("main");
    			create_component(document_1.$$.fragment);
    			attr(main, "class", "fullscreen");
    			toggle_class(main, "mobile", /*$mobile*/ ctx[2]);
    		},
    		m(target, anchor) {
    			insert(target, main, anchor);
    			mount_component(document_1, main, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty & /*$mobile*/ 4) {
    				toggle_class(main, "mobile", /*$mobile*/ ctx[2]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(document_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(document_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(main);
    			destroy_component(document_1);
    		}
    	};
    }

    // (89:0) {#if layout === 'default'}
    function create_if_block(ctx) {
    	let t0;
    	let t1;
    	let main;
    	let document_1;
    	let current;
    	let if_block0 = /*$mobile*/ ctx[2] && create_if_block_2(ctx);
    	let if_block1 = (!/*$mobile*/ ctx[2] || /*show_sidebar*/ ctx[1]) && create_if_block_1(ctx);
    	document_1 = new Document({});

    	return {
    		c() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			main = element("main");
    			create_component(document_1.$$.fragment);
    			toggle_class(main, "mobile", /*$mobile*/ ctx[2]);
    		},
    		m(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert(target, t1, anchor);
    			insert(target, main, anchor);
    			mount_component(document_1, main, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (/*$mobile*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!/*$mobile*/ ctx[2] || /*show_sidebar*/ ctx[1]) {
    				if (if_block1) {
    					if (dirty & /*$mobile, show_sidebar*/ 6) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*$mobile*/ 4) {
    				toggle_class(main, "mobile", /*$mobile*/ ctx[2]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block1);
    			transition_in(document_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block1);
    			transition_out(document_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach(t1);
    			if (detaching) detach(main);
    			destroy_component(document_1);
    		}
    	};
    }

    // (91:1) {#if $mobile}
    function create_if_block_2(ctx) {
    	let button;
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			button = element("button");
    			img = element("img");
    			if (img.src !== (img_src_value = "assets/burger.svg")) attr(img, "src", img_src_value);
    			attr(img, "alt", "Open Menu");
    			set_style(img, "transform", "rotate(" + /*$rotate*/ ctx[3] + "deg)");
    			attr(button, "class", "showNav");
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);
    			append(button, img);

    			if (!mounted) {
    				dispose = listen(button, "click", stop_propagation(/*click_handler*/ ctx[13]));
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*$rotate*/ 8) {
    				set_style(img, "transform", "rotate(" + /*$rotate*/ ctx[3] + "deg)");
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (98:1) {#if !$mobile || show_sidebar}
    function create_if_block_1(ctx) {
    	let nav;
    	let sections;
    	let nav_transition;
    	let current;
    	let mounted;
    	let dispose;
    	sections = new Sections({});

    	return {
    		c() {
    			nav = element("nav");
    			create_component(sections.$$.fragment);
    		},
    		m(target, anchor) {
    			insert(target, nav, anchor);
    			mount_component(sections, nav, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*set_active_link*/ ctx[7].call(null, nav)),
    					action_destroyer(/*hide_sidebar*/ ctx[8].call(null, nav))
    				];

    				mounted = true;
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(sections.$$.fragment, local);

    			add_render_callback(() => {
    				if (!nav_transition) nav_transition = create_bidirectional_transition(nav, /*slideH*/ ctx[6], {}, true);
    				nav_transition.run(1);
    			});

    			current = true;
    		},
    		o(local) {
    			transition_out(sections.$$.fragment, local);
    			if (!nav_transition) nav_transition = create_bidirectional_transition(nav, /*slideH*/ ctx[6], {}, false);
    			nav_transition.run(0);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(nav);
    			destroy_component(sections);
    			if (detaching && nav_transition) nav_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let title_value;
    	let t0;
    	let header;
    	let topbar;
    	let t1;
    	let t2;
    	let if_block1_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[12]);
    	document_2.title = title_value = /*title*/ ctx[4];
    	topbar = new Topbar_1({});
    	let if_block0 = /*layout*/ ctx[5] === "no_sidebar" && create_if_block_3(ctx);
    	let if_block1 = /*layout*/ ctx[5] === "default" && create_if_block(ctx);

    	return {
    		c() {
    			t0 = space();
    			header = element("header");
    			create_component(topbar.$$.fragment);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m(target, anchor) {
    			insert(target, t0, anchor);
    			insert(target, header, anchor);
    			mount_component(topbar, header, null);
    			insert(target, t1, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert(target, if_block1_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen(window, "resize", /*onwindowresize*/ ctx[12]);
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if ((!current || dirty & /*title*/ 16) && title_value !== (title_value = /*title*/ ctx[4])) {
    				document_2.title = title_value;
    			}

    			if (/*layout*/ ctx[5] === "no_sidebar") {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*layout*/ 32) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t2.parentNode, t2);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*layout*/ ctx[5] === "default") {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*layout*/ 32) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(topbar.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o(local) {
    			transition_out(topbar.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(t0);
    			if (detaching) detach(header);
    			destroy_component(topbar);
    			if (detaching) detach(t1);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach(if_block1_anchor);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let title;
    	let layout;
    	let $mobile;
    	let $rotate;
    	let $current_page;
    	component_subscribe($$self, current_page, $$value => $$invalidate(11, $current_page = $$value));

    	function slideH(node) {
    		const delay = 10;
    		const duration = 200;
    		const easing = cubicOut;
    		const style = getComputedStyle(node);
    		const width = parseFloat(style.width);

    		return {
    			delay,
    			duration,
    			easing,
    			css: t => `overflow: hidden;` + `width: ${t * width}px;`
    		};
    	}

    	function set_active_link(node) {
    		return {
    			destroy: current_page.subscribe(page => {
    				const url = page.url || "/";

    				node.querySelectorAll("a").forEach(a => {
    					if (a.getAttribute("href") === url) a.classList.add("active"); else a.classList.remove("active");
    				});
    			})
    		};
    	}

    	function hide_sidebar(node) {
    		const handler = () => $$invalidate(1, show_sidebar = false);
    		document.body.addEventListener("click", handler);

    		return {
    			destroy() {
    				document.body.removeEventListener("click", handler);
    			}
    		};
    	}

    	let window_width = 0;
    	let show_sidebar = false;
    	const mobile = writable(true);
    	component_subscribe($$self, mobile, value => $$invalidate(2, $mobile = value));
    	const rotate = tweened(0, { duration: 200, easing: cubicOut });
    	component_subscribe($$self, rotate, value => $$invalidate(3, $rotate = value));

    	function onwindowresize() {
    		$$invalidate(0, window_width = window.innerWidth);
    	}

    	const click_handler = () => $$invalidate(1, show_sidebar = !show_sidebar);

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*window_width*/ 1) {
    			set_store_value(mobile, $mobile = window_width < 800, $mobile);
    		}

    		if ($$self.$$.dirty & /*$mobile, show_sidebar*/ 6) {
    			$$invalidate(1, show_sidebar = $mobile ? show_sidebar : false);
    		}

    		if ($$self.$$.dirty & /*show_sidebar*/ 2) {
    			set_store_value(rotate, $rotate = show_sidebar ? 180 : 0, $rotate);
    		}

    		if ($$self.$$.dirty & /*$current_page*/ 2048) {
    			$$invalidate(4, title = $current_page.title
    			? $current_page.title + " — " + maintitle
    			: maintitle);
    		}

    		if ($$self.$$.dirty & /*$current_page*/ 2048) {
    			$$invalidate(5, layout = $current_page.meta.layout
    			? $current_page.meta.layout
    			: "default");
    		}
    	};

    	return [
    		window_width,
    		show_sidebar,
    		$mobile,
    		$rotate,
    		title,
    		layout,
    		slideH,
    		set_active_link,
    		hide_sidebar,
    		mobile,
    		rotate,
    		$current_page,
    		onwindowresize,
    		click_handler
    	];
    }

    class Layout extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
    	}
    }

    /* node_modules/@svelte-docs/core/App.svelte generated by Svelte v3.38.3 */

    function create_fragment(ctx) {
    	let layout;
    	let current;
    	layout = new Layout({});

    	return {
    		c() {
    			create_component(layout.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};
    }

    function instance($$self) {
    	onMount(() => {
    		return initNavigation();
    	});

    	return [];
    }

    class App extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, {});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
