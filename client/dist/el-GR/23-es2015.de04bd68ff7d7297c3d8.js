(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"4aiV":function(e,t,n){"use strict";n.r(t),n.d(t,"LoginModule",(function(){return te}));var o=n("sWvm"),r=n("P8w3"),c=n("xMQD"),i=n("tyNb"),a=n("Phsq"),s=n("AytR"),l=n("ey9i"),d=n("ihI+"),u=n("fXoL"),g=n("1kSV"),f=n("7FIj"),b=n("ofXK"),p=n("3Pt+"),m=n("UkmY");const h=["usernameInput"],v=["forgotPasswordModal"];var P,C,w;function y(e,t){1&e&&(u.dc(0,"div",5),u.nc(1,C),u.Yb(2,"a",6),u.kc(),u.cc())}P="\n    \u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7\n  ",C="\n    Sorry but there was an issue with the external login process. Please " + "\ufffd#2\ufffd" + "contact an administrator" + "\ufffd/#2\ufffd" + ".\n  ",w="\u03A7\u03C1\u03AE\u03C3\u03C4\u03B7\u03C2";const M=["placeholder","\u038C\u03BD\u03BF\u03BC\u03B1 \u03C7\u03C1\u03AE\u03C3\u03C4\u03B7 \u03AE \u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 e-mail"];var x;x="\u039A\u03C9\u03B4\u03B9\u03BA\u03CC\u03C2 \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7\u03C2";const O=["placeholder","\u039A\u03C9\u03B4\u03B9\u03BA\u03CC\u03C2 \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7\u03C2"],_=["title","Click here to reset your password"],k=["value","\u03A3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7"];var E,I,A,$,S;function z(e,t){1&e&&(u.dc(0,"div",21),u.dc(1,"h6",22),u.hc(2,E),u.cc(),u.dc(3,"div"),u.nc(4,I),u.Yb(5,"br"),u.Yb(6,"a",23),u.kc(),u.cc(),u.cc())}function D(e,t){1&e&&(u.dc(0,"span"),u.dc(1,"a",24),u.hc(2,A),u.cc(),u.cc())}function J(e,t){if(1&e&&(u.dc(0,"div",5),u.cd(1),u.ad(2,D,3,0,"span",3),u.cc()),2&e){const e=u.wc(2);u.Jb(1),u.ed("",e.error," "),u.Jb(1),u.Dc("ngIf","User email is not verified."===e.error)}}function L(e,t){1&e&&(u.dc(0,"a",25),u.hc(1,$),u.cc())}function R(e,t){if(1&e&&(u.dc(0,"div",26),u.cd(1),u.cc()),2&e){const e=u.wc(2);u.Jb(1),u.ed(" ",e.formErrors.username," ")}}function F(e,t){if(1&e&&(u.dc(0,"div",26),u.cd(1),u.cc()),2&e){const e=u.wc(2);u.Jb(1),u.ed(" ",e.formErrors.password," ")}}function N(e,t){if(1&e&&(u.dc(0,"a",30),u.cd(1),u.cc()),2&e){const e=t.$implicit,n=u.wc(3);u.Dc("href",n.getAuthHref(e),u.Tc),u.Jb(1),u.ed(" ",e.authDisplayName," ")}}function j(e,t){if(1&e&&(u.dc(0,"div",27),u.dc(1,"div",28),u.hc(2,S),u.cc(),u.dc(3,"div"),u.ad(4,N,2,2,"a",29),u.cc(),u.cc()),2&e){const e=u.wc(2);u.Jb(4),u.Dc("ngForOf",e.getExternalLogins())}}E="\n        If you are looking for an account\u2026\n      ",I="\n        Currently this instance doesn't allow for user registration, but you can find an instance\n        that gives you the possibility to sign up for an account and upload your videos there.\n\n        " + "\ufffd#5\ufffd\ufffd/#5\ufffd" + "\n\n        Find yours among multiple instances at " + "\ufffd#6\ufffd" + "https://joinpeertube.org/instances" + "\ufffd/#6\ufffd" + ".\n      ",A="\u0396\u03B7\u03C4\u03AE\u03C3\u03C4\u03B5 \u03BD\u03AD\u03BF e-mail \u03B5\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7\u03C2.",$="\n              or create an account\n            ",S="Or sign in with";const T=function(e){return{"input-error":e}};function X(e,t){if(1&e){const e=u.ec();u.bc(0),u.ad(1,z,7,0,"div",7),u.ad(2,J,3,2,"div",2),u.dc(3,"div",8),u.dc(4,"form",9),u.sc("ngSubmit",(function(){return u.Rc(e),u.wc().login()})),u.dc(5,"div",10),u.dc(6,"div"),u.dc(7,"label",11),u.hc(8,w),u.cc(),u.dc(9,"input",12,13),u.jc(11,M),u.cc(),u.ad(12,L,2,0,"a",14),u.cc(),u.ad(13,R,2,1,"div",15),u.cc(),u.dc(14,"div",10),u.dc(15,"label",16),u.hc(16,x),u.cc(),u.dc(17,"div"),u.dc(18,"input",17),u.jc(19,O),u.cc(),u.dc(20,"a",18),u.jc(21,_),u.sc("click",(function(){return u.Rc(e),u.wc().openForgotPasswordModal()})),u.cd(22,"I forgot my password"),u.cc(),u.cc(),u.ad(23,F,2,1,"div",15),u.cc(),u.dc(24,"input",19),u.jc(25,k),u.cc(),u.cc(),u.ad(26,j,5,1,"div",20),u.cc(),u.ac()}if(2&e){const e=u.wc();u.Jb(1),u.Dc("ngIf",!1===e.signupAllowed),u.Jb(1),u.Dc("ngIf",e.error),u.Jb(2),u.Dc("formGroup",e.form),u.Jb(5),u.Dc("ngClass",u.Hc(10,T,e.formErrors.username)),u.Jb(3),u.Dc("ngIf",!0===e.signupAllowed),u.Jb(1),u.Dc("ngIf",e.formErrors.username),u.Jb(5),u.Dc("ngClass",u.Hc(12,T,e.formErrors.password)),u.Jb(5),u.Dc("ngIf",e.formErrors.password),u.Jb(1),u.Dc("disabled",!e.form.valid),u.Jb(2),u.Dc("ngIf",0!==e.getExternalLogins().length)}}var q,V;q="\u039E\u03B5\u03C7\u03AC\u03C3\u03B1\u03C4\u03B5 \u03C4\u03BF\u03BD \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7\u03C2",V="E-mail";const U=["placeholder","\u0394\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 e-mail"],W=["value","\u0386\u03BA\u03C5\u03C1\u03BF"],K=["value","\u03A3\u03C4\u03B5\u03AF\u03BB\u03C4\u03B5 \u03BC\u03BF\u03C5 \u03AD\u03BD\u03B1 e-mail \u03B3\u03B9\u03B1 \u03B5\u03C0\u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC \u03C4\u03BF\u03C5 \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03CD \u03BC\u03BF\u03C5"];var G;function H(e,t){1&e&&(u.dc(0,"div",5),u.hc(1,G),u.cc())}function Y(e,t){if(1&e){const e=u.ec();u.dc(0,"div",31),u.dc(1,"h4",32),u.hc(2,q),u.cc(),u.dc(3,"my-global-icon",33),u.sc("click",(function(){return u.Rc(e),u.wc().hideForgotPasswordModal()})),u.cc(),u.cc(),u.dc(4,"div",34),u.ad(5,H,2,0,"div",2),u.dc(6,"div",35),u.dc(7,"label",36),u.hc(8,V),u.cc(),u.dc(9,"input",37,38),u.jc(11,U),u.sc("ngModelChange",(function(t){return u.Rc(e),u.wc().forgotPasswordEmail=t})),u.cc(),u.cc(),u.cc(),u.dc(12,"div",39),u.dc(13,"input",40),u.jc(14,W),u.sc("click",(function(){return u.Rc(e),u.wc().hideForgotPasswordModal()}))("key.enter",(function(){return u.Rc(e),u.wc().hideForgotPasswordModal()})),u.cc(),u.dc(15,"input",41),u.jc(16,K),u.sc("click",(function(){return u.Rc(e),u.wc().askResetPassword()})),u.cc(),u.cc()}if(2&e){const e=u.Pc(10),t=u.wc();u.Jb(5),u.Dc("ngIf",t.isEmailDisabled()),u.Jb(1),u.Dc("hidden",t.isEmailDisabled()),u.Jb(3),u.Dc("ngModel",t.forgotPasswordEmail),u.Jb(6),u.Dc("disabled",!e.validity.valid)}}G="\n      We are sorry, you cannot recover your password because your instance administrator did not configure the PeerTube email system.\n    ";let B=(()=>{class e extends o.c{constructor(e,t,n,o,r,c,i,a,s,l){super(),this.formValidatorService=e,this.route=t,this.modalService=n,this.loginValidatorsService=o,this.authService=r,this.userService=c,this.redirectService=i,this.notifier=a,this.hooks=s,this.i18n=l,this.error=null,this.forgotPasswordEmail="",this.isAuthenticatedWithExternalAuth=!1,this.externalAuthError=!1,this.externalLogins=[]}get signupAllowed(){return!0===this.serverConfig.signup.allowed}isEmailDisabled(){return!1===this.serverConfig.email.enabled}ngOnInit(){const e=this.route.snapshot;this.serverConfig=e.data.serverConfig,e.queryParams.externalAuthToken?this.loadExternalAuthToken(e.queryParams.username,e.queryParams.externalAuthToken):e.queryParams.externalAuthError?this.externalAuthError=!0:this.buildForm({username:this.loginValidatorsService.LOGIN_USERNAME,password:this.loginValidatorsService.LOGIN_PASSWORD})}ngAfterViewInit(){this.usernameInput&&this.usernameInput.nativeElement.focus(),this.hooks.runAction("action:login.init","login")}getExternalLogins(){return this.serverConfig.plugin.registeredExternalAuths}getAuthHref(e){return s.a.apiUrl+`/plugins/${e.name}/${e.version}/auth/${e.authName}`}login(){this.error=null;const{username:e,password:t}=this.form.value;this.authService.login(e,t).subscribe(()=>this.redirectService.redirectToPreviousRoute(),e=>this.handleError(e))}askResetPassword(){this.userService.askResetPassword(this.forgotPasswordEmail).subscribe(()=>{const e=this.i18n("An email with the reset password instructions will be sent to {{email}}. The link will expire within 1 hour.",{email:this.forgotPasswordEmail});this.notifier.success(e),this.hideForgotPasswordModal()},e=>this.notifier.error(e.message))}openForgotPasswordModal(){this.openedForgotPasswordModal=this.modalService.open(this.forgotPasswordModal)}hideForgotPasswordModal(){this.openedForgotPasswordModal.close()}loadExternalAuthToken(e,t){this.isAuthenticatedWithExternalAuth=!0,this.authService.login(e,null,t).subscribe(()=>this.redirectService.redirectToPreviousRoute(),e=>{this.handleError(e),this.isAuthenticatedWithExternalAuth=!1})}handleError(e){this.error=-1!==e.message.indexOf("credentials are invalid")?this.i18n("Incorrect username or password."):-1!==e.message.indexOf("blocked")?this.i18n("Your account is blocked."):e.message}}return e.\u0275fac=function(t){return new(t||e)(u.Xb(o.d),u.Xb(i.a),u.Xb(g.k),u.Xb(o.f),u.Xb(l.a),u.Xb(l.z),u.Xb(l.m),u.Xb(l.k),u.Xb(d.a),u.Xb(f.a))},e.\u0275cmp=u.Rb({type:e,selectors:[["my-login"]],viewQuery:function(e,t){var n;1&e&&(u.gd(h,!0),u.Xc(v,!0)),2&e&&(u.Oc(n=u.tc())&&(t.usernameInput=n.first),u.Oc(n=u.tc())&&(t.forgotPasswordModal=n.first))},features:[u.Gb],decls:7,vars:2,consts:[[1,"margin-content"],[1,"title-page","title-page-single"],["class","alert alert-danger",4,"ngIf"],[4,"ngIf"],["forgotPasswordModal",""],[1,"alert","alert-danger"],["routerLink","/about"],["class","looking-for-account alert alert-info","role","alert",4,"ngIf"],[1,"login-form-and-externals"],["role","form",3,"formGroup","ngSubmit"],[1,"form-group"],["for","username"],["type","text","id","username","required","","tabindex","1","formControlName","username",1,"form-control",3,"ngClass",6,"placeholder"],["usernameInput",""],["routerLink","/signup","class","create-an-account",4,"ngIf"],["class","form-error",4,"ngIf"],["for","password"],["type","password","name","password","id","password","required","","tabindex","2","autocomplete","current-password","formControlName","password",1,"form-control",3,"ngClass",6,"placeholder"],[1,"forgot-password-button",3,"click",6,"title"],["type","submit",3,"disabled",6,"value"],["class","external-login-blocks",4,"ngIf"],["role","alert",1,"looking-for-account","alert","alert-info"],[1,"alert-heading"],["href","https://joinpeertube.org/instances","target","_blank","rel","noopener noreferrer",1,"alert-link"],["routerLink","/verify-account/ask-send-email"],["routerLink","/signup",1,"create-an-account"],[1,"form-error"],[1,"external-login-blocks"],[1,"block-title"],["class","external-login-block","role","button",3,"href",4,"ngFor","ngForOf"],["role","button",1,"external-login-block",3,"href"],[1,"modal-header"],[1,"modal-title"],["iconName","cross","aria-label","Close","role","button",3,"click"],[1,"modal-body"],[1,"form-group",3,"hidden"],["for","forgot-password-email"],["type","email","id","forgot-password-email","required","",3,"ngModel","ngModelChange",6,"placeholder"],["forgotPasswordEmailInput",""],[1,"modal-footer","inputs"],["type","button","role","button",1,"action-button","action-button-cancel",3,"click","key.enter",6,"value"],["type","submit",1,"action-button-submit",3,"disabled","click",6,"value"]],template:function(e,t){1&e&&(u.dc(0,"div",0),u.dc(1,"div",1),u.hc(2,P),u.cc(),u.ad(3,y,3,0,"div",2),u.ad(4,X,27,14,"ng-container",3),u.cc(),u.ad(5,Y,17,4,"ng-template",null,4,u.bd)),2&e&&(u.Jb(3),u.Dc("ngIf",t.externalAuthError),u.Jb(1),u.Dc("ngIf",!t.externalAuthError&&!t.isAuthenticatedWithExternalAuth))},directives:[b.u,i.k,p.J,p.u,p.m,p.d,p.E,p.t,p.k,b.r,b.t,m.a,p.w],styles:['label[_ngcontent-%COMP%]{display:block}input[_ngcontent-%COMP%]:not([type=submit]){height:30px;width:340px;color:var(--inputForegroundColor);background-color:var(--inputBackgroundColor);border:1px solid #c6c6c6;border-radius:3px;padding-left:15px;padding-right:15px;font-size:15px;display:inline-block;margin-right:5px}input[_ngcontent-%COMP%]:not([type=submit])::-moz-placeholder{color:var(--inputPlaceholderColor)}input[_ngcontent-%COMP%]:not([type=submit])::-ms-input-placeholder{color:var(--inputPlaceholderColor)}input[_ngcontent-%COMP%]:not([type=submit])::placeholder{color:var(--inputPlaceholderColor)}input[_ngcontent-%COMP%]:not([type=submit])[readonly]{opacity:.7}@media screen and (max-width:340px){input[_ngcontent-%COMP%]:not([type=submit]){width:100%}}input[type=submit][_ngcontent-%COMP%]{border:none;font-weight:600;font-size:15px;height:30px;line-height:30px;border-radius:3px;text-align:center;padding:0 17px 0 13px;cursor:pointer}input[type=submit].focus-visible[_ngcontent-%COMP%], input[type=submit][_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .2rem var(--mainColorLightest)}input[type=submit][_ngcontent-%COMP%], input[type=submit][_ngcontent-%COMP%]:active, input[type=submit][_ngcontent-%COMP%]:focus{color:#fff;background-color:var(--mainColor)}input[type=submit][_ngcontent-%COMP%]:hover{color:#fff;background-color:var(--mainHoverColor)}input[type=submit].disabled[_ngcontent-%COMP%], input[type=submit][disabled][_ngcontent-%COMP%]{cursor:default;color:#fff;background-color:#c6c6c6}input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     .feather, input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     .material{color:#fff}input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg circle[fill="#000"], input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg g[fill="#000"], input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg path[fill="#000"], input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg polygon[fill="#000"], input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg rect[fill="#000"]{fill:#fff}input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg circle[stroke="#000"], input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg g[stroke="#000"], input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg path[stroke="#000"], input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg polygon[stroke="#000"], input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg rect[stroke="#000"]{stroke:#fff}input[type=submit][_ngcontent-%COMP%]   my-global-icon[_ngcontent-%COMP%]     svg stop[stop-color="#000"]{stop-color:#fff}.create-an-account[_ngcontent-%COMP%], .forgot-password-button[_ngcontent-%COMP%]{color:var(--mainForegroundColor);cursor:pointer;transition:opacity cubic-bezier(.39,.575,.565,1)}.create-an-account[_ngcontent-%COMP%]:hover, .forgot-password-button[_ngcontent-%COMP%]:hover{text-decoration:none!important;opacity:.7!important}.login-form-and-externals[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;font-size:15px}.login-form-and-externals[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{margin:0 50px 20px 0}.login-form-and-externals[_ngcontent-%COMP%]   .external-login-blocks[_ngcontent-%COMP%]{min-width:200px}.login-form-and-externals[_ngcontent-%COMP%]   .external-login-blocks[_ngcontent-%COMP%]   .block-title[_ngcontent-%COMP%]{font-weight:600}.login-form-and-externals[_ngcontent-%COMP%]   .external-login-blocks[_ngcontent-%COMP%]   .external-login-block[_ngcontent-%COMP%]{cursor:pointer;border:1px solid #d1d7e0;border-radius:5px;color:var(--mainForegroundColor);margin:10px 10px 0 0;display:flex;justify-content:center;align-items:center;min-height:35px;min-width:100px}.login-form-and-externals[_ngcontent-%COMP%]   .external-login-blocks[_ngcontent-%COMP%]   .external-login-block[_ngcontent-%COMP%]:active, .login-form-and-externals[_ngcontent-%COMP%]   .external-login-blocks[_ngcontent-%COMP%]   .external-login-block[_ngcontent-%COMP%]:focus, .login-form-and-externals[_ngcontent-%COMP%]   .external-login-blocks[_ngcontent-%COMP%]   .external-login-block[_ngcontent-%COMP%]:hover{text-decoration:none!important;outline:none!important}.login-form-and-externals[_ngcontent-%COMP%]   .external-login-blocks[_ngcontent-%COMP%]   .external-login-block[_ngcontent-%COMP%]:hover{background-color:rgba(209,215,224,.5)}']}),e})();var Q=n("trhE");const Z=[{path:"",component:B,canActivate:[a.a],data:{meta:{title:"Login"}},resolve:{serverConfig:Q.a}}];let ee=(()=>{class e{}return e.\u0275mod=u.Vb({type:e}),e.\u0275inj=u.Ub({factory:function(t){return new(t||e)},imports:[[i.l.forChild(Z)],i.l]}),e})(),te=(()=>{class e{}return e.\u0275mod=u.Vb({type:e}),e.\u0275inj=u.Ub({factory:function(t){return new(t||e)},providers:[],imports:[[ee,c.g,o.h,r.a]]}),e})()}}]);