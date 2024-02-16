import{S as k,i as _,s as d,c as m,a as i,m as p,t as u,b as f,d as c,e as g,g as T,f as b}from"./index-DHfJCwuS.js";import{s as D,c as v,i as w,d as I}from"./lifecycle-Cj6YEbBn.js";/* empty css              */import"./Button-c-euUx5_.js";import{D as y}from"./IconTrashCan-DS-m8Unk.js";import"./Navigation-2RlmKoQx.js";import"./IconMoreSign-lc3eGa03.js";import"./Alert-C3f39EQA.js";import{p as S,T as h,S as x}from"./collect-stories-BzwbxQve.js";import"./IconBurger-Bn7YgEBv.js";import"./IconClose-COmvt-R-.js";function C(n){let t,r;const a=[n[0],{columns:[{key:"key1",title:"Title 1"},{key:"key2",title:"Title 2"},{key:"key3",title:"Title 3"}]},{rows:[{key1:"value 1",key2:"value 2",key3:"value 3"},{key1:"value a",key2:"value b",key3:"value c"},{key1:1.56,key2:2.76,key3:3.98}]}];let l={};for(let e=0;e<a.length;e+=1)l=g(l,a[e]);return t=new y({props:l}),{c(){m(t.$$.fragment)},l(e){i(t.$$.fragment,e)},m(e,s){p(t,e,s),r=!0},p(e,s){const o=s&1?T(a,[b(e[0]),a[1],a[2]]):{};t.$set(o)},i(e){r||(u(t.$$.fragment,e),r=!0)},o(e){f(t.$$.fragment,e),r=!1},d(e){c(t,e)}}}function A(n){let t,r,a,l;return t=new h({props:{$$slots:{default:[C,({args:e})=>({0:e}),({args:e})=>e?1:0]},$$scope:{ctx:n}}}),a=new x({props:{name:"Default"}}),{c(){m(t.$$.fragment),r=D(),m(a.$$.fragment)},l(e){i(t.$$.fragment,e),r=v(e),i(a.$$.fragment,e)},m(e,s){p(t,e,s),w(e,r,s),p(a,e,s),l=!0},p(e,[s]){const o={};s&3&&(o.$$scope={dirty:s,ctx:e}),t.$set(o)},i(e){l||(u(t.$$.fragment,e),u(a.$$.fragment,e),l=!0)},o(e){f(t.$$.fragment,e),f(a.$$.fragment,e),l=!1},d(e){e&&I(r),c(t,e),c(a,e)}}}const U={title:"Iroco-UI/Components/DataTable",component:y,argTypes:{}};class j extends k{constructor(t){super(),_(this,t,null,A,d,{})}}const $=S(j,{meta:{title:"Iroco-UI/Components/DataTable"},stories:{"tpl:default":{name:"default",template:!0,source:`<DataTable {...args}
					 columns={[
		{key:"key1",title:"Title 1"},
		{key:"key2",title:"Title 2"},
		{key:"key3",title:"Title 3"},
	]}
					 rows={[
		{key1:"value 1",key2:"value 2",key3:"value 3"},
		{key1:"value a",key2:"value b",key3:"value c"},
		{key1:1.56,key2:2.76,key3:3.98},
	]}
>
</DataTable>`,hasArgs:!0},Default:{name:"Default",template:!1,source:"",hasArgs:!1}},allocatedIds:["default","Story","Template"]},U),L=$.meta,N=["Default"],P=$.stories.Default;export{P as Default,N as __namedExportsOrder,L as default};
