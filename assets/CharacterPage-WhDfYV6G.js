import{a as e}from"./rolldown-runtime-DYb3wWwV.js";import{o as t,s,t as a,u as r}from"./react-core-n8f4OU8y.js";import{A as o,D as n,E as i,G as c,H as l,J as m,K as d,O as u,T as p,V as g,b as h,k as f,l as x,q as y}from"./vendor-grommet-Lmd-hLx5.js";import{t as j}from"./vendor-react-i18next-vfdcZHfu.js";import{_ as k,a as b,c as v,d as $,h as C,l as z,u as T,v as D}from"./index-85I-6IWr.js";import{i as M,n as S,r as w,t as N}from"./dateUtils-CcGgG_Js.js";import{n as E,t as F}from"./MessageText-v5PnBGlP.js";var I=e(r());o(),m();var O=a(),A=e=>{e.preventDefault(),e.stopPropagation()},W=y(({className:e,day:t,isSelected:s=!1,isMarked:a=!1,onClick:r})=>(0,O.jsx)("div",{className:e,onClick:!s&&a?r:A,"data-testid":`calendar-day-${t}`,"data-is-selected":s,"data-is-marked":a,children:t}))(({theme:e,size:t="medium"})=>{const s=C(`calendar.${t}.daySize`)({theme:e});return d`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${s};
    height: ${s};
  `}),q=({dates:e,size:t,onClick:s})=>({date:a,day:r,...o})=>{const n=!!e?.find(e=>S(w(a))===e);return(0,O.jsx)(W,{...o,day:r,size:t,isMarked:n,onClick:s})},B=({char:e,currentDate:s,size:a="medium"})=>{const r=t(),{statsByChar:o}=(0,I.useContext)(k),[i,c]=(0,I.useState)(!1),[l,m]=(0,I.useState)(null),{dates:d,firstDate:f,lastDate:x}=(0,I.useMemo)(()=>o[e]??{},[e,o]),y=(0,I.useCallback)(()=>c(!0),[]),j=(0,I.useCallback)(()=>c(!1),[]);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(u,{ref:m,alignSelf:"start",children:(0,O.jsx)(p,{label:N(s),icon:(0,O.jsx)(g,{size:20}),onClick:y})}),i&&l&&(0,O.jsx)(n,{target:l,onClickOutside:j,onEsc:j,stretch:!1,children:(0,O.jsx)(h,{size:a,margin:a,animate:!1,daysOfWeek:!0,firstDayOfWeek:1,bounds:[f,x],date:w(s),onSelect:t=>r(M(e,S(Array.isArray(t)?t[0]:t))),children:q({dates:d,size:a,onClick:j})})})]})};m();var K=c`
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
`,L=[{opening:"((",closing:"))",tag:"span",className:"text-ooc"},{opening:"*",closing:"*",tag:"span",className:"text-emote"}];function P(e){const t=e.replace(z,"").replace(T,"").replace($,"<br />"),s=[];let a="";for(let r=0;r<t.length;r++){let e=!1;for(const o of L)if(t.startsWith(o.closing,r)){const t=s.lastIndexOf(o);if(-1!==t){for(let e=s.length-1;e>=t;e--)a+=`</${s[e].tag}>`;s.splice(t),r+=o.closing.length-1,e=!0;break}}if(!e)for(const o of L)if(t.startsWith(o.opening,r)){s.push(o),a+=`<${o.tag} class="${o.className}">`,r+=o.opening.length-1,e=!0;break}e||(a+=t[r])}for(;s.length>0;){const e=s.pop();e&&(a+=`</${e.tag}>`)}return a}var V=({index:e})=>((0,I.useEffect)(()=>{if(e){let t,s=5;const a=()=>{s>0&&!((e,t=!1)=>{const s=document.querySelector(e);return!!s&&(s.scrollIntoView({block:"center",behavior:t?"smooth":"auto"}),!0)})(`#message-${e}`)&&(t=setTimeout(a,100),s-=1)};return a(),()=>clearTimeout(t)}},[e]),null),_={onClick:()=>((e=!1)=>{((e,t=!1)=>{const s=document.querySelector("#app-root");if(s)try{s.scroll({top:e,left:0,behavior:t?"smooth":"auto"})}catch(a){s.scrollTo(0,e)}})(0,e)})(!0)},G=({file:e,date:t,messages:s,messageIndex:a,dataTestId:r})=>{const{t:o}=j(),n=(0,I.useMemo)(()=>(e=>e.map(({message:e,...t},s)=>({...t,index:s,message:P(e)})))(s),[s]),c=(0,I.useMemo)(()=>((e,t)=>{if("number"==typeof t)return{[v(e,t)]:{background:"black",extend:"color: red"}}})(e,a),[e,a]),[l,m]=(0,I.useState)(void 0),d=(0,I.useMemo)(()=>(e=>[{property:"time",header:e("common.time"),size:"xsmall",render:({time:e,index:t})=>(0,O.jsx)(i,{id:`message-${t}`,children:e})},{property:"user",header:e("common.user"),size:"medium",render:({user:e})=>(0,O.jsx)(E,{children:e})},{property:"char",header:e("common.char"),size:"medium",render:({char:e})=>(0,O.jsx)(E,{children:e})},{property:"type",header:e("common.type"),size:"small"},{property:"plainMessage",header:e("common.message"),size:"60%",search:!0,render:({type:e,message:t})=>(0,O.jsx)(F,{type:e,message:t})}])(o),[o]);return(0,I.useEffect)(()=>{if("number"==typeof a&&a>=0){m(`${t}${a}-0`);const e=setTimeout(()=>m(`${t}${a}-1`),100),s=setTimeout(()=>m(`${t}${a}-2`),500);return()=>{clearTimeout(e),clearTimeout(s)}}m(void 0)},[t,a]),(0,O.jsxs)(O.Fragment,{children:[(0,I.createElement)(x,{"data-testid":r,primaryKey:"id",verticalAlign:{body:"top"},pad:{vertical:"medium",right:"medium"},show:a,rowProps:c,paginate:_,step:50,columns:d,data:n,key:a?l||a:void 0}),(0,O.jsx)(V,{index:a})]})},H=({char:e,date:t,index:s})=>{const a=b(e,t);return a&&"messages"in a?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(K,{}),(0,O.jsx)(G,{date:t,file:a.file,messages:a.messages,messageIndex:s?Number(s):void 0,dataTestId:`chat-log-${e}-${t}`})]}):null},J=()=>{const{t:e}=j(),a=(0,I.useContext)(f),r=t(),{char:o,date:n,index:i}=s(),{statsByChar:c,isLoading:l}=(0,I.useContext)(k),{lastDate:m,count:d}=(0,I.useMemo)(()=>((e,t)=>t in e?e[t]:{lastDate:null,count:0})(c,o),[o,c]);if((0,I.useEffect)(()=>{!n&&m&&r(M(o,m),{replace:!0})},[o,n,m,r]),!o||!l&&!m)throw new Response("Not Found",{status:404});const u="small"===a?"small":"medium";return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(D,{title:o,subtitle:d?e("page.character.logs_count",{count:d}):e("common.loading"),backLink:"/"}),n&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(B,{char:o,currentDate:n,size:u}),(0,O.jsx)(H,{char:o,date:n,index:i})]})]})};export{J as default};