import{p as g,i as f,f as b,a as u,b as C,t as w,s as r,c as N,e as A}from"./props-B6Nwaz5R.js";import{l as v,j as e,k as i,c as T,s as y,d as I}from"./create-runtime-stories-6baN-oeP.js";import"./index-Cu4lwwaE.js";import"./index-7SSfYZ8z.js";const S=(s,a)=>{v(s,N(()=>A(a==null?void 0:a(),[])))},B={title:"Iroco-UI/Components/Navigation",component:v,argTypes:{color:{control:{type:"color"}}},args:{type:"topbar",navigationItems:[new e("About","/about"),new e("Foo","/foo"),new e("Bar","/bar"),new e("Button","/bar",i.BUTTON),new e("Anchor","/bar",i.ANCHOR),new e("Form","/bar",i.FORM)]}},{Story:t}=I();var D=w("<!> <!> <!> <!> <!>",1);function d(s,a){g(a,!1),y(S),f();var n=D(),l=b(n);t(l,{name:"Default",parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}});var m=r(l,2);t(m,{name:"Sidebar",args:{type:"sidebar"},parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}});var p=r(m,2);t(p,{name:"Title",args:{title:"Alternative title"},parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}});var c=r(p,2);t(c,{name:"Color",args:{color:"#ABCDEF"},parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}});var _=r(c,2);t(_,{name:"Active",args:{currentRoute:"/bar",navigationItems:[new e("About","/about"),new e("Foo","/foo"),new e("Bar","/bar")]},parameters:{__svelteCsf:{rawCode:`<Navigation
	{...args}
/>`}}}),u(s,n),C()}d.__docgen={version:3,name:"Navigation.stories.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[],refs:[]};const o=T(d,B),x=["Default","Sidebar","Title","Color","Active"],j=o.Default,k=o.Sidebar,E=o.Title,M=o.Color,U=o.Active;export{U as Active,M as Color,j as Default,k as Sidebar,E as Title,x as __namedExportsOrder,B as default};
