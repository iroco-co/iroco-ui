import{p as f,t as _,f as g,s as l,a as i,b as v,c as w,d as B,g as C,e as D,h,j as u,k as x,l as S}from"./props--2bXcsK5.js";import{B as p,c as y,s as Y,d as b}from"./create-runtime-stories-Va66QsU-.js";import"./index-Cu4lwwaE.js";import"./index-CfOrKyLd.js";const j=(a,t)=>{p(a,w(()=>D(t==null?void 0:t(),[]),{onclick:T,children:(o,r)=>{var e=B();C(()=>S(e,`You clicked: ${u(d)??""}`)),i(o,e)},$$slots:{default:!0}}))},I={title:"Iroco-UI/Atoms/Button",component:p,argTypes:{kind:{control:{type:"select"},options:["danger","success","dark","basic"]},size:{control:{type:"select"},options:["small","regular"]}}},{Story:s}=b();let d=x(0);function T(){h(d,u(d)+1)}var z=_("<!> <!> <!> <!>",1);function k(a,t){f(t,!0),Y(j);var c=z(),o=g(c);s(o,{name:"Default",parameters:{__svelteCsf:{rawCode:`<!--👇 'on:click' allows to forward event to addon-actions  -->
<Button {...args} onclick={handleClick}>
	You clicked: {count}
</Button>`}}});var r=l(o,2);s(r,{name:"Success",args:{kind:"success"},parameters:{__svelteCsf:{rawCode:`<!--👇 'on:click' allows to forward event to addon-actions  -->
<Button {...args} onclick={handleClick}>
	You clicked: {count}
</Button>`}}});var e=l(r,2);s(e,{name:"Danger",args:{kind:"danger"},parameters:{__svelteCsf:{rawCode:`<!--👇 'on:click' allows to forward event to addon-actions  -->
<Button {...args} onclick={handleClick}>
	You clicked: {count}
</Button>`}}});var m=l(e,2);s(m,{name:"Dark",args:{kind:"dark"},parameters:{__svelteCsf:{rawCode:`<!--👇 'on:click' allows to forward event to addon-actions  -->
<Button {...args} onclick={handleClick}>
	You clicked: {count}
</Button>`}}}),i(a,c),v()}k.__docgen={version:3,name:"Button.stories.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[],refs:[]};const n=y(k,I),P=["Default","Success","Danger","Dark"],R=n.Default,U=n.Success,q=n.Danger,F=n.Dark;export{q as Danger,F as Dark,R as Default,U as Success,P as __namedExportsOrder,I as default};
