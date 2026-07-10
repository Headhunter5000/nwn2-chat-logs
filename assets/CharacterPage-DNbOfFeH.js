import{a as e}from"./rolldown-runtime-DYb3wWwV.js";import{o as t,s,t as a,u as r}from"./react-core-n8f4OU8y.js";import{B as o,D as n,E as i,H as c,I as l,L as m,O as d,T as u,U as p,V as g,b as h,k as f,l as x,w as y}from"./vendor-grommet-lAUS5eR6.js";import{t as j}from"./vendor-react-i18next-vfdcZHfu.js";import{_ as k,a as b,c as v,d as $,g as C,l as z,u as T,y as S}from"./index-4P5EP591.js";import{t as D}from"./navigation-DrSIweUB.js";import{n as w,t as M}from"./MessageText-bSmDBG-b.js";var I=e(r());f();var N=e=>e?.split("T")[0],E=e=>new Date(e).toISOString();p();var F=a(),O=e=>{e.preventDefault(),e.stopPropagation()},W=c(({className:e,day:t,isSelected:s=!1,isMarked:a=!1,onClick:r})=>(0,F.jsx)("div",{className:e,onClick:!s&&a?r:O,"data-testid":`calendar-day-${t}`,"data-is-selected":s,"data-is-marked":a,children:t}))(({theme:e,size:t="medium"})=>{const s=S(`calendar.${t}.daySize`)({theme:e});return g`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${s};
    height: ${s};
  `}),A=({dates:e,size:t,onClick:s})=>({date:a,day:r,...o})=>{const n=!!e?.find(e=>N(E(a))===e);return(0,F.jsx)(W,{...o,day:r,size:t,isMarked:n,onClick:s})},B=({char:e,currentDate:s,size:a="medium"})=>{const r=t(),{statsByChar:o}=(0,I.useContext)(C),[c,m]=(0,I.useState)(!1),[d,u]=(0,I.useState)(null),{dates:p,firstDate:g,lastDate:f}=(0,I.useMemo)(()=>o[e]??{},[e,o]),x=(0,I.useCallback)(()=>m(!0),[]),j=(0,I.useCallback)(()=>m(!1),[]);return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(n,{ref:u,alignSelf:"start",children:(0,F.jsx)(y,{label:s,icon:(0,F.jsx)(l,{size:20}),onClick:x})}),c&&d&&(0,F.jsx)(i,{target:d,onClickOutside:j,onEsc:j,stretch:!1,children:(0,F.jsx)(h,{size:a,margin:a,animate:!1,daysOfWeek:!0,firstDayOfWeek:1,bounds:[g,f],date:E(s),onSelect:t=>r(D(e,N(Array.isArray(t)?t[0]:t))),children:A({dates:p,size:a,onClick:j})})})]})};p();var L=o`
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
`,q=[{opening:"((",closing:"))",tag:"span",className:"text-ooc"},{opening:"*",closing:"*",tag:"span",className:"text-emote"}];function P(e){const t=e.replace(z,"").replace(T,"").replace($,"<br />"),s=[];let a="";for(let r=0;r<t.length;r++){let e=!1;for(const o of q)if(t.startsWith(o.closing,r)){const t=s.lastIndexOf(o);if(-1!==t){for(let e=s.length-1;e>=t;e--)a+=`</${s[e].tag}>`;s.splice(t),r+=o.closing.length-1,e=!0;break}}if(!e)for(const o of q)if(t.startsWith(o.opening,r)){s.push(o),a+=`<${o.tag} class="${o.className}">`,r+=o.opening.length-1,e=!0;break}e||(a+=t[r])}for(;s.length>0;){const e=s.pop();e&&(a+=`</${e.tag}>`)}return a}var V=({index:e})=>((0,I.useEffect)(()=>{if(e){let t,s=5;const a=()=>{s>0&&!((e,t=!1)=>{const s=document.querySelector(e);return!!s&&(s.scrollIntoView({block:"center",behavior:t?"smooth":"auto"}),!0)})(`#message-${e}`)&&(t=setTimeout(a,100),s-=1)};return a(),()=>clearTimeout(t)}},[e]),null),_={onClick:()=>((e=!1)=>{((e,t=!1)=>{const s=document.querySelector("#app-root");if(s)try{s.scroll({top:e,left:0,behavior:t?"smooth":"auto"})}catch(a){s.scrollTo(0,e)}})(0,e)})(!0)},H=({file:e,date:t,messages:s,messageIndex:a,dataTestId:r})=>{const{t:o}=j(),n=(0,I.useMemo)(()=>(e=>e.map(({message:e,...t},s)=>({...t,index:s,message:P(e)})))(s),[s]),i=(0,I.useMemo)(()=>((e,t)=>{if("number"==typeof t)return{[v(e,t)]:{background:"black",extend:"color: red"}}})(e,a),[e,a]),[c,l]=(0,I.useState)(void 0),m=(0,I.useMemo)(()=>(e=>[{property:"time",header:e("common.time"),size:"xsmall",render:({time:e,index:t})=>(0,F.jsx)(u,{id:`message-${t}`,children:e})},{property:"user",header:e("common.user"),size:"medium",render:({user:e})=>(0,F.jsx)(w,{children:e})},{property:"char",header:e("common.char"),size:"medium",render:({char:e})=>(0,F.jsx)(w,{children:e})},{property:"type",header:e("common.type"),size:"small"},{property:"plainMessage",header:e("common.message"),size:"60%",search:!0,render:({type:e,message:t})=>(0,F.jsx)(M,{type:e,message:t})}])(o),[o]);return(0,I.useEffect)(()=>{if("number"==typeof a&&a>=0){l(`${t}${a}-0`);const e=setTimeout(()=>l(`${t}${a}-1`),100),s=setTimeout(()=>l(`${t}${a}-2`),500);return()=>{clearTimeout(e),clearTimeout(s)}}l(void 0)},[t,a]),(0,F.jsxs)(F.Fragment,{children:[(0,I.createElement)(x,{"data-testid":r,primaryKey:"id",verticalAlign:{body:"top"},pad:{vertical:"medium",right:"medium"},show:a,rowProps:i,paginate:_,step:50,columns:m,data:n,key:a?c||a:void 0}),(0,F.jsx)(V,{index:a})]})},K=({char:e,date:t,index:s})=>{const a=b(e,t);return a&&"messages"in a?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(L,{}),(0,F.jsx)(H,{date:t,file:a.file,messages:a.messages,messageIndex:s?Number(s):void 0,dataTestId:`chat-log-${e}-${t}`})]}):null},R=()=>{const{t:e}=j(),a=(0,I.useContext)(d),r=t(),{char:o,date:n,index:i}=s(),{statsByChar:c,isLoading:l}=(0,I.useContext)(C),{lastDate:m,count:u}=(0,I.useMemo)(()=>((e,t)=>t in e?e[t]:{lastDate:null,count:0})(c,o),[o,c]);if((0,I.useEffect)(()=>{!n&&m&&r(D(o,m),{replace:!0})},[o,n,m,r]),!o||!l&&!m)throw new Response("Not Found",{status:404});const p="small"===a?"small":"medium";return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(k,{title:o,subtitle:u?e("page.character.logs_count",{count:u}):e("common.loading"),backLink:"/"}),n&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(B,{char:o,currentDate:n,size:p}),(0,F.jsx)(K,{char:o,date:n,index:i})]})]})};export{R as default};