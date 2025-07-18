import{p as E,t as v,f as I,s as o,a as g,b as w,c as F,e as y,m as h,g as b,h as P,k as A,l as H,j as L}from"./props--2bXcsK5.js";import{T as x,c as B,s as D,d as k}from"./create-runtime-stories-OThsmWh7.js";import"./index-Cu4lwwaE.js";import"./index-CfOrKyLd.js";const S=(n,t)=>{let p=()=>y(t==null?void 0:t(),[]);var a=R(),s=I(a),l=h(s);x(l,F(p,{oninput:M}));var m=o(s,2),u=h(m);b(()=>H(u,`On input handled : ${L(O)??""}`)),g(n,a)},j={title:"Iroco-UI/Form/TextInput",component:x,argTypes:{type:{control:{type:"select"}},autocomplete:{control:{type:"select"}}}},{Story:e}=k();let O=A("");function M(n){P(O,""+n.data+" "+n.timeStamp)}var R=v('<form class="iroco-ui-form"><!></form> <p> </p>',1),U=v("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function T(n,t){E(t,!0),D(S);var p=U(),a=I(p);e(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var s=o(a,2);e(s,{name:"Text",args:{type:"text"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var l=o(s,2);e(l,{name:"Email",args:{type:"email"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var m=o(l,2);e(m,{name:"Password",args:{type:"password"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var u=o(m,2);e(u,{name:"Label",args:{label:"Label"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var d=o(u,2);e(d,{name:"Error",args:{error:"An error message"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var i=o(d,2);e(i,{name:"Errors",args:{errors:[{key:"foo",isHtml:!1}]},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var c=o(i,2);e(c,{name:"Placeholder",args:{placeholder:"A placeholder"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var f=o(c,2);e(f,{name:"Border",args:{border:!0},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var _=o(f,2);e(_,{name:"Html Error",args:{error:`<details>
  <summary>HTML error</summary>
  <p>Foo bar</p>
</details>`,htmlError:!0},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var C=o(_,2);e(C,{name:"Autocomplete",args:{type:"text",autocomplete:"name"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}}),g(n,p),w()}T.__docgen={version:3,name:"TextInput.stories.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[],refs:[]};const r=B(T,j),K=["Default","Text","Email","Password","Label","Error","Errors","Placeholder","Border","HtmlError","Autocomplete"],N=r.Default,Q=r.Text,V=r.Email,W=r.Password,X=r.Label,Y=r.Error,Z=r.Errors,$=r.Placeholder,ee=r.Border,oe=r.HtmlError,re=r.Autocomplete;export{re as Autocomplete,ee as Border,N as Default,V as Email,Y as Error,Z as Errors,oe as HtmlError,X as Label,W as Password,$ as Placeholder,Q as Text,K as __namedExportsOrder,j as default};
