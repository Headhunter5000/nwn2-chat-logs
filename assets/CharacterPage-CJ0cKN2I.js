import{a as e}from"./rolldown-runtime-DYb3wWwV.js";import{o as t,s,t as a,u as r}from"./react-core-n8f4OU8y.js";import{$ as o,A as n,F as i,K as c,M as l,N as m,P as d,Q as u,T as p,X as g,Z as h,j as f,l as x,q as y}from"./vendor-grommet-rPqUn3Cq.js";import{t as j}from"./vendor-react-i18next-vfdcZHfu.js";import{_ as k,a as b,c as $,d as v,h as C,l as z,u as T,v as M}from"./index-nY-o0V16.js";import{i as S,n as D,r as N,t as w}from"./dateUtils-CcGgG_Js.js";import{n as F,t as I}from"./MessageText-Ds6IZDKx.js";var E=e(r());i(),o();var A=a(),O=e=>{e.preventDefault(),e.stopPropagation()},W=u(({className:e,day:t,isSelected:s=!1,isMarked:a=!1,onClick:r})=>(0,A.jsx)("div",{className:e,onClick:!s&&a?r:O,"data-testid":`calendar-day-${t}`,"data-is-selected":s,"data-is-marked":a,children:t}))(({theme:e,size:t="medium"})=>{const s=C(`calendar.${t}.daySize`)({theme:e});return h`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${s};
    height: ${s};
  `}),q=({dates:e,size:t,onClick:s})=>({date:a,day:r,...o})=>{const n=!!e?.find(e=>D(N(a))===e);return(0,A.jsx)(W,{...o,day:r,size:t,isMarked:n,onClick:s})},P=({char:e,currentDate:s,size:a="medium"})=>{const r=t(),{statsByChar:o}=(0,E.useContext)(k),[i,d]=(0,E.useState)(!1),[u,g]=(0,E.useState)(null),{dates:h,firstDate:f,lastDate:x}=(0,E.useMemo)(()=>o[e]??{},[e,o]),y=(0,E.useCallback)(()=>d(!0),[]),j=(0,E.useCallback)(()=>d(!1),[]);return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(m,{ref:g,alignSelf:"start",children:(0,A.jsx)(n,{label:w(s),icon:(0,A.jsx)(c,{size:20}),onClick:y})}),i&&u&&(0,A.jsx)(l,{target:u,onClickOutside:j,onEsc:j,stretch:!1,children:(0,A.jsx)(p,{size:a,margin:a,animate:!1,daysOfWeek:!0,firstDayOfWeek:1,bounds:[f,x],date:N(s),onSelect:t=>r(S(e,D(Array.isArray(t)?t[0]:t))),children:q({dates:h,size:a,onClick:j})})})]})};o();var B=g`
  .message-type-dialog {
    color: #777;
  }

  .message-type-servertell {
    color: grey;
  }

  .message-type-tell {
    color: blue;
  }

  .text-speech {
    color: inherit;
  }

  .text-emote {
    color: green;
    &:not(:empty):before {
      content: '*';
    }
    &:not(:empty):after {
      content: '*';
    }
  }

  .text-ooc {
    color: purple;
    &:not(:empty):before {
      content: '((';
    }
    &:not(:empty):after {
      content: '))';
    }
  }
`,K=[{opening:"((",closing:"))",tag:"span",className:"text-ooc"},{opening:"*",closing:"*",tag:"span",className:"text-emote"}];function L(e){const t=e.replace(z,"").replace(T,"").replace(v,"<br />"),s=[];let a="";for(let r=0;r<t.length;r++){let e=!1;for(const o of K)if(t.startsWith(o.closing,r)){const t=s.lastIndexOf(o);if(-1!==t){for(let e=s.length-1;e>=t;e--)a+=`</${s[e].tag}>`;s.splice(t),r+=o.closing.length-1,e=!0;break}}if(!e)for(const o of K)if(t.startsWith(o.opening,r)){s.push(o),a+=`<${o.tag} class="${o.className}">`,r+=o.opening.length-1,e=!0;break}e||(a+=t[r])}for(;s.length>0;){const e=s.pop();e&&(a+=`</${e.tag}>`)}return a}var _=({index:e})=>((0,E.useEffect)(()=>{if(e){let t,s=5;const a=()=>{s>0&&!((e,t=!1)=>{const s=document.querySelector(e);return!!s&&(s.scrollIntoView({block:"center",behavior:t?"smooth":"auto"}),!0)})(`#message-${e}`)&&(t=setTimeout(a,100),s-=1)};return a(),()=>clearTimeout(t)}},[e]),null),Q={onClick:()=>((e=!1)=>{((e,t=!1)=>{const s=document.querySelector("#app-root");if(s)try{s.scroll({top:e,left:0,behavior:t?"smooth":"auto"})}catch(a){s.scrollTo(0,e)}})(0,e)})(!0)},R=({file:e,date:t,messages:s,messageIndex:a,dataTestId:r})=>{const{t:o}=j(),n=(0,E.useMemo)(()=>(e=>e.map(({message:e,...t},s)=>({...t,index:s,message:L(e)})))(s),[s]),i=(0,E.useMemo)(()=>((e,t)=>{if("number"==typeof t)return{[$(e,t)]:{background:"black",extend:"color: red"}}})(e,a),[e,a]),[c,l]=(0,E.useState)(void 0),m=(0,E.useMemo)(()=>(e=>[{property:"time",header:e("common.time"),size:"xsmall",render:({time:e,index:t})=>(0,A.jsx)(f,{id:`message-${t}`,children:e})},{property:"user",header:e("common.user"),size:"medium",render:({user:e})=>(0,A.jsx)(F,{children:e})},{property:"char",header:e("common.char"),size:"medium",render:({char:e})=>(0,A.jsx)(F,{children:e})},{property:"type",header:e("common.type"),size:"small"},{property:"plainMessage",header:e("common.message"),size:"60%",search:!0,render:({type:e,message:t})=>(0,A.jsx)(I,{type:e,message:t})}])(o),[o]);return(0,E.useEffect)(()=>{if("number"==typeof a&&a>=0){l(`${t}${a}-0`);const e=setTimeout(()=>l(`${t}${a}-1`),100),s=setTimeout(()=>l(`${t}${a}-2`),500);return()=>{clearTimeout(e),clearTimeout(s)}}l(void 0)},[t,a]),(0,A.jsxs)(A.Fragment,{children:[(0,E.createElement)(x,{"data-testid":r,primaryKey:"id",verticalAlign:{body:"top"},pad:{vertical:"medium",right:"medium"},show:a,rowProps:i,paginate:Q,step:50,columns:m,data:n,key:a?c||a:void 0}),(0,A.jsx)(_,{index:a})]})},U=({char:e,date:t,index:s})=>{const a=b(e,t);return a&&"messages"in a?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(B,{}),(0,A.jsx)(R,{date:t,file:a.file,messages:a.messages,messageIndex:s?Number(s):void 0,dataTestId:`chat-log-${e}-${t}`})]}):null},V=()=>{const{t:e}=j(),a=(0,E.useContext)(d),r=t(),{char:o,date:n,index:i}=s(),{statsByChar:c,isLoading:l}=(0,E.useContext)(k),{lastDate:m,count:u}=(0,E.useMemo)(()=>((e,t)=>t in e?e[t]:{lastDate:null,count:0})(c,o),[o,c]);if((0,E.useEffect)(()=>{!n&&m&&r(S(o,m),{replace:!0})},[o,n,m,r]),!o||!l&&!m)throw new Response("Not Found",{status:404});const p="small"===a?"small":"medium";return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(M,{title:o,subtitle:u?e("page.character.logs_count",{count:u}):e("common.loading"),backLink:"/"}),n&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(P,{char:o,currentDate:n,size:p}),(0,A.jsx)(U,{char:o,date:n,index:i})]})]})};export{V as default};