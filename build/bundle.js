var routify_app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function i(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function c(t){let e;return a(t,t=>e=t)(),e}function l(t,e,n){t.$$.on_destroy.push(a(e,n))}function u(t,e,n,o){if(t){const r=p(t,e,n,o);return t[0](r)}}function p(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function f(t,e,n,o,r,i,s){const a=function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(e,o,r,i);if(a){const r=p(e,n,o,s);t.p(r,a)}}function d(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function m(t){t.parentNode.removeChild(t)}function g(t){return document.createElement(t)}function $(t){return document.createTextNode(t)}function y(){return $(" ")}function b(){return $("")}function w(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function _(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function x(t,e,n){t.classList[n?"add":"remove"](e)}let v;function P(t){v=t}function k(){if(!v)throw new Error("Function called outside component initialization");return v}function O(t,e){k().$$.context.set(t,e)}function E(t){return k().$$.context.get(t)}const j=[],L=[],I=[],S=[],N=Promise.resolve();let T=!1;function C(){T||(T=!0,N.then(B))}function M(){return C(),N}function R(t){I.push(t)}let A=!1;const F=new Set;function B(){if(!A){A=!0;do{for(let t=0;t<j.length;t+=1){const e=j[t];P(e),q(e.$$)}for(P(null),j.length=0;L.length;)L.pop()();for(let t=0;t<I.length;t+=1){const e=I[t];F.has(e)||(F.add(e),e())}I.length=0}while(j.length);for(;S.length;)S.pop()();T=!1,A=!1,F.clear()}}function q(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}const U=new Set;let H;function D(){H={r:0,c:[],p:H}}function K(){H.r||r(H.c),H=H.p}function z(t,e){t&&t.i&&(U.delete(t),t.i(e))}function W(t,e,n,o){if(t&&t.o){if(U.has(t))return;U.add(t),H.c.push(()=>{U.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function J(t,e){t.d(1),e.delete(t.key)}function G(t,e){W(t,1,1,()=>{e.delete(t.key)})}function Q(t,e,n,o,r,i,s,a,c,l,u,p){let f=t.length,d=i.length,h=f;const m={};for(;h--;)m[t[h].key]=h;const g=[],$=new Map,y=new Map;for(h=d;h--;){const t=p(r,i,h),a=n(t);let c=s.get(a);c?o&&c.p(t,e):(c=l(a,t),c.c()),$.set(a,g[h]=c),a in m&&y.set(a,Math.abs(h-m[a]))}const b=new Set,w=new Set;function _(t){z(t,1),t.m(a,u),s.set(t.key,t),u=t.first,d--}for(;f&&d;){const e=g[d-1],n=t[f-1],o=e.key,r=n.key;e===n?(u=e.first,f--,d--):$.has(r)?!s.has(o)||b.has(o)?_(e):w.has(r)?f--:y.get(o)>y.get(r)?(w.add(o),_(e)):(b.add(r),f--):(c(n,s),f--)}for(;f--;){const e=t[f];$.has(e.key)||c(e,s)}for(;d;)_(g[d-1]);return g}function V(t){t&&t.c()}function Z(t,e,o,s){const{fragment:a,on_mount:c,on_destroy:l,after_update:u}=t.$$;a&&a.m(e,o),s||R(()=>{const e=c.map(n).filter(i);l?l.push(...e):r(e),t.$$.on_mount=[]}),u.forEach(R)}function X(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Y(e,n,i,s,a,c,l=[-1]){const u=v;P(e);const p=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:a,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:n.context||[]),callbacks:o(),dirty:l,skip_bound:!1};let f=!1;if(p.ctx=i?i(e,n.props||{},(t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&a(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),f&&function(t,e){-1===t.$$.dirty[0]&&(j.push(t),C(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n}):[],p.update(),f=!0,r(p.before_update),p.fragment=!!s&&s(p.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);p.fragment&&p.fragment.l(t),t.forEach(m)}else p.fragment&&p.fragment.c();n.intro&&z(e.$$.fragment),Z(e,n.target,n.anchor,n.customElement),B()}P(u)}class tt{$destroy(){X(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}var et={queryHandler:{parse:t=>{return e=new URLSearchParams(t),[...e].reduce((t,[e,n])=>(t[e]=n,t),{});var e},stringify:t=>"?"+new URLSearchParams(t).toString()},urlTransform:{apply:t=>t,remove:t=>t},useHash:!1};const nt=RegExp(/\:([^/()]+)/g);function ot(t,e){if(navigator.userAgent.includes("jsdom"))return!1;e&&function t(e){e&&e.scrollTo&&"scroll-lock"!==e.dataset.routify&&"lock"!==e.dataset["routify-scroll"]&&(e.style["scroll-behavior"]="auto",e.scrollTo({top:0,behavior:"auto"}),e.style["scroll-behavior"]="",t(e.parentElement))}(t),function(){if(navigator.userAgent.includes("jsdom"))return!1;const{hash:t}=window.location;if(t){if(/^[A-Za-z]+[\w\-\:\.]*$/.test(t.substring(1))){const e=document.querySelector(t);e&&e.scrollIntoView()}}}()}const rt=t=>{const e=[];let n;for(;n=nt.exec(t);)e.push(n[1]);return e};function it(t,e){it._console=it._console||{log:console.log,warn:console.warn};const{_console:n}=it,o=t.componentFile.name.replace(/Proxy<_?(.+)>/,"$1").replace(/^Index$/,t.component.shortPath.split("/").pop()).replace(/^./,t=>t.toUpperCase()).replace(/\:(.+)/,"U5B$1u5D"),r=[`<${o}> received an unexpected slot "default".`,`<${o}> was created with unknown prop 'scoped'`,`<${o}> was created with unknown prop 'scopedSync'`];for(const t of["log","warn"])console[t]=(...e)=>{r.includes(e[0])||n[t](...e)},e().then(()=>{console[t]=n[t]})}function st(){let t=window.location.pathname+window.location.search+window.location.hash;const{url:e,options:n}=function(t){const[e,n]=t.split("__[[routify_url_options]]__"),o=JSON.parse(decodeURIComponent(n||"")||"{}");return window.routify=window.routify||{},window.routify.prefetched=o.prefetch,{url:e,options:o}}(t);return{...at(e),options:n}}function at(t){et.useHash&&(t=t.replace(/.*#(.+)/,"$1"));const e=t.startsWith("/")?window.location.origin:void 0,n=new URL(t,e);return{url:n,fullpath:n.pathname+n.search+n.hash}}function ct(t,e,n){const o=et.useHash?"#":"";let r;return r=function(t,e,n){const o=Object.assign({},n,e),r=function(t,e){if(!et.queryHandler)return"";const n=rt(t),o={};e&&Object.entries(e).forEach(([t,e])=>{n.includes(t)||(o[t]=e)});return et.queryHandler.stringify(o).replace(/\?$/,"")}(t,e);for(const[e,n]of Object.entries(o))t=t.replace(":"+e,n);return`${t}${r}`}(t,e,n),r=et.urlTransform.apply(r),r=o+r,r}function lt(t){let e;const n=t[2].default,o=u(n,t,t[1],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,[r]){o&&o.p&&(!e||2&r)&&f(o,n,t,t[1],r,null,null)},i(t){e||(z(o,t),e=!0)},o(t){W(o,t),e=!1},d(t){o&&o.d(t)}}}function ut(t,e,n){let{$$slots:o={},$$scope:r}=e,{scoped:i={}}=e;return t.$$set=t=>{"scoped"in t&&n(0,i=t.scoped),"$$scope"in t&&n(1,r=t.$$scope)},[i,r,o]}class pt extends tt{constructor(t){super(),Y(this,t,ut,lt,s,{scoped:0})}}const ft=[];function dt(e,n=t){let o;const r=[];function i(t){if(s(e,t)&&(e=t,o)){const t=!ft.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),ft.push(n,e)}if(t){for(let t=0;t<ft.length;t+=2)ft[t][0](ft[t+1]);ft.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(s,a=t){const c=[s,a];return r.push(c),1===r.length&&(o=n(i)||t),s(e),()=>{const t=r.indexOf(c);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}function ht(e,n,o){const s=!Array.isArray(e),c=s?[e]:e,l=n.length<2;return{subscribe:dt(o,e=>{let o=!1;const u=[];let p=0,f=t;const d=()=>{if(p)return;f();const o=n(s?u[0]:u,e);l?e(o):f=i(o)?o:t},h=c.map((t,e)=>a(t,t=>{u[e]=t,p&=~(1<<e),o&&d()},()=>{p|=1<<e}));return o=!0,d(),function(){r(h),f()}}).subscribe}}window.routify=window.routify||{};const mt=dt(null),gt=dt([]);gt.subscribe(t=>window.routify.routes=t);let $t=dt({component:{params:{}}});const yt=dt(null),bt=dt(!0);function wt(t,e=!1){t=et.urlTransform.remove(t);let{pathname:n,search:o}=at(t).url;const r=c(gt),i=r.find(t=>n===t.meta.name)||r.find(t=>n.match(t.regex));if(!i)throw new Error(`Route could not be found for "${n}".`);const s=e?Object.create(i):i,{route:a,redirectPath:l,rewritePath:u}=function t(e,n,o,r){const{redirect:i,rewrite:s}=e.meta;if(i||s){o=i?i.path||i:o,r=s?s.path||s:o;const a=i&&i.params,c=s&&s.params,l=n.find(t=>t.path===r);return l===e&&console.error(r+" is redirecting to itself"),l||console.error(`${e.path} is redirecting to non-existent path: ${r}`),(a||c)&&(l.params=Object.assign({},l.params,a,c)),t(l,n,o,r)}return{route:e,redirectPath:o,rewritePath:r}}(s,r);return u&&(({pathname:n,search:o}=at(ct(u,a.params)).url),l&&(a.redirectTo=ct(l,a.params||{}))),et.queryHandler&&(a.params=Object.assign({},et.queryHandler.parse(o))),function(t,e){if(t.paramKeys){const n=function(t){const e=[];return t.forEach(t=>{e[t.path.split("/").filter(Boolean).length-1]=t}),e}(t.layouts),o=e.split("/").filter(Boolean);(function(t){return t.split("/").filter(Boolean).map(t=>t.match(/\:(.+)/)).map(t=>t&&t[1])})(t.path).forEach((e,r)=>{e&&(t.params[e]=o[r],n[r]?n[r].param={[e]:o[r]}:t.param={[e]:o[r]})})}}(a,n),a.leftover=t.replace(new RegExp(a.regex),""),a}function _t(t,e,n){const o=t.slice();return o[1]=e[n],o}function xt(t,e){let n,o;return{key:t,first:null,c(){n=g("iframe"),n.src!==(o=e[1].url)&&w(n,"src",o),w(n,"frameborder","0"),w(n,"title","routify prefetcher"),this.first=n},m(t,e){h(t,n,e)},p(t,r){e=t,1&r&&n.src!==(o=e[1].url)&&w(n,"src",o)},d(t){t&&m(n)}}}function vt(e){let n,o=[],r=new Map,i=e[0];const s=t=>t[1].options.prefetch;for(let t=0;t<i.length;t+=1){let n=_t(e,i,t),a=s(n);r.set(a,o[t]=xt(a,n))}return{c(){n=g("div");for(let t=0;t<o.length;t+=1)o[t].c();w(n,"id","__routify_iframes"),_(n,"display","none")},m(t,e){h(t,n,e);for(let t=0;t<o.length;t+=1)o[t].m(n,null)},p(t,[e]){1&e&&(i=t[0],o=Q(o,e,s,1,t,i,r,n,J,xt,null,_t))},i:t,o:t,d(t){t&&m(n);for(let t=0;t<o.length;t+=1)o[t].d()}}}const Pt=dt([]),kt=ht(Pt,t=>t.slice(0,2));function Ot(t){const e=t.data?t.data.prefetchId:t;if(!e)return null;const n=c(Pt).find(t=>t&&t.options.prefetch==e);if(n){const{gracePeriod:t}=n.options,o=new Promise(e=>setTimeout(e,t)),r=new Promise(e=>{window.requestIdleCallback?window.requestIdleCallback(e):setTimeout(e,t+1e3)});Promise.all([o,r]).then(()=>{Pt.update(t=>t.filter(t=>t.options.prefetch!=e))})}}function Et(t,e,n){let o;return l(t,kt,t=>n(0,o=t)),[o]}kt.subscribe(t=>t.forEach(({options:t})=>{setTimeout(()=>Ot(t.prefetch),t.timeout)})),addEventListener("message",Ot,!1);class jt extends tt{constructor(t){super(),Y(this,t,Et,vt,s,{})}}function Lt(){return E("routify")||$t}const It={subscribe:t=>ht(mt,t=>t.api).subscribe(t)},St={subscribe:t=>ht(Lt(),t=>t.layout.api).subscribe(t)},Nt={_hooks:[t=>bt.set(!1)],subscribe:Ct},Tt={_hooks:[],subscribe:Ct};function Ct(t){const e=this._hooks,n=e.length;return t(t=>{e[n]=t}),(...o)=>{delete e[n],t(...o)}}const Mt={subscribe(t){const e=Lt(),{route:n,routes:o}=c(e);return ht(e,t=>{return e=t,r=n,i=o,function(t,n={},o){const{component:s}=e,a=Object.assign({},r.params,s.params);let c=t&&t.nodeType&&t;c&&(t=t.getAttribute("href")),t=t?function(t){if(t.match(/^\.\.?\//)){let[,e,n]=t.match(/^([\.\/]+)(.*)/),o=s.path.replace(/\/$/,"");const r=e.match(/\.\.\//g)||[];s.isPage&&r.push(null),r.forEach(()=>o=o.replace(/\/[^\/]+\/?$/,"")),t=(t=`${o}/${n}`.replace(/\/$/,""))||"/"}else if(t.match(/^\//));else{const e=i.find(e=>e.meta.name===t);e&&(t=e.shortPath)}return t}(t):s.shortPath;const l=i.find(e=>[e.shortPath||"/",e.path].includes(t));if(l&&"proximity"===l.meta.preload&&window.requestIdleCallback){const t=routify.appLoaded?0:1500;setTimeout(()=>{window.requestIdleCallback(()=>l.api.preload())},t)}o&&!1!==o.strict||(t=t.replace(/index$/,""));let u=ct(t,n,a);return c?(c.href=u,{update(e){c.href=ct(t,e,a)}}):u};var e,r,i}).subscribe(t)}};const Rt={subscribe:t=>ht([Mt,mt],([t,e])=>function(n="",o={},{strict:r}={strict:!0}){n=t(n,o,{strict:r});const i=t(e.path,null,{strict:r}),s=new RegExp("^"+n+"($|/)");return!!i.match(s)}).subscribe(t)},At={subscribe(t){return this._origin=this.getOrigin(),t(Ft)},props:{},templates:{},services:{plain:{propField:"name",valueField:"content"},twitter:{propField:"name",valueField:"content"},og:{propField:"property",valueField:"content"}},plugins:[{name:"applyTemplate",condition:()=>!0,action:(t,e)=>[t,(At.getLongest(At.templates,t)||(t=>t))(e)]},{name:"createMeta",condition:()=>!0,action(t,e){At.writeMeta(t,e)}},{name:"createOG",condition:t=>!t.match(":"),action(t,e){At.writeMeta("og:"+t,e)}},{name:"createTitle",condition:t=>"title"===t,action(t,e){document.title=e}}],getLongest(t,e){const n=t[e];if(n){const o=c(mt).path;return n[Object.keys(t[e]).filter(t=>o.includes(t)).sort((t,e)=>e.length-t.length)[0]]}},writeMeta(t,e){const n=document.getElementsByTagName("head")[0],o=t.match(/(.+)\:/),r=o&&o[1]||"plain",{propField:i,valueField:s}=Ft.services[r]||Ft.services.plain,a=document.querySelector(`meta[${i}='${t}']`);a&&a.remove();const c=document.createElement("meta");c.setAttribute(i,t),c.setAttribute(s,e),c.setAttribute("data-origin","routify"),n.appendChild(c)},set(t,e){"string"==typeof t&&At.plugins.forEach(n=>{n.condition(t,e)&&([t,e]=n.action(t,e)||[t,e])})},clear(){const t=document.querySelector("meta");t&&t.remove()},template(t,e){const n=At.getOrigin;At.templates[t]=At.templates[t]||{},At.templates[t][n]=e},update(){Object.keys(At.props).forEach(t=>{let e=At.getLongest(At.props,t);At.plugins.forEach(n=>{n.condition(t,e)&&([t,e]=n.action(t,e)||[t,e])})})},batchedUpdate(){At._pendingUpdate||(At._pendingUpdate=!0,setTimeout(()=>{At._pendingUpdate=!1,this.update()}))},_updateQueued:!1,_origin:!1,getOrigin(){if(this._origin)return this._origin;const t=Lt();return t&&c(t).path||"/"},_pendingUpdate:!1},Ft=new Proxy(At,{set(t,e,n,o){const{props:r}=t;return Reflect.has(t,e)?Reflect.set(t,e,n,o):(r[e]=r[e]||{},r[e][t.getOrigin()]=n),window.routify.appLoaded&&t.batchedUpdate(),!0}});function Bt(t,e,n){const o=t.slice();return o[21]=e[n].component,o[22]=e[n].componentFile,o[2]=e[n].decorator,o[1]=e[n].nodes,o}function qt(t){let e,n,o=[],r=new Map,i=[t[4]];const s=t=>t[7];for(let e=0;e<1;e+=1){let n=Bt(t,i,e),a=s(n);r.set(a,o[e]=Kt(a,n))}return{c(){for(let t=0;t<1;t+=1)o[t].c();e=b()},m(t,r){for(let e=0;e<1;e+=1)o[e].m(t,r);h(t,e,r),n=!0},p(t,n){33554621&n&&(i=[t[4]],D(),o=Q(o,n,s,1,t,i,r,e.parentNode,G,Kt,e,Bt),K())},i(t){if(!n){for(let t=0;t<1;t+=1)z(o[t]);n=!0}},o(t){for(let t=0;t<1;t+=1)W(o[t]);n=!1},d(t){for(let e=0;e<1;e+=1)o[e].d(t);t&&m(e)}}}function Ut(t){let e,n;return e=new Gt({props:{decorator:t[2],nodes:t[1],scoped:{...t[0],...t[25]}}}),{c(){V(e.$$.fragment)},m(t,o){Z(e,t,o),n=!0},p(t,n){const o={};4&n&&(o.decorator=t[2]),16&n&&(o.nodes=t[1]),33554433&n&&(o.scoped={...t[0],...t[25]}),e.$set(o)},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){X(e,t)}}}function Ht(t){let e,n,o=t[21]&&t[1].length&&Ut(t);return{c(){o&&o.c(),e=b()},m(t,r){o&&o.m(t,r),h(t,e,r),n=!0},p(t,n){t[21]&&t[1].length?o?(o.p(t,n),16&n&&z(o,1)):(o=Ut(t),o.c(),z(o,1),o.m(e.parentNode,e)):o&&(D(),W(o,1,1,()=>{o=null}),K())},i(t){n||(z(o),n=!0)},o(t){W(o),n=!1},d(t){o&&o.d(t),t&&m(e)}}}function Dt(t){let n,o,r;const i=[{scoped:t[0]},{scopedSync:t[5]},t[3].param||{}];var s=t[22];function a(t){let n={$$slots:{default:[Ht,({scoped:t,decorator:e})=>({25:t,2:e}),({scoped:t,decorator:e})=>(t?33554432:0)|(e?4:0)]},$$scope:{ctx:t}};for(let t=0;t<i.length;t+=1)n=e(n,i[t]);return{props:n}}return s&&(n=new s(a(t))),{c(){n&&V(n.$$.fragment),o=y()},m(t,e){n&&Z(n,t,e),h(t,o,e),r=!0},p(t,e){const r=41&e?function(t,e){const n={},o={},r={$$scope:1};let i=t.length;for(;i--;){const s=t[i],a=e[i];if(a){for(const t in s)t in a||(o[t]=1);for(const t in a)r[t]||(n[t]=a[t],r[t]=1);t[i]=a}else for(const t in s)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(i,[1&e&&{scoped:t[0]},32&e&&{scopedSync:t[5]},8&e&&(c=t[3].param||{},"object"==typeof c&&null!==c?c:{})]):{};var c;if(100663317&e&&(r.$$scope={dirty:e,ctx:t}),s!==(s=t[22])){if(n){D();const t=n;W(t.$$.fragment,1,0,()=>{X(t,1)}),K()}s?(n=new s(a(t)),V(n.$$.fragment),z(n.$$.fragment,1),Z(n,o.parentNode,o)):n=null}else s&&n.$set(r)},i(t){r||(n&&z(n.$$.fragment,t),r=!0)},o(t){n&&W(n.$$.fragment,t),r=!1},d(t){n&&X(n,t),t&&m(o)}}}function Kt(t,e){let n,o,r,i;var s=e[2];function a(t){return{props:{scoped:t[0],$$slots:{default:[Dt]},$$scope:{ctx:t}}}}return s&&(o=new s(a(e))),{key:t,first:null,c(){n=b(),o&&V(o.$$.fragment),r=b(),this.first=n},m(t,e){h(t,n,e),o&&Z(o,t,e),h(t,r,e),i=!0},p(t,n){e=t;const i={};if(1&n&&(i.scoped=e[0]),67108925&n&&(i.$$scope={dirty:n,ctx:e}),s!==(s=e[2])){if(o){D();const t=o;W(t.$$.fragment,1,0,()=>{X(t,1)}),K()}s?(o=new s(a(e)),V(o.$$.fragment),z(o.$$.fragment,1),Z(o,r.parentNode,r)):o=null}else s&&o.$set(i)},i(t){i||(o&&z(o.$$.fragment,t),i=!0)},o(t){o&&W(o.$$.fragment,t),i=!1},d(t){t&&m(n),t&&m(r),o&&X(o,t)}}}function zt(e){let n,o,r;return{c(){n=g("div"),_(n,"display","contents")},m(s,a){var c;h(s,n,a),o||(c=e[10].call(null,n),r=c&&i(c.destroy)?c.destroy:t,o=!0)},d(t){t&&m(n),o=!1,r()}}}function Wt(t){let e,n,o,r=t[4]&&qt(t),i=!t[6]&&zt(t);return{c(){r&&r.c(),e=y(),i&&i.c(),n=b()},m(t,s){r&&r.m(t,s),h(t,e,s),i&&i.m(t,s),h(t,n,s),o=!0},p(t,[o]){t[4]?r?(r.p(t,o),16&o&&z(r,1)):(r=qt(t),r.c(),z(r,1),r.m(e.parentNode,e)):r&&(D(),W(r,1,1,()=>{r=null}),K()),t[6]?i&&(i.d(1),i=null):i||(i=zt(t),i.c(),i.m(n.parentNode,n))},i(t){o||(z(r),o=!0)},o(t){W(r),o=!1},d(t){r&&r.d(t),t&&m(e),i&&i.d(t),t&&m(n)}}}function Jt(t,e,n){let o,r,i,s,a;l(t,mt,t=>n(15,s=t)),l(t,gt,t=>n(16,a=t));let c,{nodes:u=[]}=e,{scoped:p={}}=e,{decorator:f}=e,d=null,h=null,m={},g=1;const $=dt(null);l(t,$,t=>n(4,r=t));const y=E("routify")||$t;l(t,y,t=>n(14,i=t));O("routify",$);let b=[];function w(t){n(5,m={...p});const e={...r,nodes:h,decorator:f||pt,layout:d.isLayout?d:i.layout,component:d,route:s,routes:a,componentFile:t,parentNode:c||i.parentNode};$.set(e),function(t,e,n=e){t.set(n)}(y,i.child=d,i),0===h.length&&async function(){await new Promise(t=>setTimeout(t));const t=r.component.path===s.path;!window.routify.stopAutoReady&&t&&async function({page:t,metatags:e,afterPageLoad:n,parentNode:o}){const r=t.last!==t;setTimeout(()=>ot(o,r));const{path:i}=t,{options:s}=st(),a=s.prefetch;for(const e of n._hooks)e&&await e(t.api);e.update(),dispatchEvent(new CustomEvent("app-loaded")),parent.postMessage({msg:"app-loaded",prefetched:window.routify.prefetched,path:i,prefetchId:a},"*"),window.routify.appLoaded=!0,window.routify.stopAutoReady=!1}({page:r.component,metatags:Ft,afterPageLoad:Nt,parentNode:c})}()}return t.$$set=t=>{"nodes"in t&&n(1,u=t.nodes),"scoped"in t&&n(0,p=t.scoped),"decorator"in t&&n(2,f=t.decorator)},t.$$.update=()=>{6146&t.$$.dirty&&b!==u&&(n(12,b=u),n(3,[d,...h]=[...u],d),n(3,d.api.reset=()=>n(11,g++,g),d)),8&t.$$.dirty&&function(t){let e=t.component();e instanceof Promise?e.then(w):w(e)}(d),2064&t.$$.dirty&&n(7,o=r&&g&&function({meta:t,path:e,param:n,params:o}){return JSON.stringify({path:e,invalidate:g,param:(t["param-is-page"]||t["slug-is-page"])&&n,queryParams:t["query-params-is-page"]&&o})}(r.component)),16&t.$$.dirty&&r&&it(r,M)},[p,u,f,d,r,m,c,o,$,y,t=>n(6,c=t.parentNode),g,b]}class Gt extends tt{constructor(t){super(),Y(this,t,Jt,Wt,s,{nodes:1,scoped:0,decorator:2})}}function Qt(t,e){let n=!1;function o(o,r){const i=wt(o||st().fullpath);i.redirectTo&&(history.replaceStateNative({},null,i.redirectTo),delete i.redirectTo);const s=[...(r&&wt(st().fullpath,t)||i).layouts,i];n&&delete n.last,i.last=n,n=i,o||yt.set(i),mt.set(i),i.api.preload().then(()=>{bt.set(!0),e(s)})}const r=function(t){["pushState","replaceState"].forEach(t=>{history[t+"Native"]||(history[t+"Native"]=history[t]),history[t]=async function(e={},n,o){if(o===location.pathname+location.search+location.hash)return!1;const{id:r,path:i,params:s}=c(mt);e={id:r,path:i,params:s,...e};const a=new Event(t.toLowerCase());Object.assign(a,{state:e,title:n,url:o});return await Zt(a,o)?(history[t+"Native"].apply(this,[e,n,o]),dispatchEvent(a)):void 0}});let e=!1;const n={click:Vt,pushstate:()=>t(),replacestate:()=>t(),popstate:async n=>{e?e=!1:await Zt(n,st().fullpath)?t():(e=!0,n.preventDefault(),history.go(1))}};Object.entries(n).forEach(t=>addEventListener(...t));return()=>{Object.entries(n).forEach(t=>removeEventListener(...t))}}(o);return{updatePage:o,destroy:r}}function Vt(t){const e=t.target.closest("a"),n=e&&e.href;if(t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||t.button||t.defaultPrevented)return;if(!n||e.target||e.host!==location.host)return;const o=new URL(n),r=o.pathname+o.search+o.hash;t.preventDefault(),history.pushState({},"",r)}async function Zt(t,e){const n=wt(e).api;for(const o of Tt._hooks.filter(Boolean)){if(!await o(t,n,{url:e}))return!1}return!0}function Xt(t){let e,n;return e=new Gt({props:{nodes:t[0]}}),{c(){V(e.$$.fragment)},m(t,o){Z(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.nodes=t[0]),e.$set(o)},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){X(e,t)}}}function Yt(t){let e,n,o,r=t[0]&&null!==t[1]&&Xt(t);return n=new jt({}),{c(){r&&r.c(),e=y(),V(n.$$.fragment)},m(t,i){r&&r.m(t,i),h(t,e,i),Z(n,t,i),o=!0},p(t,[n]){t[0]&&null!==t[1]?r?(r.p(t,n),3&n&&z(r,1)):(r=Xt(t),r.c(),z(r,1),r.m(e.parentNode,e)):r&&(D(),W(r,1,1,()=>{r=null}),K())},i(t){o||(z(r),z(n.$$.fragment,t),o=!0)},o(t){W(r),W(n.$$.fragment,t),o=!1},d(t){r&&r.d(t),t&&m(e),X(n,t)}}}function te(t,e,n){let o;l(t,mt,t=>n(1,o=t));let r,i,{routes:s}=e,{config:a={}}=e;window.routify=window.routify||{},window.routify.inBrowser=!window.navigator.userAgent.match("jsdom"),Object.assign(et,a);O("routifyupdatepage",(...t)=>i&&i.updatePage(...t));const c=t=>n(0,r=t),u=()=>{i&&(i.destroy(),i=null)};let p=null;var f;return f=u,k().$$.on_destroy.push(f),t.$$set=t=>{"routes"in t&&n(2,s=t.routes),"config"in t&&n(3,a=t.config)},t.$$.update=()=>{4&t.$$.dirty&&s&&(clearTimeout(p),p=setTimeout(()=>{u(),i=Qt(s,c),gt.set(s),i.updatePage()}))},[r,o,s,a]}class ee extends tt{constructor(t){super(),Y(this,t,te,Yt,s,{routes:2,config:3})}}function ne(t){const e=async function(e){return await async function t(e,n){const o=await e(n);if(!1===o)return!1;const r=o||n.file;if(r.children){const o=await Promise.all(r.children.map(async o=>t(e,{state:n.state,scope:oe(n.scope||{}),parent:n.file,file:await o})));r.children=o.filter(Boolean)}return r}(t,{file:e.tree,state:{treePayload:e},scope:{}})};return e.sync=function(e){return function t(e,n){const o=e(n);if(!1===o)return!1;const r=o||n.file;if(r.children){const o=r.children.map(o=>t(e,{state:n.state,scope:oe(n.scope||{}),parent:n.file,file:o}));r.children=o.filter(Boolean)}return r}(t,{file:e.tree,state:{treePayload:e},scope:{}})},e}function oe(t){return JSON.parse(JSON.stringify(t))}const re=ne(({file:t})=>{(t.isPage||t.isFallback)&&(t.regex=((t,e)=>{const n=e?"":"/?$";return t="^"+(t=(t=(t=t.replace(/\/_fallback?$/,"(/|$)")).replace(/\/index$/,"(/index)?")).replace(nt,"([^/]+)")+n)})(t.path,t.isFallback))}),ie=ne(({file:t})=>{t.paramKeys=rt(t.path)}),se=ne(({file:t})=>{t.isFallback||t.isIndex?t.shortPath=t.path.replace(/\/[^/]+$/,""):t.shortPath=t.path}),ae=ne(({file:t})=>{t.ranking=(({path:t})=>t.split("/").filter(Boolean).map(t=>"_fallback"===t?"A":t.startsWith(":")?"B":"C").join(""))(t)}),ce=ne(({file:t})=>{const e=t,n=t.meta&&t.meta.children||[];n.length&&(e.children=e.children||[],e.children.push(...n.map(t=>({isMeta:!0,...t,meta:t}))))}),le=ne(t=>{const{file:e}=t,{isFallback:n,meta:o}=e,r=e.path.split("/").pop().startsWith(":"),i=e.path.endsWith("/index"),s=o.index||0===o.index,a=!1===o.index;e.isIndexable=s||!n&&!r&&!i&&!a,e.isNonIndexable=!e.isIndexable}),ue=ne(({file:t,parent:e})=>{Object.defineProperty(t,"parent",{get:()=>e}),Object.defineProperty(t,"nextSibling",{get:()=>pe(t,1)}),Object.defineProperty(t,"prevSibling",{get:()=>pe(t,-1)}),Object.defineProperty(t,"lineage",{get:()=>function t(e,n=[]){e&&(n.unshift(e),t(e.parent,n));return n}(e)})});function pe(t,e){if(!t.root){const n=t.parent.children.filter(t=>t.isIndexable),o=n.indexOf(t);return n[o+e]}}const fe=ne(({file:t,parent:e})=>{t.isIndex&&Object.defineProperty(e,"index",{get:()=>t})}),de=ne(({file:t,scope:e})=>{Object.defineProperty(t,"layouts",{get:()=>function t(e){if(!e.isLayout&&e.meta.reset)return[];const{parent:n}=e,o=n&&n.component&&n,r=o&&(o.isReset||o.meta.reset),i=n&&!r&&t(n)||[];o&&i.push(o);return i}(t)})}),he=ne(({file:t})=>{const e=t.root?function(){}:t.children?(t.isPage,function(){}):(t.isReset||t.isLayout||t.isFallback,function(){});Object.setPrototypeOf(t,e.prototype)});var me=Object.freeze({__proto__:null,setRegex:re,setParamKeys:ie,setShortPath:se,setRank:ae,addMetaChildren:ce,setIsIndexable:le,assignRelations:ue,assignIndex:fe,assignLayout:de,createFlatList:t=>{ne(t=>{(t.file.isPage||t.file.isFallback)&&t.state.treePayload.routes.push(t.file)}).sync(t),t.routes.sort((t,e)=>t.ranking>=e.ranking?-1:1)},setPrototype:he});const ge={isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!1,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},id:"__fallback"};function $e(t){return Object.entries(ge).forEach(([e,n])=>{void 0===t[e]&&(t[e]=n)}),t.children&&(t.children=t.children.map($e)),t}const ye=ne(({file:t})=>{t.api=new be(t)});class be{constructor(t){this.__file=t,Object.defineProperty(this,"__file",{enumerable:!1}),this.isMeta=!!t.isMeta,this.path=t.path,this.title=function(t){return void 0!==t.meta.title?t.meta.title:(t.shortPath||t.path).split("/").pop().replace(/-/g," ")}(t),this.meta=t.meta}get parent(){return!this.__file.root&&this.__file.parent.api}get children(){return(this.__file.children||this.__file.isLayout&&this.__file.parent.children||[]).filter(t=>!t.isNonIndexable).sort((t,e)=>t.isMeta&&e.isMeta?0:(t=(t.meta.index||t.meta.title||t.path).toString(),e=(e.meta.index||e.meta.title||e.path).toString(),t.localeCompare(e,void 0,{numeric:!0,sensitivity:"base"}))).map(({api:t})=>t)}get next(){return we(this,1)}get prev(){return we(this,-1)}async preload(){const t=[...this.__file.layouts,this.__file,this.index&&this.index.__file].filter(Boolean).map(t=>t.component());await Promise.all(t)}get component(){return this.__file.component?this.__file.component():!!this.__file.index&&this.__file.index.component()}get componentWithIndex(){return new Promise(t=>Promise.all([this.component,this.index&&this.index.component]).then(e=>t(e)))}get index(){const t=this.__file.children&&this.__file.children.find(t=>t.isIndex);return t&&t.api}}function we(t,e){if(!t.__file.root){const n=t.parent.children.indexOf(t);return t.parent.children[n+e]}}const _e={...me,restoreDefaults:({tree:t})=>$e(t),assignAPI:ye};const xe={root:!0,children:[{isFallback:!0,path:"/_fallback",component:()=>Promise.resolve().then((function(){return Le})).then(t=>t.default)},{isDir:!0,ext:"",children:[{ext:"svx",isPage:!0,meta:{frontmatter:{title:"Button",description:"A component to create buttons"},recursive:!0,preload:!1,prerender:!0},path:"/components/button",id:"_components_button",component:()=>Promise.resolve().then((function(){return Ne})).then(t=>t.default)}],path:"/components"},{ext:"svx",isIndex:!0,isPage:!0,path:"/index",id:"_index",component:()=>Promise.resolve().then((function(){return Ce})).then(t=>t.default)}],isLayout:!0,path:"/",id:"__layout",component:()=>Promise.resolve().then((function(){return He})).then(t=>t.default)},{tree:ve,routes:Pe}=function(t){const e=["restoreDefaults","setParamKeys","setRegex","setShortPath","setRank","assignLayout","setPrototype","addMetaChildren","assignRelations","setIsIndexable","assignIndex","assignAPI","createFlatList"],n={tree:t,routes:[]};for(let t of e){(_e[t].sync||_e[t])(n)}return n}(xe);function ke(e){let n,o;return n=new ee({props:{routes:Pe}}),{c(){V(n.$$.fragment)},m(t,e){Z(n,t,e),o=!0},p:t,i(t){o||(z(n.$$.fragment,t),o=!0)},o(t){W(n.$$.fragment,t),o=!1},d(t){X(n,t)}}}const Oe=function(t,e={target:document.body},n="hmr",o="app-loaded"){const r=document.getElementById(n),i=document.createElement("div");function s(){removeEventListener(o,s),r&&r.remove(),i.style.visibility=null,i.setAttribute("id",n)}return i.style.visibility="hidden",e.target.appendChild(i),r?addEventListener(o,s):s(),new t({...e,target:i})}(class extends tt{constructor(t){super(),Y(this,t,null,ke,s,{})}},{target:document.body},"routify-app");function Ee(e){let n,o,r,i,s,a,c,l;return{c(){n=g("div"),o=g("div"),o.textContent="404",r=y(),i=g("div"),s=$("Page not found. \n  \n  "),a=g("a"),c=$("Go back"),w(o,"class","huge svelte-33l10e"),w(a,"href",l=e[0]("../")),w(i,"class","big"),w(n,"class","e404 svelte-33l10e")},m(t,e){h(t,n,e),d(n,o),d(n,r),d(n,i),d(i,s),d(i,a),d(a,c)},p(t,[e]){1&e&&l!==(l=t[0]("../"))&&w(a,"href",l)},i:t,o:t,d(t){t&&m(n)}}}function je(t,e,n){let o;return l(t,Mt,t=>n(0,o=t)),[o]}var Le=Object.freeze({__proto__:null,default:class extends tt{constructor(t){super(),Y(this,t,je,Ee,s,{})}}});function Ie(e){let n;return{c(){n=g("h2"),n.textContent="text field",w(n,"id","text-field")},m(t,e){h(t,n,e)},p:t,i:t,o:t,d(t){t&&m(n)}}}function Se(t){return[]}var Ne=Object.freeze({__proto__:null,default:class extends tt{constructor(t){super(),Y(this,t,Se,Ie,s,{})}},metadata:{title:"Button",description:"A component to create buttons"}});function Te(e){let n,o,r,i,s,a,c,l,u;return{c(){n=g("h1"),n.textContent="Iroco UI Components",o=y(),r=g("p"),r.textContent="import it with",i=y(),s=g("pre"),a=y(),c=g("p"),c.textContent="Or",l=y(),u=g("pre"),w(n,"id","iroco-ui-components"),w(s,"class","language-null"),w(u,"class","language-null")},m(t,e){h(t,n,e),h(t,o,e),h(t,r,e),h(t,i,e),h(t,s,e),s.innerHTML='<code class="language-null">$ yarn add @iroco/ui</code>',h(t,a,e),h(t,c,e),h(t,l,e),h(t,u,e),u.innerHTML='<code class="language-null">$ npm install @iroco/ui</code>'},p:t,i:t,o:t,d(t){t&&m(n),t&&m(o),t&&m(r),t&&m(i),t&&m(s),t&&m(a),t&&m(c),t&&m(l),t&&m(u)}}}var Ce=Object.freeze({__proto__:null,default:class extends tt{constructor(t){super(),Y(this,t,null,Te,s,{})}}});function Me(t,e,n){const o=t.slice();return o[4]=e[n].path,o[5]=e[n].title,o}function Re(t){let e,n,o,r,i=t[5]+"";return{c(){e=g("li"),n=g("a"),o=$(i),w(n,"href",r=t[0](t[4])),x(n,"active",t[1](t[4]))},m(t,r){h(t,e,r),d(e,n),d(n,o)},p(t,e){1&e&&r!==(r=t[0](t[4]))&&w(n,"href",r),6&e&&x(n,"active",t[1](t[4]))},d(t){t&&m(e)}}}function Ae(e){let n,o,r,i,s,a,c,l=e[2],u=[];for(let t=0;t<l.length;t+=1)u[t]=Re(Me(e,l,t));return{c(){n=g("nav"),o=g("ul"),r=g("li"),r.innerHTML='<a href="/">Home</a>',i=y(),s=g("li"),s.textContent="Components",a=y(),c=g("ul");for(let t=0;t<u.length;t+=1)u[t].c();w(c,"class","svelte-lkyft0"),w(o,"class","svelte-lkyft0"),w(n,"class","svelte-lkyft0")},m(t,e){h(t,n,e),d(n,o),d(o,r),d(o,i),d(o,s),d(o,a),d(o,c);for(let t=0;t<u.length;t+=1)u[t].m(c,null)},p(t,[e]){if(7&e){let n;for(l=t[2],n=0;n<l.length;n+=1){const o=Me(t,l,n);u[n]?u[n].p(o,e):(u[n]=Re(o),u[n].c(),u[n].m(c,null))}for(;n<u.length;n+=1)u[n].d(1);u.length=l.length}},i:t,o:t,d(t){t&&m(n),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(u,t)}}}function Fe(t,e,n){let o,r,i;l(t,St,t=>n(3,o=t)),l(t,Mt,t=>n(0,r=t)),l(t,Rt,t=>n(1,i=t));const s=o.children[0].children.filter(t=>t.meta.frontmatter).sort((t,e)=>e.meta.frontmatter.published.localeCompare(t.meta.frontmatter.published));return console.log(s),[r,i,s]}class Be extends tt{constructor(t){super(),Y(this,t,Fe,Ae,s,{})}}function qe(t){let e,n,o,r,i;n=new Be({});const s=t[2].default,a=u(s,t,t[1],null);return{c(){e=g("div"),V(n.$$.fragment),o=y(),r=g("div"),a&&a.c(),w(r,"class","page svelte-1g4848d"),w(e,"class","container svelte-1g4848d")},m(t,s){h(t,e,s),Z(n,e,null),d(e,o),d(e,r),a&&a.m(r,null),i=!0},p(t,[e]){a&&a.p&&(!i||2&e)&&f(a,s,t,t[1],e,null,null)},i(t){i||(z(n.$$.fragment,t),z(a,t),i=!0)},o(t){W(n.$$.fragment,t),W(a,t),i=!1},d(t){t&&m(e),X(n),a&&a.d(t)}}}function Ue(t,e,n){let o;l(t,It,t=>n(0,o=t));let{$$slots:r={},$$scope:i}=e;return Ft.description="Description coming soon...",t.$$set=t=>{"$$scope"in t&&n(1,i=t.$$scope)},t.$$.update=()=>{1&t.$$.dirty&&(Ft.title="My Routify app - "+o.title)},[o,i,r]}var He=Object.freeze({__proto__:null,default:class extends tt{constructor(t){super(),Y(this,t,Ue,qe,s,{})}}});return Oe}();
//# sourceMappingURL=bundle.js.map
