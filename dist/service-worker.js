if(!self.define){let e,i={};const n=(n,t)=>(n=new URL(n+".js",t).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const l=e=>n(e,o),c={module:{uri:o},exports:r,require:l};i[o]=Promise.all(t.map((e=>c[e]||l(e)))).then((e=>(s(...e),r)))}}define(["./workbox-1c3383c2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index.html",revision:"d16c0a7dfe8361af2dce96b9cefc671e"},{url:"static/css/main.2f6b9e2b.css",revision:null},{url:"static/js/main.727663a9.js",revision:null},{url:"static/js/runtime~main.6f07e35b.js",revision:null},{url:"static/media/7.74567625f60d8cded62c.png",revision:null},{url:"static/media/iconfont.4fe5d0595ff5191d5e36.woff2",revision:null},{url:"static/media/iconfont.ab7d316fa21a05718390.woff",revision:null},{url:"static/media/iconfont.cd7fda7dd004a910007e.ttf",revision:null}],{})}));