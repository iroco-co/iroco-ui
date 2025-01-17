import{p as _,i as f,f as b,a as u,b as C,t as w,s,c as N,e as A}from"./props-rZpV7w-1.js";import{l as c,j as e,k as i,c as T,s as y,d as S}from"./create-runtime-stories-CIwcQWO4.js";import"./index-Cu4lwwaE.js";import"./index-7SSfYZ8z.js";const h=(r,a)=>{c(r,N(()=>A(a==null?void 0:a(),[])))},B={title:"Navigation",component:c,argTypes:{color:{control:{type:"color"}}},args:{type:"topbar",navigationItems:[new e("About","/about"),new e("Foo","/foo"),new e("Bar","/bar"),new e("Button","/bar",i.BUTTON),new e("Anchor","/bar",i.ANCHOR),new e("Form","/bar",i.FORM)]}},{Story:t}=S();var D=w("<!> <!> <!> <!> <!>",1);function d(r,a){_(a,!1),y(h),f();var n=D(),l=b(n);t(l,{name:"Default",parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}});var m=s(l,2);t(m,{name:"Sidebar",args:{type:"sidebar"},parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}});var p=s(m,2);t(p,{name:"Title",args:{title:"Alternative title"},parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}});var v=s(p,2);t(v,{name:"Color",args:{color:"#ABCDEF"},parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}});var g=s(v,2);t(g,{name:"Active",args:{navigating:{to:{url:{pathname:"/bar"}}},navigationItems:[new e("About","/about"),new e("Foo","/foo"),new e("Bar","/bar")]},parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}}),u(r,n),C()}d.__docgen={version:3,name:"Navigation.stories.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[],refs:[]};const o=T(d,B),R=["Default","Sidebar","Title","Color","Active"],j=o.Default,k=o.Sidebar,E=o.Title,M=o.Color,H=o.Active;export{H as Active,M as Color,j as Default,k as Sidebar,E as Title,R as __namedExportsOrder,B as default};
