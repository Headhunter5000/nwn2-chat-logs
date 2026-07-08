import{a as e}from"./rolldown-runtime-DYb3wWwV.js";import{o as t,s,t as a,u as r}from"./react-core-n8f4OU8y.js";import{A as o,D as n,E as i,F as l,I as c,L as d,P as m,R as u,T as p,b as g,l as f,w as h}from"./vendor-grommet-Di7jtcJm.js";import{_ as x,d as y,f as j,g as k,l as b,o as $,t as v,u as C}from"./index-CgKC8ugX.js";import{t as T}from"./navigation-DrSIweUB.js";import{n as z,t as D}from"./MessageText-DqDVLSkV.js";var S=e(r());m();var w=e=>e?.split("T")[0],M=e=>new Date(e).toISOString();u();var I=a(),F=e=>{e.preventDefault(),e.stopPropagation()},N=d(({className:e,day:t,isSelected:s=!1,isMarked:a=!1,onClick:r})=>(0,I.jsx)("div",{className:e,onClick:!s&&a?r:F,"data-testid":`calendar-day-${t}`,"data-is-selected":s,"data-is-marked":a,children:t}))(({theme:e,size:t="medium"})=>{const s=k(`calendar.${t}.daySize`)({theme:e});return c`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${s};
    height: ${s};
  `}),E=({dates:e,size:t,onClick:s})=>({date:a,day:r,...o})=>{const n=!!e?.find(e=>w(M(a))===e);return(0,I.jsx)(N,{...o,day:r,size:t,isMarked:n,onClick:s})},O=({char:e,currentDate:s,size:a="medium"})=>{const r=t(),{statsByChar:l}=(0,S.useContext)(v),[c,d]=(0,S.useState)(!1),m=(0,S.useRef)(null),{dates:u,firstDate:p,lastDate:f}=(0,S.useMemo)(()=>l[e]??{},[e,l]),x=(0,S.useCallback)(()=>d(!0),[]),y=(0,S.useCallback)(()=>d(!1),[]);return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(n,{ref:m,alignSelf:"start",children:(0,I.jsx)(h,{label:s,icon:(0,I.jsx)(o,{size:20}),onClick:x})}),c&&m.current&&(0,I.jsx)(i,{target:m.current,onClickOutside:y,onEsc:y,stretch:!1,children:(0,I.jsx)(g,{size:a,margin:a,animate:!1,daysOfWeek:!0,firstDayOfWeek:1,bounds:[p,f],date:M(s),onSelect:t=>r(T(e,w(Array.isArray(t)?t[0]:t))),children:E({dates:u,size:a,onClick:y})})})]})};u();var A=l`
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
`,L=[{opening:"((",closing:"))",tag:"span",className:"text-ooc"},{opening:"*",closing:"*",tag:"span",className:"text-emote"}];function W(e){const t=e.replace(C,"").replace(y,"").replace(j,"<br />"),s=[];let a="";for(let r=0;r<t.length;r++){let e=!1;for(const o of L)if(t.startsWith(o.closing,r)){const t=s.lastIndexOf(o);if(-1!==t){for(let e=s.length-1;e>=t;e--)a+=`</${s[e].tag}>`;s.splice(t),r+=o.closing.length-1,e=!0;break}}if(!e)for(const o of L)if(t.startsWith(o.opening,r)){s.push(o),a+=`<${o.tag} class="${o.className}">`,r+=o.opening.length-1,e=!0;break}e||(a+=t[r])}for(;s.length>0;){const e=s.pop();e&&(a+=`</${e.tag}>`)}return a}var P=({index:e})=>((0,S.useEffect)(()=>{if(e){let t,s=5;const a=()=>{s>0&&!((e,t=!1)=>{const s=document.querySelector(e);return!!s&&(s.scrollIntoView({block:"center",behavior:t?"smooth":"auto"}),!0)})(`#message-${e}`)&&(t=setTimeout(a,100),s-=1)};return a(),()=>clearTimeout(t)}},[e]),null),R={onClick:()=>((e=!1)=>{((e,t=!1)=>{const s=document.querySelector("#app-root");if(s)try{s.scroll({top:e,left:0,behavior:t?"smooth":"auto"})}catch(a){s.scrollTo(0,e)}})(0,e)})(!0)},q=[{property:"time",header:"Time",size:"xsmall",render:({time:e,index:t})=>(0,I.jsx)(p,{id:`message-${t}`,children:e})},{property:"user",header:"User",size:"medium",render:({user:e})=>(0,I.jsx)(z,{children:e})},{property:"char",header:"Character",size:"medium",render:({char:e})=>(0,I.jsx)(z,{children:e})},{property:"type",header:"Type",size:"small"},{property:"plainMessage",header:"Message",size:"60%",search:!0,render:({type:e,message:t})=>(0,I.jsx)(D,{type:e,message:t})}],B=({file:e,date:t,messages:s,messageIndex:a,dataTestId:r})=>{const o=(0,S.useMemo)(()=>(e=>e.map(({message:e,...t},s)=>({...t,index:s,message:W(e)})))(s),[s]),n=(0,S.useMemo)(()=>((e,t)=>{if("number"==typeof t)return{[b(e,t)]:{background:"black",extend:"color: red"}}})(e,a),[e,a]),[i,l]=(0,S.useState)(void 0);return(0,S.useEffect)(()=>{if("number"==typeof a&&a>=0){l(`${t}${a}-0`);const e=setTimeout(()=>l(`${t}${a}-1`),100),s=setTimeout(()=>l(`${t}${a}-2`),500);return()=>{clearTimeout(e),clearTimeout(s)}}l(void 0)},[t,a]),(0,I.jsxs)(I.Fragment,{children:[(0,S.createElement)(f,{"data-testid":r,primaryKey:"id",verticalAlign:{body:"top"},pad:{vertical:"medium",right:"medium"},show:a,rowProps:n,paginate:R,step:50,columns:q,data:o,key:a?i||a:void 0}),(0,I.jsx)(P,{index:a})]})},K=({char:e,date:t,index:s})=>{const a=$(e,t);return a&&"messages"in a?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(A,{}),(0,I.jsx)(B,{date:t,file:a.file,messages:a.messages,messageIndex:s?Number(s):void 0,dataTestId:`chat-log-${e}-${t}`})]}):null},U=()=>{const e=t(),{char:a,date:r,index:o}=s(),{statsByChar:n,isLoaded:i}=(0,S.useContext)(v),{lastDate:l,count:c}=(0,S.useMemo)(()=>((e,t)=>t in e?e[t]:{lastDate:null,count:0})(n,a),[a,n]);if((0,S.useEffect)(()=>{!r&&l&&e(T(a,l),{replace:!0})},[a,r,l,e]),!a||i&&!l)throw new Response("Not Found",{status:404});return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(x,{title:a,subtitle:c?`${c} logs`:"Loading...",backLink:"/"}),r&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(O,{char:a,currentDate:r}),(0,I.jsx)(K,{char:a,date:r,index:o})]})]})};export{U as default};