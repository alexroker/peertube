!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/client/standalone/videos/",n(n.s=201)}({1:function(e,t,n){"use strict";function i(e,t,n,i){return new(n||(n=Promise))((function(o,r){function s(e){try{c(i.next(e))}catch(e){r(e)}}function a(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((i=i.apply(e,t||[])).next())}))}n.d(t,"a",(function(){return i}))},16:function(e,t,n){e.exports=function(){"use strict";return function(){var e=Math.floor(1000001*Math.random()),t={};function n(e){return Array.isArray?Array.isArray(e):-1!=e.constructor.toString().indexOf("Array")}var i={},o=function(e){try{var n=JSON.parse(e.data);if("object"!=typeof n||null===n)throw"malformed"}catch(e){return}var o,r,s,a=e.source,c=e.origin;if("string"==typeof n.method){var d=n.method.split("::");2==d.length?(o=d[0],s=d[1]):s=n.method}if(void 0!==n.id&&(r=n.id),"string"==typeof s){var l=!1;if(t[c]&&t[c][o])for(var u=0;u<t[c][o].length;u++)if(t[c][o][u].win===a){t[c][o][u].handler(c,s,n),l=!0;break}if(!l&&t["*"]&&t["*"][o])for(u=0;u<t["*"][o].length;u++)if(t["*"][o][u].win===a){t["*"][o][u].handler(c,s,n);break}}else void 0!==r&&i[r]&&i[r](c,s,n)};return window.addEventListener?window.addEventListener("message",o,!1):window.attachEvent&&window.attachEvent("onmessage",o),{build:function(o){var r=function(e){if(o.debugOutput&&window.console&&window.console.log){try{"string"!=typeof e&&(e=JSON.stringify(e))}catch(e){}window.console.log("["+c+"] "+e)}};if(!window.postMessage)throw"jschannel cannot run this browser, no postMessage";if(!window.JSON||!window.JSON.stringify||!window.JSON.parse)throw"jschannel cannot run this browser, no JSON parsing/serialization";if("object"!=typeof o)throw"Channel build invoked without a proper object argument";if(!o.window||!o.window.postMessage)throw"Channel.build() called without a valid window argument";window===o.window&&r("target window is same as present window -- use at your own risk");var s,a=!1;if("string"==typeof o.origin&&("*"===o.origin?a=!0:null!==(s=o.origin.match(/^https?:\/\/(?:[-a-zA-Z0-9_\.])+(?::\d+)?/))&&(o.origin=s[0].toLowerCase(),a=!0)),!a)throw"Channel.build() called with an invalid origin";if(void 0!==o.scope){if("string"!=typeof o.scope)throw"scope, when specified, must be a string";if(o.scope.split("::").length>1)throw"scope may not contain double colons: '::'"}else o.scope="__default";var c=function(){for(var e="",t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",n=0;n<5;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}(),d={},l={},u={},h=!1,f=[],p=[],g=function(e,t,s){if("function"==typeof o.gotMessageObserver)try{o.gotMessageObserver(e,s)}catch(e){r("gotMessageObserver() raised an exception: "+e.toString())}if(s.id&&t){u[s.id]={};var a=function(e,t,n){var i=!1,o=!1;return{origin:t,invoke:function(t,i){if(!u[e])throw"attempting to invoke a callback of a nonexistent transaction: "+e;for(var o=!1,r=0;r<n.length;r++)if(t===n[r]){o=!0;break}if(!o)throw"request supports no such callback '"+t+"'";y({id:e,callback:t,params:i})},error:function(t,n){if(o=!0,!u[e])throw"error called for nonexistent message: "+e;delete u[e],y({id:e,error:t,message:n})},complete:function(t){if(o=!0,!u[e])throw"complete called for nonexistent message: "+e;delete u[e],y({id:e,result:t})},delayReturn:function(e){return"boolean"==typeof e&&(i=!0===e),i},completed:function(){return o}}}(s.id,e,s.callbacks?s.callbacks:[]);if(d[t])try{if(s.callbacks&&n(s.callbacks)&&s.callbacks.length>0)for(var c=0;c<s.callbacks.length;c++){for(var h=s.callbacks[c],f=s.params,p=h.split("/"),g=0;g<p.length-1;g++){var m=p[g];"object"!=typeof f[m]&&(f[m]={}),f=f[m]}f[p[p.length-1]]=function(){var e=h;return function(t){return a.invoke(e,t)}}()}var v=d[t](a,s.params);a.delayReturn()||a.completed()||a.complete(v)}catch(e){var b="runtime_error",w=null;if("string"==typeof e?w=e:"object"==typeof e&&(e instanceof Error?(b=e.constructor.name,w=e.message):e&&n(e)&&2==e.length?(b=e[0],w=e[1]):"string"==typeof e.error&&(b=e.error,e.message?"string"==typeof e.message?w=e.message:e=e.message:w="")),null===w)try{void 0===(w=JSON.stringify(e))&&(w=e.toString())}catch(t){w=e.toString()}a.error(b,w)}else a.error("method_not_found","No method '"+t+"' was (yet) bound by the provider")}else s.id&&s.callback?l[s.id]&&l[s.id].callbacks&&l[s.id].callbacks[s.callback]?l[s.id].callbacks[s.callback](s.params):r("ignoring invalid callback, id:"+s.id+" ("+s.callback+")"):s.id?l[s.id]?(s.error?l[s.id].error&&l[s.id].error(s.error,s.message):void 0!==s.result?l[s.id].success(s.result):l[s.id].success(),delete l[s.id],delete i[s.id]):r("ignoring invalid response: "+s.id):t&&d[t]&&d[t]({origin:e},s.params)};!function(e,n,i,o){function r(t){for(var n=0;n<t.length;n++)if(t[n].win===e)return!0;return!1}var s=!1;if("*"===n){for(var a in t)if(t.hasOwnProperty(a)&&"*"!==a&&"object"==typeof t[a][i]&&(s=r(t[a][i])))break}else t["*"]&&t["*"][i]&&(s=r(t["*"][i])),!s&&t[n]&&t[n][i]&&(s=r(t[n][i]));if(s)throw"A channel is already bound to the same window which overlaps with origin '"+n+"' and has scope '"+i+"'";"object"!=typeof t[n]&&(t[n]={}),"object"!=typeof t[n][i]&&(t[n][i]=[]),t[n][i].push({win:e,handler:o})}(o.window,o.origin,o.scope,g);var m=function(e){return[o.scope,e].join("::")},y=function(e,t){if(!e)throw"postMessage called with null message";if(t||h){if("function"==typeof o.postMessageObserver)try{o.postMessageObserver(o.origin,e)}catch(e){r("postMessageObserver() raised an exception: "+e.toString())}r("post message: "+JSON.stringify(e)+" with origin "+o.origin),o.window.postMessage(JSON.stringify(e),o.origin)}else r("queue message: "+JSON.stringify(e)),f.push(e)},v=function(e,t){var n;e=[].concat(e);for(var i=0;i<e.length;i++)t[n=e[i].toString()]=function(e){return function(t,n,i){n?b.call({method:e,params:t,success:n,error:i}):b.notify({method:e,params:t})}}(n)},b={remote:{},unbind:function(e,t){if(d[e]){if(!delete d[e])throw"can't delete method: "+e;return o.publish&&!t&&(h?b.notify({method:"__unbind",params:e}):p.push({action:"unbind",method:e})),!0}return!1},bind:function(e,t,n){if(!e||"string"!=typeof e)throw"'method' argument to bind must be string";if(!t||"function"!=typeof t)throw"callback missing from bind params";if(d[e])throw"method '"+e+"' is already bound!";return d[e]=t,o.publish&&!n&&(h?b.notify({method:"__bind",params:e}):p.push({action:"bind",method:e})),this},call:function(t){if(!t)throw"missing arguments to call function";if(!t.method||"string"!=typeof t.method)throw"'method' argument to call must be string";if(!t.success||"function"!=typeof t.success)throw"'success' callback missing from call";var n={},o=[],r=[],s=function(e,t){if(r.indexOf(t)>=0)throw"params cannot be a recursive data structure";if(t&&r.push(t),"object"==typeof t)for(var i in t)if(t.hasOwnProperty(i)){var a=e+(e.length?"/":"")+i;"function"==typeof t[i]?(n[a]=t[i],o.push(a),delete t[i]):"object"==typeof t[i]&&s(a,t[i])}};s("",t.params);var a,c,d,u={id:e,method:m(t.method),params:t.params};o.length&&(u.callbacks=o),t.timeout&&(a=e,c=t.timeout,d=m(t.method),window.setTimeout((function(){l[a]&&(l[a].error&&l[a].error("timeout_error","timeout ("+c+"ms) exceeded on method '"+d+"'"),delete l[a],delete i[a])}),c)),l[e]={callbacks:n,error:t.error,success:t.success},i[e]=g,e++,y(u)},notify:function(e){if(!e)throw"missing arguments to notify function";if(!e.method||"string"!=typeof e.method)throw"'method' argument to notify must be string";y({method:m(e.method),params:e.params})},destroy:function(){!function(e,n,i){for(var o=t[n][i],r=0;r<o.length;r++)o[r].win===e&&o.splice(r,1);0===t[n][i].length&&delete t[n][i]}(o.window,o.origin,o.scope),window.removeEventListener?window.removeEventListener("message",g,!1):window.detachEvent&&window.detachEvent("onmessage",g),h=!1,d={},u={},l={},o.origin=null,f=[],r("channel destroyed"),c=""}};return b.bind("__ready",(function(e,t){if(r("ready msg received"),h&&!o.reconnect)throw"received ready message while in ready state.";h=!0,c.length<6&&(c+="publish-request"===t.type?"-R":"-L"),r("ready msg accepted."),"publish-request"===t.type&&b.notify({method:"__ready",params:{type:"publish-reply",publish:p}});for(var n=0;n<t.publish.length;n++)"bind"===t.publish[n].action?v([t.publish[n].method],b.remote):delete b.remote[t.publish[n].method];for(o.reconnect||b.unbind("__ready",!0);f.length;)y(f.splice(0,1)[0]);p=[],"function"==typeof o.onReady&&o.onReady(b)}),!0),b.bind("__bind",(function(e,t){v([t],b.remote)}),!0),b.bind("__unbind",(function(e,t){b.remote[t]&&delete b.remote[t]}),!0),o.remote&&v(o.remote,b.remote),setTimeout((function(){c.length>0&&y({method:m("__ready"),params:{type:"publish-request",publish:p}},!0)}),0),b}}}()}()},201:function(e,t,n){"use strict";n.r(t);var i=n(1),o=(n(223),n(32));window.addEventListener("load",()=>Object(i.a)(void 0,void 0,void 0,(function*(){const e=window.location.href.split("/"),t=e[e.length-1],n=-1===t.indexOf("?")?t:t.split("?")[0],r=document.createElement("iframe");r.src=`/videos/embed/${n}?api=1`,document.querySelector("#host").appendChild(r),console.log("Document finished loading.");const s=new o.PeerTubePlayer(document.querySelector("iframe"));window.player=s,console.log("Awaiting player ready..."),yield s.ready,console.log("Player is ready."),["pause","play","playbackStatusUpdate","playbackStatusChange"].forEach(e=>{s.addEventListener(e,t=>console.log(`PLAYER: event '${e}' received`,t)),console.log(`PLAYER: now listening for event '${e}'`)});let a=[],c=yield s.getPlaybackRate();const d=()=>Object(i.a)(void 0,void 0,void 0,(function*(){const e=document.querySelector("#rate-list");e.innerHTML="",a.forEach(t=>{if(c===t){const n=document.createElement("strong");n.innerText=t+" (active)",n.style.display="block",e.appendChild(n)}else{const n=document.createElement("a");n.href="javascript:;",n.innerText=t.toString(),n.addEventListener("click",()=>{s.setPlaybackRate(t),c=t,d()}),n.style.display="block",e.appendChild(n)}})}));s.getPlaybackRates().then(e=>{a=e,d()});const l=()=>Object(i.a)(void 0,void 0,void 0,(function*(){const e=yield s.getCaptions(),t=document.querySelector("#caption-list");t.innerHTML="",e.forEach(e=>{if(console.log(e),"showing"===e.mode){const n=document.createElement("strong");n.innerText=e.label+" (active)",n.style.display="block",t.appendChild(n)}else{const n=document.createElement("a");n.href="javascript:;",n.innerText=e.label,n.addEventListener("click",()=>{s.setCaption(e.id),l()}),n.style.display="block",t.appendChild(n)}})}));l();const u=e=>{const t=document.querySelector("#resolution-list");t.innerHTML="",e.forEach(e=>{if(e.active){const n=document.createElement("strong");n.innerText=e.label+" (active)",n.style.display="block",t.appendChild(n)}else{const n=document.createElement("a");n.href="javascript:;",n.innerText=e.label,n.addEventListener("click",()=>{s.setResolution(e.id)}),n.style.display="block",t.appendChild(n)}})};s.getResolutions().then(e=>u(e)),s.addEventListener("resolutionUpdate",e=>u(e));const h=e=>{document.getElementById("volume").innerText=100*e+"%"};s.getVolume().then(e=>h(e)),s.addEventListener("volumeChange",e=>h(e))})))},223:function(e,t){},32:function(e,t,n){"use strict";n.r(t),n.d(t,"PeerTubePlayer",(function(){return a}));var i=n(1),o=n(16);class r{constructor(){this.eventRegistrations={}}bindToChannel(e){for(const t of Object.keys(this.eventRegistrations))e.bind(t,(e,n)=>this.fire(t,n))}registerTypes(e){for(const t of e)this.eventRegistrations[t]={registrations:[]}}fire(e,t){this.eventRegistrations[e].registrations.forEach(e=>e(t))}addListener(e,t){return this.eventRegistrations[e]?(this.eventRegistrations[e].registrations.push(t),!0):(console.warn(`PeerTube: addEventListener(): The event '${e}' is not supported`),!1)}removeListener(e,t){return!!this.eventRegistrations[e]&&(this.eventRegistrations[e].registrations=this.eventRegistrations[e].registrations.filter(e=>e===t),!0)}}const s=["pause","play","playbackStatusUpdate","playbackStatusChange","resolutionUpdate","volumeChange"];class a{constructor(e,t){this.embedElement=e,this.scope=t,this.eventRegistrar=new r,this.eventRegistrar.registerTypes(s),this.constructChannel(),this.prepareToBeReady()}destroy(){this.embedElement.remove()}addEventListener(e,t){return this.eventRegistrar.addListener(e,t)}removeEventListener(e,t){return this.eventRegistrar.removeListener(e,t)}get ready(){return this.readyPromise}play(){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("play")}))}pause(){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("pause")}))}setVolume(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("setVolume",e)}))}getVolume(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getVolume")}))}setCaption(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("setCaption",e)}))}getCaptions(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getCaptions")}))}seek(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("seek",e)}))}setResolution(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("setResolution",e)}))}getResolutions(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getResolutions")}))}getPlaybackRates(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getPlaybackRates")}))}getPlaybackRate(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getPlaybackRate")}))}setPlaybackRate(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("setPlaybackRate",e)}))}constructChannel(){this.channel=o.build({window:this.embedElement.contentWindow,origin:"*",scope:this.scope||"peertube"}),this.eventRegistrar.bindToChannel(this.channel)}prepareToBeReady(){let e,t;this.readyPromise=new Promise((n,i)=>{e=n,t=i}),this.channel.bind("ready",n=>n?e():t()),this.channel.call({method:"isReady",success:t=>t?e():null})}sendMessage(e,t){return new Promise((n,i)=>{this.channel.call({method:e,params:t,success:e=>n(e),error:e=>i(e)})})}}window.PeerTubePlayer=a}});