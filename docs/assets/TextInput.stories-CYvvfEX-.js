import{p as C,t as h,f as v,s as o,a as I,b as w,c as E,e as F,m as _,g as y,h as b,k as P,l as A,j as L}from"./props--2bXcsK5.js";import{T as x,c as H,s as B,d as D}from"./create-runtime-stories-rQfihoWR.js";import"./index-Cu4lwwaE.js";import"./index-CfOrKyLd.js";const S=(t,r)=>{let p=()=>F(r==null?void 0:r(),[]);var a=M(),s=v(a),l=_(s);x(l,E(p,{oninput:k}));var m=o(s,2),u=_(m);y(()=>A(u,`On input handled : ${L(g)??""}`)),I(t,a)},j={title:"Iroco-UI/Form/TextInput",component:x,argTypes:{type:{control:{type:"select"}},autocomplete:{control:{type:"select"}}}},{Story:e}=D();let g=P("");function k(t){b(g,""+t.data+" "+t.timeStamp)}var M=h('<form class="iroco-ui-form"><!></form> <p> </p>',1),R=h("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function O(t,r){C(r,!0),B(S);var p=R(),a=v(p);e(a,{name:"Default",parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
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
<p>On input handled : {oninputFoo}</p>`}}});var i=o(d,2);e(i,{name:"Placeholder",args:{placeholder:"A placeholder"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var c=o(i,2);e(c,{name:"Border",args:{border:!0},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var f=o(c,2);e(f,{name:"Html Error",args:{error:`<details>
  <summary>HTML error</summary>
  <p>Foo bar</p>
</details>`,htmlError:!0},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}});var T=o(f,2);e(T,{name:"Autocomplete",args:{type:"text",autocomplete:"name"},parameters:{__svelteCsf:{rawCode:`<form class="iroco-ui-form">
	<TextInput {...args} oninput={handleOnInput} />
</form>
<p>On input handled : {oninputFoo}</p>`}}}),I(t,p),w()}O.__docgen={version:3,name:"TextInput.stories.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[],refs:[]};const n=H(O,j),J=["Default","Text","Email","Password","Label","Error","Placeholder","Border","HtmlError","Autocomplete"],K=n.Default,N=n.Text,Q=n.Email,V=n.Password,W=n.Label,X=n.Error,Y=n.Placeholder,Z=n.Border,$=n.HtmlError,ee=n.Autocomplete;export{ee as Autocomplete,Z as Border,K as Default,Q as Email,X as Error,$ as HtmlError,W as Label,V as Password,Y as Placeholder,N as Text,J as __namedExportsOrder,j as default};
