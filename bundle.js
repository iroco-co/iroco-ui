var app=function(){"use strict";function t(){}function s(t){return t()}function n(){return Object.create(null)}function e(t){t.forEach(s)}function a(t){return"function"==typeof t}function l(t,s){return t!=t?s==s:t!==s||t&&"object"==typeof t||"function"==typeof t}function o(s,...n){if(null==s)return t;const e=s.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function r(t,s,n,e){if(t){const a=i(t,s,n,e);return t[0](a)}}function i(t,s,n,e){return t[1]&&e?function(t,s){for(const n in s)t[n]=s[n];return t}(n.ctx.slice(),t[1](e(s))):n.ctx}function c(t,s,n,e,a,l,o){const r=function(t,s,n,e){if(t[2]&&e){const a=t[2](e(n));if(void 0===s.dirty)return a;if("object"==typeof a){const t=[],n=Math.max(s.dirty.length,a.length);for(let e=0;e<n;e+=1)t[e]=s.dirty[e]|a[e];return t}return s.dirty|a}return s.dirty}(s,e,a,l);if(r){const a=i(s,n,e,o);t.p(a,r)}}function p(s){return s&&a(s.destroy)?s.destroy:t}let d,u=!1;function h(t,s,n,e){for(;t<s;){const a=t+(s-t>>1);n(a)<=e?t=a+1:s=a}return t}function f(t,s){u?(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;const s=t.childNodes,n=new Int32Array(s.length+1),e=new Int32Array(s.length);n[0]=-1;let a=0;for(let t=0;t<s.length;t++){const l=h(1,a+1,(t=>s[n[t]].claim_order),s[t].claim_order)-1;e[t]=n[l]+1;const o=l+1;n[o]=t,a=Math.max(o,a)}const l=[],o=[];let r=s.length-1;for(let t=n[a]+1;0!=t;t=e[t-1]){for(l.push(s[t-1]);r>=t;r--)o.push(s[r]);r--}for(;r>=0;r--)o.push(s[r]);l.reverse(),o.sort(((t,s)=>t.claim_order-s.claim_order));for(let s=0,n=0;s<o.length;s++){for(;n<l.length&&o[s].claim_order>=l[n].claim_order;)n++;const e=n<l.length?l[n]:null;t.insertBefore(o[s],e)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild),s!==t.actual_end_child?t.insertBefore(s,t.actual_end_child):t.actual_end_child=s.nextSibling):s.parentNode!==t&&t.appendChild(s)}function m(t,s,n){u&&!n?f(t,s):(s.parentNode!==t||n&&s.nextSibling!==n)&&t.insertBefore(s,n||null)}function g(t){t.parentNode.removeChild(t)}function v(t){return document.createElement(t)}function $(t){return document.createTextNode(t)}function y(){return $(" ")}function b(){return $("")}function j(t,s,n,e){return t.addEventListener(s,n,e),()=>t.removeEventListener(s,n,e)}function x(t,s,n){null==n?t.removeAttribute(s):t.getAttribute(s)!==n&&t.setAttribute(s,n)}function w(t,s,n,e){t.style.setProperty(s,n,e?"important":"")}function _(t,s,n){t.classList[n?"add":"remove"](s)}class q{constructor(t){this.e=this.n=null,this.l=t}m(t,s,n=null){this.e||(this.e=v(s.nodeName),this.t=s,this.l?this.n=this.l:this.h(t)),this.i(n)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let s=0;s<this.n.length;s+=1)m(this.t,this.n[s],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(g)}}function k(t){d=t}function T(t){(function(){if(!d)throw new Error("Function called outside component initialization");return d})().$$.on_mount.push(t)}const E=[],I=[],C=[],L=[],H=Promise.resolve();let M=!1;function B(t){C.push(t)}let P=!1;const N=new Set;function O(){if(!P){P=!0;do{for(let t=0;t<E.length;t+=1){const s=E[t];k(s),A(s.$$)}for(k(null),E.length=0;I.length;)I.pop()();for(let t=0;t<C.length;t+=1){const s=C[t];N.has(s)||(N.add(s),s())}C.length=0}while(E.length);for(;L.length;)L.pop()();M=!1,P=!1,N.clear()}}function A(t){if(null!==t.fragment){t.update(),e(t.before_update);const s=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,s),t.after_update.forEach(B)}}const S=new Set;let R;function V(){R={r:0,c:[],p:R}}function U(){R.r||e(R.c),R=R.p}function G(t,s){t&&t.i&&(S.delete(t),t.i(s))}function W(t,s,n,e){if(t&&t.o){if(S.has(t))return;S.add(t),R.c.push((()=>{S.delete(t),e&&(n&&t.d(1),e())})),t.o(s)}}const z="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function D(t){t&&t.c()}function F(t,n,l,o){const{fragment:r,on_mount:i,on_destroy:c,after_update:p}=t.$$;r&&r.m(n,l),o||B((()=>{const n=i.map(s).filter(a);c?c.push(...n):e(n),t.$$.on_mount=[]})),p.forEach(B)}function Z(t,s){const n=t.$$;null!==n.fragment&&(e(n.on_destroy),n.fragment&&n.fragment.d(s),n.on_destroy=n.fragment=null,n.ctx=[])}function J(t,s){-1===t.$$.dirty[0]&&(E.push(t),M||(M=!0,H.then(O)),t.$$.dirty.fill(0)),t.$$.dirty[s/31|0]|=1<<s%31}function K(s,a,l,o,r,i,c=[-1]){const p=d;k(s);const h=s.$$={fragment:null,ctx:null,props:i,update:t,not_equal:r,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:a.context||[]),callbacks:n(),dirty:c,skip_bound:!1};let f=!1;if(h.ctx=l?l(s,a.props||{},((t,n,...e)=>{const a=e.length?e[0]:n;return h.ctx&&r(h.ctx[t],h.ctx[t]=a)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](a),f&&J(s,t)),n})):[],h.update(),f=!0,e(h.before_update),h.fragment=!!o&&o(h.ctx),a.target){if(a.hydrate){u=!0;const t=function(t){return Array.from(t.childNodes)}(a.target);h.fragment&&h.fragment.l(t),t.forEach(g)}else h.fragment&&h.fragment.c();a.intro&&G(s.$$.fragment),F(s,a.target,a.anchor,a.customElement),u=!1,O()}k(p)}class Q{$destroy(){Z(this,1),this.$destroy=t}$on(t,s){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(s),()=>{const t=n.indexOf(s);-1!==t&&n.splice(t,1)}}$set(t){var s;this.$$set&&(s=t,0!==Object.keys(s).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function X(s){let n,e,a,l,o,r,i,c,p,d,u,h,f,$;return{c(){n=v("h1"),n.textContent="Iroco UI components",e=y(),a=v("p"),a.textContent="How to use the iroco-ui components.",l=y(),o=v("h2"),o.textContent="Installation",r=y(),i=v("p"),i.textContent="Run this command:",c=y(),p=new q,d=y(),u=v("p"),u.textContent="Then you can import it in your projects:",h=y(),f=new q,$=b(),x(n,"id","iroco-ui-components"),x(o,"id","installation"),p.a=d,f.a=$},m(t,s){m(t,n,s),m(t,e,s),m(t,a,s),m(t,l,s),m(t,o,s),m(t,r,s),m(t,i,s),m(t,c,s),p.m(tt,t,s),m(t,d,s),m(t,u,s),m(t,h,s),f.m(st,t,s),m(t,$,s)},p:t,i:t,o:t,d(t){t&&g(n),t&&g(e),t&&g(a),t&&g(l),t&&g(o),t&&g(r),t&&g(i),t&&g(c),t&&p.d(),t&&g(d),t&&g(u),t&&g(h),t&&g($),t&&f.d()}}}const Y={},tt='<pre><code class="language-shell"><span class="hljs-meta">$</span><span class="bash"> npm install -D @irco/ui</span>\n</code></pre>\n',st='<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"> \n    <span class="hljs-keyword">import</span> &#123; Button &#125; <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@iroco/ui/lib&#x27;</span>;\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n</code></pre>\n';class nt extends Q{constructor(t){super(),K(this,t,null,X,l,{})}}function et(s){let n,e,a;return{c(){n=v("h1"),n.textContent="Page not found!",e=y(),a=v("p"),a.innerHTML='<a href="/">Go to start page</a>',x(n,"id","page-not-found"),x(n,"class","svelte-aiue6m"),x(a,"class","svelte-aiue6m")},m(t,s){m(t,n,s),m(t,e,s),m(t,a,s)},p:t,i:t,o:t,d(t){t&&g(n),t&&g(e),t&&g(a)}}}const at={layout:"no_sidebar"};const lt=t=>({}),ot=t=>({}),rt=t=>({}),it=t=>({});function ct(t){let s,n,e,a,l;const o=t[1].result,i=r(o,t,t[0],it),p=t[1].code,d=r(p,t,t[0],ot);return{c(){s=v("div"),n=v("div"),i&&i.c(),e=y(),a=v("div"),d&&d.c(),x(n,"class","result"),x(a,"class","code"),x(s,"class","example")},m(t,o){m(t,s,o),f(s,n),i&&i.m(n,null),f(s,e),f(s,a),d&&d.m(a,null),l=!0},p(t,[s]){i&&i.p&&(!l||1&s)&&c(i,o,t,t[0],l?s:-1,rt,it),d&&d.p&&(!l||1&s)&&c(d,p,t,t[0],l?s:-1,lt,ot)},i(t){l||(G(i,t),G(d,t),l=!0)},o(t){W(i,t),W(d,t),l=!1},d(t){t&&g(s),i&&i.d(t),d&&d.d(t)}}}function pt(t,s,n){let{$$slots:e={},$$scope:a}=s;return t.$$set=t=>{"$$scope"in t&&n(0,a=t.$$scope)},[a,e]}class dt extends Q{constructor(t){super(),K(this,t,pt,ct,l,{})}}function ut(t){let s,n,e;return{c(){s=v("iframe"),x(s,"slot","result"),w(s,"height",t[2]+"px"),x(s,"title","Result"),x(s,"scrolling","no"),x(s,"sandbox","allow-same-origin allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-scripts"),x(s,"srcdoc",t[3]),x(s,"class","svelte-y9biys")},m(a,l){m(a,s,l),t[7](s),n||(e=j(s,"load",t[4]),n=!0)},p(t,n){4&n&&w(s,"height",t[2]+"px")},d(a){a&&g(s),t[7](null),n=!1,e()}}}function ht(t){let s,n,e=t[0].trim()+"";return{c(){s=v("pre"),n=v("code"),x(s,"slot","code"),x(s,"class","hljs svelte-y9biys")},m(t,a){m(t,s,a),f(s,n),n.innerHTML=e},p(t,s){1&s&&e!==(e=t[0].trim()+"")&&(n.innerHTML=e)},d(t){t&&g(s)}}}function ft(t){let s,n;return s=new dt({props:{$$slots:{code:[ht],result:[ut]},$$scope:{ctx:t}}}),{c(){D(s.$$.fragment)},m(t,e){F(s,t,e),n=!0},p(t,[n]){const e={};1031&n&&(e.$$scope={dirty:n,ctx:t}),s.$set(e)},i(t){n||(G(s.$$.fragment,t),n=!0)},o(t){W(s.$$.fragment,t),n=!1},d(t){Z(s,t)}}}let mt=1;function gt(t,s,n){let{name:e}=s,{code:a}=s,{height:l=!1}=s;const o=Number.isInteger(l);let r,i=mt++,c=o?l:70;return window.addEventListener("message",(function(t){t.data.iframe_id&&t.data.iframe_id===i&&!o&&t.data.hasOwnProperty("HEIGHT")&&n(2,c=t.data.HEIGHT)})),t.$$set=t=>{"name"in t&&n(5,e=t.name),"code"in t&&n(0,a=t.code),"height"in t&&n(6,l=t.height)},[a,r,c,"<!doctype html>\n<html style=\"height: auto !important\">\n    <head>\n        <meta charset='utf-8'>\n        <base href='/iroco-ui/' />\n        <link rel='stylesheet' href='examples.css'>\n        <script defer src='examples.js'><\/script>\n    </head>\n    <body style=\"height: auto !important\"></body>\n</html>",function(){r.contentWindow.postMessage({COMPONENT:e,iframe_id:i},"*")},e,l,function(t){I[t?"unshift":"push"]((()=>{r=t,n(1,r)}))}]}class vt extends Q{constructor(t){super(),K(this,t,gt,ft,l,{name:5,code:0,height:6})}}function $t(s){let n,e,a,l,o,r,i,c,p,d,u,h;return i=new vt({props:{name:"Ex_0_ed78ec265f41da31351640aadba5be37",code:'<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span></span><span class="javascript">\n    <span class="hljs-keyword">import</span> &#123; Button &#125; <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@iroco/ui&quot;</span>;\n</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>with a slot<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;click me&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;disabled&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">&quot;true&quot;</span> /&gt;</span></span>',height:!1}}),{c(){n=v("h1"),n.textContent="Button",e=y(),a=v("p"),a.textContent="Iroco button component",l=y(),o=v("h2"),o.textContent="Usage",r=y(),D(i.$$.fragment),c=y(),p=v("h2"),p.textContent="Properties",d=y(),u=v("table"),u.innerHTML='<tr><td><div class="propname">type</div> \n<div class="default">&#39;button&#39;</div></td> \n<td><div class="types"><span class="typedef"><span>&#39;button&#39;</span>,<span>&#39;submit&#39;</span></span></div></td> \n<td><div class="description">Type of the button</div></td> \n    \n</tr><tr><td><div class="propname">disabled</div> \n<div class="default">false</div></td> \n<td><div class="types"><span class="typedef">bool</span></div></td> \n<td><div class="description">Make button disabled</div></td></tr>',x(n,"id","button"),x(o,"id","usage"),x(p,"id","properties"),x(u,"class","properties")},m(t,s){m(t,n,s),m(t,e,s),m(t,a,s),m(t,l,s),m(t,o,s),m(t,r,s),F(i,t,s),m(t,c,s),m(t,p,s),m(t,d,s),m(t,u,s),h=!0},p:t,i(t){h||(G(i.$$.fragment,t),h=!0)},o(t){W(i.$$.fragment,t),h=!1},d(t){t&&g(n),t&&g(e),t&&g(a),t&&g(l),t&&g(o),t&&g(r),Z(i,t),t&&g(c),t&&g(p),t&&g(d),t&&g(u)}}}const yt={};function bt(s){let n,e,a,l,o,r,i,c,p,d,u,h;return i=new vt({props:{name:"Ex_0_73fd2905cc56caf5e06f356a546d7c2a",code:'<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span></span><span class="javascript">\n    <span class="hljs-keyword">import</span> &#123; RadioButton &#125; <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@iroco/ui&quot;</span>;\n    <span class="hljs-keyword">let</span> value = <span class="hljs-string">&#x27;withSlot&#x27;</span>\n</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-name">RadioButton</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&#x27;doc&#x27;</span> <span class="hljs-attr">bind:group</span>=</span></span><span class="javascript">&#123;value&#125;</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">value</span> = <span class="hljs-string">&#x27;withSlot&#x27;</span> &gt;</span>with slot<span class="hljs-tag">&lt;/<span class="hljs-name">RadioButton</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">RadioButton</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&#x27;doc&#x27;</span> <span class="hljs-attr">bind:group</span>=</span></span><span class="javascript">&#123;value&#125;</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">value</span> = <span class="hljs-string">&#x27;withLabel&#x27;</span> <span class="hljs-attr">label</span> = <span class="hljs-string">&#x27;with label&#x27;</span>/&gt;</span></span>',height:!1}}),{c(){n=v("h1"),n.textContent="Radio Button",e=y(),a=v("p"),a.textContent="Iroco radio button component",l=y(),o=v("h2"),o.textContent="Usage",r=y(),D(i.$$.fragment),c=y(),p=v("h2"),p.textContent="Properties",d=y(),u=v("table"),u.innerHTML='<tr><td><div class="propname required">name</div> \n<div class="default"></div></td> \n<td><div class="types"><span class="typedef">&#39;myGroup&#39;</span></div></td> \n<td><div class="description">Name of the radio button group</div></td> \n    \n</tr><tr><td><div class="propname required">value</div> \n<div class="default"></div></td> \n<td><div class="types"><span class="typedef">&#39;value&#39;</span></div></td> \n<td><div class="description">Value of each radio button</div></td> \n    \n</tr><tr><td><div class="propname required">group</div> \n<div class="default"></div></td> \n<td><div class="types"><span class="typedef">&#39;value&#39;</span></div></td> \n<td><div class="description">Shared value of radio button group. Can be bound to the external value</div></td> \n    \n</tr><tr><td><div class="propname required">label</div> \n<div class="default"></div></td> \n<td><div class="types"><span class="typedef">&#39;My option 1&#39;</span></div></td> \n<td><div class="description">Optional value of the label. If not provided slot will be used</div></td></tr>',x(n,"id","radio-button"),x(o,"id","usage"),x(p,"id","properties"),x(u,"class","properties")},m(t,s){m(t,n,s),m(t,e,s),m(t,a,s),m(t,l,s),m(t,o,s),m(t,r,s),F(i,t,s),m(t,c,s),m(t,p,s),m(t,d,s),m(t,u,s),h=!0},p:t,i(t){h||(G(i.$$.fragment,t),h=!0)},o(t){W(i.$$.fragment,t),h=!1},d(t){t&&g(n),t&&g(e),t&&g(a),t&&g(l),t&&g(o),t&&g(r),Z(i,t),t&&g(c),t&&g(p),t&&g(d),t&&g(u)}}}const jt={};function xt(s){let n,e,a,l,o,r,i,c,p,d,u,h;return i=new vt({props:{name:"Ex_0_4912eab930f69edd1c5386c5a344b743",code:'<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span></span><span class="javascript">\n    <span class="hljs-keyword">import</span> &#123; TextInput &#125; <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@iroco/ui&quot;</span>;\n</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-name">TextInput</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;id&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;enter something&quot;</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">TextInput</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;id&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;enter your secrets&quot;</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">TextInput</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;id&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;say me something&quot;</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">TextInput</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;id&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;wrong&quot;</span> <span class="hljs-attr">error</span>=<span class="hljs-string">&quot;error !!&quot;</span> /&gt;</span></span>',height:!1}}),{c(){n=v("h1"),n.textContent="Text Input",e=y(),a=v("p"),a.textContent="Iroco inputs fields for text",l=y(),o=v("h2"),o.textContent="Usage",r=y(),D(i.$$.fragment),c=y(),p=v("h2"),p.textContent="Properties",d=y(),u=v("table"),u.innerHTML='<tr><td><div class="propname required">id</div> \n<div class="default"></div></td> \n<td><div class="types"><span class="typedef">&#39;my_button&#39;</span></div></td> \n<td><div class="description">Id of the text field</div></td> \n    \n</tr><tr><td><div class="propname">type</div> \n<div class="default">&#39;text&#39;</div></td> \n<td><div class="types"><span class="typedef"><span>&#39;text&#39;</span>,<span>&#39;email&#39;</span>,<span>&#39;password&#39;</span></span></div></td> \n<td><div class="description">Type of the text field</div></td> \n    \n</tr><tr><td><div class="propname required">label</div> \n<div class="default"></div></td> \n<td><div class="types"><span class="typedef">&#39;string&#39;</span></div></td> \n<td><div class="description">Label for the text field</div></td> \n    \n</tr><tr><td><div class="propname required">placeholder</div> \n<div class="default"></div></td> \n<td><div class="types"><span class="typedef">&#39;string&#39;</span></div></td> \n<td><div class="description">Placeholder for the text field</div></td> \n    \n</tr><tr><td><div class="propname required">error</div> \n<div class="default"></div></td> \n<td><div class="types"><span class="typedef">&#39;string&#39;</span></div></td> \n<td><div class="description">Error related to the input</div></td></tr>',x(n,"id","text-input"),x(o,"id","usage"),x(p,"id","properties"),x(u,"class","properties")},m(t,s){m(t,n,s),m(t,e,s),m(t,a,s),m(t,l,s),m(t,o,s),m(t,r,s),F(i,t,s),m(t,c,s),m(t,p,s),m(t,d,s),m(t,u,s),h=!0},p:t,i(t){h||(G(i.$$.fragment,t),h=!0)},o(t){W(i.$$.fragment,t),h=!1},d(t){t&&g(n),t&&g(e),t&&g(a),t&&g(l),t&&g(o),t&&g(r),Z(i,t),t&&g(c),t&&g(p),t&&g(d),t&&g(u)}}}const wt={};const _t=[];function qt(s,n=t){let e;const a=[];function o(t){if(l(s,t)&&(s=t,e)){const t=!_t.length;for(let t=0;t<a.length;t+=1){const n=a[t];n[1](),_t.push(n,s)}if(t){for(let t=0;t<_t.length;t+=2)_t[t][0](_t[t+1]);_t.length=0}}}return{set:o,update:function(t){o(t(s))},subscribe:function(l,r=t){const i=[l,r];return a.push(i),1===a.length&&(e=n(o)||t),l(s),()=>{const t=a.indexOf(i);-1!==t&&a.splice(t,1),0===a.length&&(e(),e=null)}}}}const kt=qt(It());function Tt(t){history.pushState({},"",""===t?Lt():t),kt.set(t.split("#")[0])}function Et(){kt.set(It())}function It(){let t=location.pathname;return t=function(t){const s=Lt();t.startsWith(s)&&(t=t.slice(s.length));t.startsWith("/")&&(t=t.slice(1));t.endsWith("/")&&(t=t.slice(0,-1));return t}(t),t}function Ct(t){const s=t.target.closest("a");if(!s)return;const n=s.getAttribute("href");if(n){if(!/^\w+:\/\//.test(n))return t.preventDefault(),/^\/$/.test(n)?Tt(""):Tt(n);s.setAttribute("target","_blank")}}function Lt(){let t=(document.querySelector("base")||{}).href.replace(window.location.origin,"").slice(0,-1);return""===t?"/":t}const Ht=[{url:"",component:nt,title:Y.hasOwnProperty("title")?Y.title:"Iroco UI components",meta:Y},{url:"sd:error",component:class extends Q{constructor(t){super(),K(this,t,null,et,l,{})}},title:at.hasOwnProperty("title")?at.title:"Page not found!",meta:at},{url:"components/button",component:class extends Q{constructor(t){super(),K(this,t,null,$t,l,{})}},title:yt.hasOwnProperty("title")?yt.title:"Button",meta:yt},{url:"components/radio_button",component:class extends Q{constructor(t){super(),K(this,t,null,bt,l,{})}},title:jt.hasOwnProperty("title")?jt.title:"Radio Button",meta:jt},{url:"components/text_input",component:class extends Q{constructor(t){super(),K(this,t,null,xt,l,{})}},title:wt.hasOwnProperty("title")?wt.title:"Text Input",meta:wt},{url:"index",component:nt,title:Y.hasOwnProperty("title")?Y.title:"Iroco UI components",meta:Y}],Mt=Ht.filter((t=>"sd:error"===t.url))[0],Bt=function(s,n,l){const r=!Array.isArray(s),i=r?[s]:s,c=n.length<2;return{subscribe:qt(l,(s=>{let l=!1;const p=[];let d=0,u=t;const h=()=>{if(d)return;u();const e=n(r?p[0]:p,s);c?s(e):u=a(e)?e:t},f=i.map(((t,s)=>o(t,(t=>{p[s]=t,d&=~(1<<s),l&&h()}),(()=>{d|=1<<s}))));return l=!0,h(),function(){e(f),u()}})).subscribe}}(kt,(t=>{const s=Ht.filter((s=>s.url===t));return s.length>0?s[0]:Mt}));var Pt="Svelte Thing Documentation";function Nt(s){let n;return{c(){n=v("h1"),n.innerHTML='<a href="/">I<span class="svelte-1onez6p">roco</span></a>',x(n,"id","isvelte-md-block-tag-1")},m(t,s){m(t,n,s)},p:t,i:t,o:t,d(t){t&&g(n)}}}class Ot extends Q{constructor(t){super(),K(this,t,null,Nt,l,{})}}function At(s){let n;return{c(){n=v("p"),n.innerHTML='made with <a href="https://github.com/alexxnb/svelte-docs">Svelte docs</a>'},m(t,s){m(t,n,s)},p:t,i:t,o:t,d(t){t&&g(n)}}}class St extends Q{constructor(t){super(),K(this,t,null,At,l,{})}}function Rt(s){let n;return{c(){n=v("ul"),n.innerHTML='<li>Components<ul><li><a href="components/button">Button</a></li> \n<li><a href="components/text_input">TextInput</a></li> \n<li><a href="components/radio_button">RadioButton</a></li></ul></li> \n<li><a href="https://github.com/iroco-co/iroco-ui">Github</a></li>'},m(t,s){m(t,n,s)},p:t,i:t,o:t,d(t){t&&g(n)}}}class Vt extends Q{constructor(t){super(),K(this,t,null,Rt,l,{})}}const{document:Ut,window:Gt}=z;function Wt(t){let s,n,e=(!t[4]||t[4]&&t[3])&&zt(t);return{c(){e&&e.c(),s=b()},m(t,a){e&&e.m(t,a),m(t,s,a),n=!0},p(t,n){!t[4]||t[4]&&t[3]?e?(e.p(t,n),24&n&&G(e,1)):(e=zt(t),e.c(),G(e,1),e.m(s.parentNode,s)):e&&(V(),W(e,1,1,(()=>{e=null})),U())},i(t){n||(G(e),n=!0)},o(t){W(e),n=!1},d(t){e&&e.d(t),t&&g(s)}}}function zt(t){let s,n,l,o,r,i;return n=new Vt({}),{c(){s=v("div"),D(n.$$.fragment),x(s,"class","sidebar")},m(e,a){m(e,s,a),F(n,s,null),o=!0,r||(i=[p(t[0].call(null,s)),p(l=Zt.call(null,s,t[9]))],r=!0)},p(t,s){l&&a(l.update)&&8&s&&l.update.call(null,t[9])},i(t){o||(G(n.$$.fragment,t),o=!0)},o(t){W(n.$$.fragment,t),o=!1},d(t){t&&g(s),Z(n),r=!1,e(i)}}}function Dt(s){let n,e,a;return{c(){n=v("button"),n.innerHTML='<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path></svg>',x(n,"class","show_sidebar")},m(t,l){var o;m(t,n,l),e||(a=j(n,"click",(o=s[10],function(t){return t.stopPropagation(),o.call(this,t)})),e=!0)},p:t,d(t){t&&g(n),e=!1,a()}}}function Ft(t){let s,n,e,a,l,o,r,i,c,p,d,u,h,$,b,w,q;B(t[8]),Ut.title=s=t[6];var k=t[5].component;k&&(l=new k({}));let T=!t[7]&&Wt(t),E=t[4]&&!t[7]&&Dt(t);return d=new Ot({}),$=new St({}),{c(){n=y(),e=v("div"),a=v("div"),l&&D(l.$$.fragment),o=y(),T&&T.c(),r=y(),i=v("div"),E&&E.c(),c=y(),p=v("div"),D(d.$$.fragment),u=y(),h=v("div"),D($.$$.fragment),x(a,"class","article"),x(e,"class","main"),_(e,"nosidebar",t[7]||t[4]),x(p,"class","logo"),x(i,"class","topbar")},m(s,g){m(s,n,g),m(s,e,g),f(e,a),l&&F(l,a,null),m(s,o,g),T&&T.m(s,g),m(s,r,g),m(s,i,g),E&&E.m(i,null),f(i,c),f(i,p),F(d,p,null),f(i,u),f(i,h),F($,h,null),b=!0,w||(q=j(Gt,"resize",t[8]),w=!0)},p(t,[n]){if((!b||64&n)&&s!==(s=t[6])&&(Ut.title=s),k!==(k=t[5].component)){if(l){V();const t=l;W(t.$$.fragment,1,0,(()=>{Z(t,1)})),U()}k?(l=new k({}),D(l.$$.fragment),G(l.$$.fragment,1),F(l,a,null)):l=null}144&n&&_(e,"nosidebar",t[7]||t[4]),t[7]?T&&(V(),W(T,1,1,(()=>{T=null})),U()):T?(T.p(t,n),128&n&&G(T,1)):(T=Wt(t),T.c(),G(T,1),T.m(r.parentNode,r)),t[4]&&!t[7]?E?E.p(t,n):(E=Dt(t),E.c(),E.m(i,c)):E&&(E.d(1),E=null)},i(t){b||(l&&G(l.$$.fragment,t),G(T),G(d.$$.fragment,t),G($.$$.fragment,t),b=!0)},o(t){l&&W(l.$$.fragment,t),W(T),W(d.$$.fragment,t),W($.$$.fragment,t),b=!1},d(t){t&&g(n),t&&g(e),l&&Z(l),t&&g(o),T&&T.d(t),t&&g(r),t&&g(i),E&&E.d(),Z(d),Z($),w=!1,q()}}}function Zt(t,s){return document.body.addEventListener("click",s),{destroy(){document.body.removeEventListener("click",s)}}}function Jt(t,s,n){let e,a,l,r;var i,c;i=Bt,c=t=>n(5,r=t),t.$$.on_destroy.push(o(i,c)),Bt.subscribe((()=>{window.scrollTo(0,0)}));let p=0,d=!1;return t.$$.update=()=>{4&t.$$.dirty&&n(4,e=p<800),24&t.$$.dirty&&n(3,d=!!e&&d),32&t.$$.dirty&&n(6,a=r.title?r.title+" — "+Pt:Pt),32&t.$$.dirty&&n(7,l="no_sidebar"===r.meta.layout)},[function(t){return{destroy:Bt.subscribe((s=>{t.querySelectorAll("a").forEach((t=>{t.getAttribute("href")===s.url?t.classList.add("active"):t.classList.remove("active")}))}))}},Zt,p,d,e,r,a,l,function(){n(2,p=Gt.innerWidth)},()=>n(3,d=!1),()=>n(3,d=!d)]}class Kt extends Q{constructor(t){super(),K(this,t,Jt,Ft,l,{set_active_link:0,outside_click:1})}get set_active_link(){return this.$$.ctx[0]}get outside_click(){return Zt}}function Qt(s){let n,e;return n=new Kt({}),{c(){D(n.$$.fragment)},m(t,s){F(n,t,s),e=!0},p:t,i(t){e||(G(n.$$.fragment,t),e=!0)},o(t){W(n.$$.fragment,t),e=!1},d(t){Z(n,t)}}}function Xt(t){return T((()=>(addEventListener("click",Ct),addEventListener("popstate",Et),function(){removeEventListener("click",Ct),removeEventListener("popstate",Et)}))),[]}return new class extends Q{constructor(t){super(),K(this,t,Xt,Qt,l,{})}}({target:document.body,props:{}})}();
