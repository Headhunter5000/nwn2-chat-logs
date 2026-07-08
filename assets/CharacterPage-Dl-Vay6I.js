import{a as e}from"./rolldown-runtime-DYb3wWwV.js";import{o as t,s,t as a,u as r}from"./react-core-n8f4OU8y.js";import{B as o,D as n,E as i,H as l,I as c,L as d,O as m,T as u,U as p,V as g,b as f,k as h,l as x,w as y}from"./vendor-grommet-lAUS5eR6.js";import{_ as j,d as k,f as b,g as $,l as v,o as C,t as z,u as T}from"./index-rCc88xx7.js";import{t as D}from"./navigation-DrSIweUB.js";import{n as S,t as w}from"./MessageText-DvKB5_2f.js";var M=e(r());h();var I=e=>e?.split("T")[0],N=e=>new Date(e).toISOString();p();var E=a(),F=e=>{e.preventDefault(),e.stopPropagation()},O=l(({className:e,day:t,isSelected:s=!1,isMarked:a=!1,onClick:r})=>(0,E.jsx)("div",{className:e,onClick:!s&&a?r:F,"data-testid":`calendar-day-${t}`,"data-is-selected":s,"data-is-marked":a,children:t}))(({theme:e,size:t="medium"})=>{const s=$(`calendar.${t}.daySize`)({theme:e});return g`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${s};
    height: ${s};
  `}),L=({dates:e,size:t,onClick:s})=>({date:a,day:r,...o})=>{const n=!!e?.find(e=>I(N(a))===e);return(0,E.jsx)(O,{...o,day:r,size:t,isMarked:n,onClick:s})},W=({char:e,currentDate:s,size:a="medium"})=>{const r=t(),{statsByChar:o}=(0,M.useContext)(z),[l,d]=(0,M.useState)(!1),m=(0,M.useRef)(null),{dates:u,firstDate:p,lastDate:g}=(0,M.useMemo)(()=>o[e]??{},[e,o]),h=(0,M.useCallback)(()=>d(!0),[]),x=(0,M.useCallback)(()=>d(!1),[]);return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(n,{ref:m,alignSelf:"start",children:(0,E.jsx)(y,{label:s,icon:(0,E.jsx)(c,{size:20}),onClick:h})}),l&&m.current&&(0,E.jsx)(i,{target:m.current,onClickOutside:x,onEsc:x,stretch:!1,children:(0,E.jsx)(f,{size:a,margin:a,animate:!1,daysOfWeek:!0,firstDayOfWeek:1,bounds:[p,g],date:N(s),onSelect:t=>r(D(e,I(Array.isArray(t)?t[0]:t))),children:L({dates:u,size:a,onClick:x})})})]})};p();var A=o`
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
`,B=[{opening:"((",closing:"))",tag:"span",className:"text-ooc"},{opening:"*",closing:"*",tag:"span",className:"text-emote"}];function q(e){const t=e.replace(T,"").replace(k,"").replace(b,"<br />"),s=[];let a="";for(let r=0;r<t.length;r++){let e=!1;for(const o of B)if(t.startsWith(o.closing,r)){const t=s.lastIndexOf(o);if(-1!==t){for(let e=s.length-1;e>=t;e--)a+=`</${s[e].tag}>`;s.splice(t),r+=o.closing.length-1,e=!0;break}}if(!e)for(const o of B)if(t.startsWith(o.opening,r)){s.push(o),a+=`<${o.tag} class="${o.className}">`,r+=o.opening.length-1,e=!0;break}e||(a+=t[r])}for(;s.length>0;){const e=s.pop();e&&(a+=`</${e.tag}>`)}return a}var P=({index:e})=>((0,M.useEffect)(()=>{if(e){let t,s=5;const a=()=>{s>0&&!((e,t=!1)=>{const s=document.querySelector(e);return!!s&&(s.scrollIntoView({block:"center",behavior:t?"smooth":"auto"}),!0)})(`#message-${e}`)&&(t=setTimeout(a,100),s-=1)};return a(),()=>clearTimeout(t)}},[e]),null),R={onClick:()=>((e=!1)=>{((e,t=!1)=>{const s=document.querySelector("#app-root");if(s)try{s.scroll({top:e,left:0,behavior:t?"smooth":"auto"})}catch(a){s.scrollTo(0,e)}})(0,e)})(!0)},U=[{property:"time",header:"Time",size:"xsmall",render:({time:e,index:t})=>(0,E.jsx)(u,{id:`message-${t}`,children:e})},{property:"user",header:"User",size:"medium",render:({user:e})=>(0,E.jsx)(S,{children:e})},{property:"char",header:"Character",size:"medium",render:({char:e})=>(0,E.jsx)(S,{children:e})},{property:"type",header:"Type",size:"small"},{property:"plainMessage",header:"Message",size:"60%",search:!0,render:({type:e,message:t})=>(0,E.jsx)(w,{type:e,message:t})}],V=({file:e,date:t,messages:s,messageIndex:a,dataTestId:r})=>{const o=(0,M.useMemo)(()=>(e=>e.map(({message:e,...t},s)=>({...t,index:s,message:q(e)})))(s),[s]),n=(0,M.useMemo)(()=>((e,t)=>{if("number"==typeof t)return{[v(e,t)]:{background:"black",extend:"color: red"}}})(e,a),[e,a]),[i,l]=(0,M.useState)(void 0);return(0,M.useEffect)(()=>{if("number"==typeof a&&a>=0){l(`${t}${a}-0`);const e=setTimeout(()=>l(`${t}${a}-1`),100),s=setTimeout(()=>l(`${t}${a}-2`),500);return()=>{clearTimeout(e),clearTimeout(s)}}l(void 0)},[t,a]),(0,E.jsxs)(E.Fragment,{children:[(0,M.createElement)(x,{"data-testid":r,primaryKey:"id",verticalAlign:{body:"top"},pad:{vertical:"medium",right:"medium"},show:a,rowProps:n,paginate:R,step:50,columns:U,data:o,key:a?i||a:void 0}),(0,E.jsx)(P,{index:a})]})},H=({char:e,date:t,index:s})=>{const a=C(e,t);return a&&"messages"in a?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(A,{}),(0,E.jsx)(V,{date:t,file:a.file,messages:a.messages,messageIndex:s?Number(s):void 0,dataTestId:`chat-log-${e}-${t}`})]}):null},K=()=>{const e=(0,M.useContext)(m),a=t(),{char:r,date:o,index:n}=s(),{statsByChar:i,isLoaded:l}=(0,M.useContext)(z),{lastDate:c,count:d}=(0,M.useMemo)(()=>((e,t)=>t in e?e[t]:{lastDate:null,count:0})(i,r),[r,i]);if((0,M.useEffect)(()=>{!o&&c&&a(D(r,c),{replace:!0})},[r,o,c,a]),!r||l&&!c)throw new Response("Not Found",{status:404});const u="small"===e?"small":"medium";return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(j,{title:r,subtitle:d?`${d} logs`:"Loading...",backLink:"/"}),o&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(W,{char:r,currentDate:o,size:u}),(0,E.jsx)(H,{char:r,date:o,index:n})]})]})};export{K as default};