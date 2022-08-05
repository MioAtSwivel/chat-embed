var ChatWidget;(()=>{"use strict";var e={d:(t,a)=>{for(var i in a)e.o(a,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:a[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createWidget:()=>r,stopNotification:()=>c});const a="BFimg4nhhiga2UkChbE_luhDsQoQL1_82igq9D9--RMSSVVOsCC1kd4Rc6V2vDcq7Bh0feKWxcvpZpY8eBr4Vhg";let i;async function o(e,t){const o=await async function(e,t){if("serviceWorker"in navigator){const a=await navigator.serviceWorker.register("/swivel-sw.js");return navigator.serviceWorker.ready.then((a=>{a.active.postMessage({token:e,system:t})})),a}console.log("[chat-embed] No service worker available")}(e,t);console.log(o),o&&await async function(e,t){const o=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:s(a)});i=o;const n={"content-type":"application/json",Authorization:`Bearer ${t}`},r=await fetch("https://auth.swivelsoftware.asia/api/notification/subscribe",{method:"POST",body:JSON.stringify(o),headers:n});r.ok&&console.dir(r)}(o,e),console.log("[chat-embed] service worker registered")}function s(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),a=window.atob(t),i=new Uint8Array(a.length);for(let e=0;e<a.length;++e)i[e]=a.charCodeAt(e);return i}async function n({token:e,system:t,entityType:a,entityKey:i,entityReferenceKey:o,overrideCss:s,widgetSrc:n,full:r,button:c,right:d}){try{!function(e){const t={uat:"https://chat-uat.swivelsoftware.asia/v2/widgets/swivel-chat-widget.js",dev:"https://chat-uat.swivelsoftware.asia/dev-v2/widgets/swivel-chat-widget.js",prod:"https://chat.swivelsoftware.asia/v2/widgets/swivel-chat-widget.js",local:"./dist/swivel-chat-widget.min.js"},a=document.getElementsByTagName("head")[0];let i=document.createElement("script");if(i.type="text/javascript",!t[e])throw new Error("Invalid source version of chat widget: "+e);i.src=t[e],a.appendChild(i)}(n)}catch(e){return void console.error(e)}if(a||(a="customer"),!i||!o){const t=await fetch("https://auth.swivelsoftware.asia/api/person/default",{method:"GET",headers:{"selected-partygroup":"","x-system":"360uat","Content-Type":"application/json",Authorization:`Bearer ${e}`}}),a=await t.json();i=a.selectedPartyGroup.code,o=a.selectedPartyGroup.name}const l=document.getElementById("chat-container"),u=document.createElement("swivel-chat-widget");u.setAttribute("id","swivel-chat-widget"),u.setAttribute("name",JSON.stringify(["Main"])),u.setAttribute("token",e),u.setAttribute("system",["360uat","360dev"].includes(t)?"360uat":t),u.setAttribute("uat","true"),u.setAttribute("propdata",JSON.stringify({full:r,button:c,right:d,system:["360uat","360dev"].includes(t)?"360uat":t,entityType:a,entityKey:i,entityReferenceKey:o,hasPublicChatroom:!0,extraChatrooms:[],maxShowChatroom:6,leftOffset:0,rightOffset:0})),u.setAttribute("injectCss",l.id);const h=document.createElement("style");h.innerHTML=s,l.appendChild(u),u.shadowRoot&&(console.log(h),u.shadowRoot.appendChild(h)),document.body.addEventListener("swivel-widget-loaded",(()=>{u.shadowRoot&&u.shadowRoot.appendChild(h)}))}async function r({username:e,password:t,system:a,entityType:i,entityKey:s,entityReferenceKey:r,overrideCss:c,expireTime:d,widgetSrc:l,full:u,button:h,right:y}){const p=await async function(e,t,a,i){const o=await fetch("https://auth.swivelsoftware.asia/auth/local/login",{method:"POST",headers:{"selected-partygroup":i||"","x-system":"360uat","Content-Type":"application/json"},body:JSON.stringify({username:e,password:t,rememberMe:!1,expiry:a})});return(await o.json()).accessToken}(e,t,d,s);localStorage.setItem("360-accessToken",p),await n({token:p,system:a,entityType:i,entityKey:s,entityReferenceKey:r,overrideCss:c,widgetSrc:l,full:u,button:h,right:y}),await o(p,a)}async function c(){!async function(){const e={"content-type":"application/json",Authorization:`Bearer ${localStorage.getItem("360-accessToken")}`},t=await fetch("https://auth.swivelsoftware.asia/api/notification/unsubscribe",{method:"POST",body:JSON.stringify(i),headers:e});t.ok&&console.dir(t)}()}ChatWidget=t})();