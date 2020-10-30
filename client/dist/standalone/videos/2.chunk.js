(window.webpackJsonp=window.webpackJsonp||[]).push([[2,9],{126:function(e,t){},129:function(e,t){},130:function(e,t){},132:function(e,t){},146:function(e,t){},151:function(e,t){},157:function(e,t){},158:function(e,t){},161:function(e,t){},164:function(e,t){},187:function(e,t){},204:function(e,t,i){"use strict";i.r(t),i.d(t,"WebTorrentPlugin",(function(){return g}));var r=i(0),s=i.n(r),n=i(78),o=i(11);const a=i(39),l=i(71),h=[".m4a",".m4v",".mp4"];function u(e,t,i,r){return function(e){if(null==e)throw new Error("file cannot be null or undefined");if("string"!=typeof e.name)throw new Error("missing or invalid file.name property");if("function"!=typeof e.createReadStream)throw new Error("missing or invalid file.createReadStream property")}(e),function(e,t,i,r){const s=Object(o.extname)(e.name).toLowerCase();let n,u,d=0;try{h.indexOf(s)>=0?(c(),n.addEventListener("error",(function e(t){return n.removeEventListener("error",e),r(t)})),n.addEventListener("loadstart",p),u=new l(e,n)):u=function t(i=!1){const s=function(e,t=!1){const i=Object(o.extname)(e).toLowerCase();return".mp4"===i?'video/mp4; codecs="avc1.640029, mp4a.40.5"':".webm"===i?!0===t?'video/webm; codecs="vp9, opus"':'video/webm; codecs="vp8, vorbis"':void 0}(e.name,i);c(),n.addEventListener("error",(function e(i){return n.removeEventListener("error",e),-1!==s.indexOf("vp8")?function(e=!1){!0===e?console.log("Falling back to media source with VP9 enabled."):console.log("Falling back to media source.."),t(e)}(!0):r(i)})),n.addEventListener("loadstart",p);const l=new a(n),h=l.createWriteStream(s);return e.createReadStream().pipe(h),d&&(n.currentTime=d),l}()}catch(e){return r(e)}function c(){void 0===n&&(n=t,n.addEventListener("progress",(function(){d=t.currentTime})))}function p(){n.removeEventListener("loadstart",p),i.autoplay&&n.play(),r(null,u)}}(e,t,i,r)}var d=i(3),c=i(79),p=i(5);const y=i(188),f=s.a.getPlugin("plugin");class g extends f{constructor(e,t){super(e),this.autoplay=!1,this.startTime=0,this.CONSTANTS={INFO_SCHEDULER:1e3,AUTO_QUALITY_SCHEDULER:3e3,AUTO_QUALITY_THRESHOLD_PERCENT:30,AUTO_QUALITY_OBSERVATION_TIME:1e4,AUTO_QUALITY_HIGHER_RESOLUTION_DELAY:5e3,BANDWIDTH_AVERAGE_NUMBER_OF_VALUES:5},this.webtorrent=new n({tracker:{rtcConfig:Object(d.e)()},dht:!1}),this.destroyingFakeRenderer=!1,this.autoResolution=!0,this.autoResolutionPossible=!0,this.isAutoResolutionObservation=!1,this.playerRefusedP2P=!1,this.downloadSpeeds=[],this.startTime=Object(d.i)(t.startTime),this.autoplay=t.autoplay&&!1===Object(d.f)(),this.playerRefusedP2P=!Object(p.d)(),this.videoFiles=t.videoFiles,this.videoDuration=t.videoDuration,this.savePlayerSrcFunction=this.player.src,this.playerElement=t.playerElement,this.player.ready(()=>{const e=this.player.options_,i=Object(p.f)();void 0!==i&&this.player.volume(i);const r=void 0!==e.muted?e.muted:Object(p.c)();void 0!==r&&this.player.muted(r),this.player.duration(t.videoDuration),this.initializePlayer(),this.runTorrentInfoScheduler(),this.player.one("play",()=>{this.runAutoQualitySchedulerTimer=setTimeout(()=>this.runAutoQualityScheduler(),this.CONSTANTS.AUTO_QUALITY_SCHEDULER)})})}dispose(){clearTimeout(this.addTorrentDelay),clearTimeout(this.qualityObservationTimer),clearTimeout(this.runAutoQualitySchedulerTimer),clearInterval(this.torrentInfoInterval),clearInterval(this.autoQualityInterval),this.flushVideoFile(this.currentVideoFile,!1),this.destroyFakeRenderer()}getCurrentResolutionId(){return this.currentVideoFile?this.currentVideoFile.resolution.id:-1}updateVideoFile(e,t={},i=(()=>{})){if(void 0===e){const t=Object(p.a)();e=t?this.getAppropriateFile(t):this.pickAverageVideoFile()}if(void 0!==this.currentVideoFile&&this.currentVideoFile.magnetUri===e.magnetUri)return;this.disableErrorDisplay(),this.player.src=()=>!0;const r=this.player.playbackRate(),s=this.currentVideoFile;if(this.currentVideoFile=e,Object(d.f)()||this.playerRefusedP2P)return this.fallbackToHttp(t,()=>(this.player.playbackRate(r),i()));this.addTorrent(this.currentVideoFile.magnetUri,s,t,()=>(this.player.playbackRate(r),i())),this.changeQuality(),this.trigger("resolutionChange",{auto:this.autoResolution,resolutionId:this.currentVideoFile.resolution.id})}updateResolution(e,t=0){const i=this.player.currentTime();this.player.paused()||this.player.bigPlayButton.hide(),0===e?(this.player.addClass("vjs-playing-audio-only-content"),this.player.posterImage.show()):(this.player.removeClass("vjs-playing-audio-only-content"),this.player.posterImage.hide());const r=this.videoFiles.find(t=>t.resolution.id===e);this.updateVideoFile(r,{forcePlay:!1,delay:t,seek:i+t/1e3})}flushVideoFile(e,t=!0){void 0!==e&&this.webtorrent.get(e.magnetUri)&&(!0===t&&this.renderer&&this.renderer.destroy&&this.renderer.destroy(),this.webtorrent.remove(e.magnetUri),console.log("Removed "+e.magnetUri))}enableAutoResolution(){this.autoResolution=!0,this.trigger("resolutionChange",{auto:this.autoResolution,resolutionId:this.getCurrentResolutionId()})}disableAutoResolution(e=!1){!0===e&&(this.autoResolutionPossible=!1),this.autoResolution=!1,this.trigger("autoResolutionChange",{possible:this.autoResolutionPossible}),this.trigger("resolutionChange",{auto:this.autoResolution,resolutionId:this.getCurrentResolutionId()})}isAutoResolutionPossible(){return this.autoResolutionPossible}getTorrent(){return this.torrent}getCurrentVideoFile(){return this.currentVideoFile}addTorrent(e,t,i,r){console.log("Adding "+e+".");const s=this.torrent;this.torrent=this.webtorrent.add(e,{store:function(e,t){return new y(new c.a(e,t),{max:100})}},n=>{console.log("Added "+e+"."),s&&(this.stopTorrent(s),i.delay&&this.renderFileInFakeElement(n.files[0],i.delay)),this.addTorrentDelay=setTimeout(()=>{this.destroyFakeRenderer();const e=this.player.paused();this.flushVideoFile(t),i.seek&&this.player.currentTime(i.seek),u(n.files[0],this.playerElement,{autoplay:!1,controls:!0},(t,s)=>(this.renderer=s,t?this.fallbackToHttp(i,r):this.tryToPlay(t=>t?r(t):(i.seek&&this.seek(i.seek),!1===i.forcePlay&&!0===e&&this.player.pause(),r()))))},i.delay||0)}),this.torrent.on("error",e=>console.error(e)),this.torrent.on("warning",e=>{if(-1===e.message.indexOf("Unsupported tracker protocol"))if(-1===e.message.indexOf("Ice connection failed")){if(-1!==e.message.indexOf("incorrect info hash"))return console.error("Incorrect info hash detected, falling back to torrent file."),this.addTorrent(this.torrent.xs,t,{forcePlay:!0,seek:i.seek},r);-1!==e.message.indexOf("from xs param")&&this.handleError(e),console.warn(e)}else console.log(e)})}tryToPlay(e){e||(e=function(){}),Object(d.h)()&&!1===this.player.muted()&&this.player.muted(!0);const t=this.player.play();return void 0!==t?t.then(()=>e()).catch(t=>{if(-1===t.message.indexOf("The play() request was interrupted by a call to pause()"))return console.error(t),this.player.pause(),this.player.posterImage.show(),this.player.removeClass("vjs-has-autoplay"),this.player.removeClass("vjs-has-big-play-button-clicked"),this.player.removeClass("vjs-playing-audio-only-content"),e()}):e()}seek(e){this.player.currentTime(e),this.player.handleTechSeeked_()}getAppropriateFile(e){if(void 0===this.videoFiles)return;const t=this.videoFiles.filter(e=>0!==e.resolution.id);if(0===t.length)return;if(1===t.length)return t[0];if(this.torrent&&1===this.torrent.progress&&this.player.ended())return this.currentVideoFile;e||(e=this.getAndSaveActualDownloadSpeed()),e=0;const i=this.playerElement.offsetHeight;let r=t[0].resolution.id;for(let e=t.length-1;e>=0;e--){const s=t[e].resolution.id;if(0!==s&&s>=i){r=s;break}}const s=t.filter(e=>e.resolution.id<=r).filter(t=>{const i=t.size/this.videoDuration;let r=i;return(!this.currentVideoFile||t.resolution.id>this.currentVideoFile.resolution.id)&&(r+=i*this.CONSTANTS.AUTO_QUALITY_THRESHOLD_PERCENT/100),e>r});return 0===s.length?Object(d.l)(t):Object(d.k)(s)}getAndSaveActualDownloadSpeed(){const e=Math.max(this.downloadSpeeds.length-this.CONSTANTS.BANDWIDTH_AVERAGE_NUMBER_OF_VALUES,0),t=this.downloadSpeeds.slice(e,this.downloadSpeeds.length);if(0===t.length)return-1;const i=t.reduce((e,t)=>e+t),r=Math.round(i/t.length);return Object(p.g)(r),r}initializePlayer(){if(this.buildQualities(),this.autoplay)return this.player.posterImage.hide(),this.updateVideoFile(void 0,{forcePlay:!0,seek:this.startTime});const e=this.player.play.bind(this.player);this.player.play=()=>{this.player.addClass("vjs-has-big-play-button-clicked"),this.player.play=e,this.updateVideoFile(void 0,{forcePlay:!0,seek:this.startTime})}}runAutoQualityScheduler(){this.autoQualityInterval=setInterval(()=>{if(null==this.torrent)return;if(!1===this.autoResolution)return;if(!0===this.isAutoResolutionObservation)return;const e=this.getAppropriateFile();let t=!1,i=0;this.isPlayerWaiting()&&e.resolution.id<this.currentVideoFile.resolution.id?(console.log("Downgrading automatically the resolution to: %s",e.resolution.label),t=!0):e.resolution.id>this.currentVideoFile.resolution.id&&(console.log("Upgrading automatically the resolution to: %s",e.resolution.label),t=!0,i=this.CONSTANTS.AUTO_QUALITY_HIGHER_RESOLUTION_DELAY),!0===t&&(this.updateResolution(e.resolution.id,i),this.isAutoResolutionObservation=!0,this.qualityObservationTimer=setTimeout(()=>{this.isAutoResolutionObservation=!1},this.CONSTANTS.AUTO_QUALITY_OBSERVATION_TIME))},this.CONSTANTS.AUTO_QUALITY_SCHEDULER)}isPlayerWaiting(){return this.player&&this.player.hasClass("vjs-waiting")}runTorrentInfoScheduler(){this.torrentInfoInterval=setInterval(()=>{if(void 0!==this.torrent)return null===this.torrent?this.player.trigger("p2pInfo",!1):(0!==this.webtorrent.downloadSpeed&&this.downloadSpeeds.push(this.webtorrent.downloadSpeed),this.player.trigger("p2pInfo",{http:{downloadSpeed:0,uploadSpeed:0,downloaded:0,uploaded:0},p2p:{downloadSpeed:this.torrent.downloadSpeed,numPeers:this.torrent.numPeers,uploadSpeed:this.torrent.uploadSpeed,downloaded:this.torrent.downloaded,uploaded:this.torrent.uploaded}}))},this.CONSTANTS.INFO_SCHEDULER)}fallbackToHttp(e,t){const i=this.player.paused();this.disableAutoResolution(!0),this.flushVideoFile(this.currentVideoFile,!0),this.torrent=null,this.player.one("error",()=>this.enableErrorDisplay());const r=this.currentVideoFile.fileUrl;return this.player.src=this.savePlayerSrcFunction,this.player.src(r),this.changeQuality(),this.player.trigger("sourcechange"),this.tryToPlay(r=>r&&t?t(r):(e.seek&&this.seek(e.seek),!1===e.forcePlay&&!0===i&&this.player.pause(),t?t():void 0))}handleError(e){return this.player.trigger("customError",{err:e})}enableErrorDisplay(){this.player.addClass("vjs-error-display-enabled")}disableErrorDisplay(){this.player.removeClass("vjs-error-display-enabled")}pickAverageVideoFile(){return 1===this.videoFiles.length?this.videoFiles[0]:this.videoFiles[Math.floor(this.videoFiles.length/2)]}stopTorrent(e){e.pause(),e.removePeer(e.ws)}renderFileInFakeElement(e,t){this.destroyingFakeRenderer=!1;const i=document.createElement("video");u(e,i,{autoplay:!1,controls:!1},(e,r)=>{this.fakeRenderer=r,!1===this.destroyingFakeRenderer&&e&&console.error("Cannot render new torrent in fake video element.",e),i.currentTime=this.player.currentTime()+(t-2e3)})}destroyFakeRenderer(){if(this.fakeRenderer){if(this.destroyingFakeRenderer=!0,this.fakeRenderer.destroy)try{this.fakeRenderer.destroy()}catch(e){console.log("Cannot destroy correctly fake renderer.",e)}this.fakeRenderer=void 0}}buildQualities(){const e=[];for(const t of this.videoFiles){const i={id:t.resolution.id,label:this.buildQualityLabel(t),height:t.resolution.id,_enabled:!0};this.player.qualityLevels().addQualityLevel(i),e.push({id:i.id,label:i.label,selected:!1})}const t={qualitySwitchCallback:e=>this.qualitySwitchCallback(e),qualityData:{video:e}};this.player.tech(!0).trigger("loadedqualitydata",t)}buildQualityLabel(e){let t=e.resolution.label;return e.fps&&e.fps>=50&&(t+=e.fps),t}qualitySwitchCallback(e){-1!==e?(this.disableAutoResolution(),this.updateResolution(e)):!0===this.autoResolutionPossible&&this.enableAutoResolution()}changeQuality(){const e=this.currentVideoFile.resolution.id,t=this.player.qualityLevels();if(-1!==e)for(let i=0;i<t.length;i++)t[i].height===e&&(t.selectedIndex_=i);else t.selectedIndex=-1}}s.a.registerPlugin("webtorrent",g)},79:function(e,t,i){"use strict";(function(e,r){i.d(t,"a",(function(){return h}));var s=i(1),n=i(8),o=i(42);class a extends o.a{constructor(e){super(e),this.version(1).stores({chunks:"id"})}}class l extends o.a{constructor(){super("webtorrent-expiration"),this.version(1).stores({databases:"name,expiration"})}}class h extends n.EventEmitter{constructor(e,t){if(super(),this.pendingPut=[],this.memoryChunks={},this.databaseName="webtorrent-chunks-",t||(t={}),this.databaseName+=t.torrent&&t.torrent.infoHash?t.torrent.infoHash:"-default",this.setMaxListeners(100),this.chunkLength=Number(e),!this.chunkLength)throw new Error("First argument must be a chunk length");this.length=Number(t.length)||1/0,this.length!==1/0&&(this.lastChunkLength=this.length%this.chunkLength||this.chunkLength,this.lastChunkIndex=Math.ceil(this.length/this.chunkLength)-1),this.db=new a(this.databaseName),this.expirationDB=new l,this.runCleaner()}put(e,t,i){const r=e===this.lastChunkIndex;return r&&t.length!==this.lastChunkLength?this.nextTick(i,new Error("Last chunk length must be "+this.lastChunkLength)):r||t.length===this.chunkLength?(this.memoryChunks[e]=!0,this.pendingPut.push({id:e,buf:t,cb:i}),void(this.putBulkTimeout||(this.putBulkTimeout=setTimeout(()=>Object(s.a)(this,void 0,void 0,(function*(){const e=this.pendingPut;this.pendingPut=[],this.putBulkTimeout=void 0;try{yield this.db.transaction("rw",this.db.chunks,()=>this.db.chunks.bulkPut(e.map(e=>({id:e.id,buf:e.buf}))))}catch(t){console.log("Cannot bulk insert chunks. Store them in memory.",{err:t}),e.forEach(e=>this.memoryChunks[e.id]=e.buf)}finally{e.forEach(e=>e.cb())}})),h.BUFFERING_PUT_MS)))):this.nextTick(i,new Error("Chunk length must be "+this.chunkLength))}get(t,i,n){if("function"==typeof i)return this.get(t,null,i);const o=this.memoryChunks[t];if(void 0===o){const t=new Error("Chunk not found");return t.notFound=!0,e.nextTick(()=>n(t))}if(!0!==o)return n(null,o);this.db.transaction("r",this.db.chunks,()=>Object(s.a)(this,void 0,void 0,(function*(){const e=yield this.db.chunks.get({id:t});if(void 0===e)return n(null,r.alloc(0));const s=e.buf;if(!i)return this.nextTick(n,null,s);const o=i.offset||0;return n(null,s.slice(o,(i.length||s.length-o)+o))}))).catch(e=>(console.error(e),n(e)))}close(e){return this.destroy(e)}destroy(e){return Object(s.a)(this,void 0,void 0,(function*(){try{return this.pendingPut&&(clearTimeout(this.putBulkTimeout),this.pendingPut=null),this.cleanerInterval&&(clearInterval(this.cleanerInterval),this.cleanerInterval=null),this.db&&(this.db.close(),yield this.dropDatabase(this.databaseName)),this.expirationDB&&(this.expirationDB.close(),this.expirationDB=null),e()}catch(t){return console.error("Cannot destroy peertube chunk store.",t),e(t)}}))}runCleaner(){this.checkExpiration(),this.cleanerInterval=setInterval(()=>Object(s.a)(this,void 0,void 0,(function*(){this.checkExpiration()})),h.CLEANER_INTERVAL_MS)}checkExpiration(){return Object(s.a)(this,void 0,void 0,(function*(){let e=[];try{yield this.expirationDB.transaction("rw",this.expirationDB.databases,()=>Object(s.a)(this,void 0,void 0,(function*(){yield this.expirationDB.databases.put({name:this.databaseName,expiration:(new Date).getTime()+h.CLEANER_EXPIRATION_MS});const t=(new Date).getTime();e=yield this.expirationDB.databases.where("expiration").below(t).toArray()})))}catch(e){console.error("Cannot update expiration of fetch expired databases.",e)}for(const t of e)yield this.dropDatabase(t.name)}))}dropDatabase(e){return Object(s.a)(this,void 0,void 0,(function*(){const t=new a(e);console.log("Destroying IndexDB database %s.",e);try{yield t.delete(),yield this.expirationDB.transaction("rw",this.expirationDB.databases,()=>this.expirationDB.databases.where({name:e}).delete())}catch(t){console.error("Cannot delete %s.",e,t)}}))}nextTick(t,i,r){e.nextTick(()=>t(i,r),void 0)}}h.BUFFERING_PUT_MS=1e3,h.CLEANER_INTERVAL_MS=6e4,h.CLEANER_EXPIRATION_MS=3e5}).call(this,i(4),i(2).Buffer)},80:function(e,t){},81:function(e,t){},82:function(e,t){},83:function(e,t){},84:function(e,t){},85:function(e,t){}}]);