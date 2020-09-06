!function(){function e(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function i(e,i){for(var t=0;t<i.length;t++){var s=i[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function t(e,t,s){return t&&i(e.prototype,t),s&&i(e,s),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{jl54:function(i,s,n){"use strict";n.r(s),n.d(s,"PermissionsModule",(function(){return K}));var r,b,c=n("OCPU"),a=n("PCNd"),u=n("tyNb"),o=n("8Cu2"),p=n("fXoL"),d=n("wZkO"),h=n("OtPg"),m=n("Wp6s"),l=((r=function(){function i(t,s,n,r){e(this,i),this.element=t,this.templateRef=s,this.viewContainer=n,this.subject=r,this.permission=null,this.embeddedViewRef=null}return t(i,[{key:"ngOnInit",value:function(){var e=this;this.sub=this.subject.permissions$.subscribe((function(){return e.updateView()}))}},{key:"ngOnDestroy",value:function(){this.sub&&this.sub.unsubscribe()}},{key:"updateView",value:function(){this.subject.isPermitted(this.permission)?this.embeddedViewRef||(this.embeddedViewRef=this.viewContainer.createEmbeddedView(this.templateRef)):(this.viewContainer.clear(),this.embeddedViewRef=null)}},{key:"isPermitted",set:function(e){this.permission=e,this.updateView()}}]),i}()).\u0275fac=function(e){return new(e||r)(p.Jb(p.l),p.Jb(p.L),p.Jb(p.P),p.Jb(o.a))},r.\u0275dir=p.Eb({type:r,selectors:[["","isPermitted",""]],inputs:{isPermitted:"isPermitted"}}),r),f=n("ofXK"),P=((b=function(){function i(t,s){e(this,i),this.ref=t,this.subject=s,this.isPermitted=null,this.sub=null}return t(i,[{key:"transform",value:function(e,i){var t=this;return e=i||e,this.clear(),this.sub=this.subject.isPermittedAsync(e).subscribe((function(e){t.isPermitted!==e&&(t.isPermitted=e,t.ref.markForCheck())})),this.isPermitted}},{key:"ngOnDestroy",value:function(){this.clear()}},{key:"clear",value:function(){this.isPermitted=null,this.sub&&(this.sub.unsubscribe(),this.sub=null)}}]),i}()).\u0275fac=function(e){return new(e||b)(p.Ub(),p.Jb(o.a))},b.\u0275pipe=p.Ib({name:"isPermitted",type:b,pure:!1}),b);function g(e,i){1&e&&(p.Ob(0,"mat-card"),p.Ob(1,"span"),p.tc(2,"Permission is 'printer:xpc4000:configure'"),p.Nb(),p.Nb())}function w(e,i){1&e&&(p.Ob(0,"mat-card"),p.Ob(1,"span"),p.tc(2,"Permission is 'nas:timeCapsule:write'"),p.Nb(),p.Nb())}var O,y,v,N=[{path:"",component:(O=function(){function i(t){e(this,i),this.subjectPermissionsProvider=t,this.isPermittedDirective="<p *isPermitted=\"'printer:xpc4000:configure'\"></p>",this.isPermittedPipe="<p *ngIf=\"'nas:timeCapsule:write' | isPermitted\"></p>",this.isPermittedPipePoetry="<p *ngIf=\"'user' | isPermitted:'nas:timeCapsule:write'\"></p>",this.permissions="\n[\n  'printer:xpc5000:print',\n  'printer:xpc4000:*',\n  'nas:timeCapsule,fritzbox:read'\n]\n  ",this.firstCard="\n<mat-card *isPermitted=\"'printer:xpc4000:configure'\">\n<span>Permission is 'printer:xpc4000:configure'</span>\n</mat-card>\n",this.secondCard="\n<mat-card *ngIf=\"'user' | isPermitted:'nas:timeCapsule:write'\">\n<span>Permission is 'nas:timeCapsule:write'</span>\n</mat-card>\n"}return t(i,[{key:"ngOnInit",value:function(){this.update(["printer:xpc5000:print","printer:xpc4000:*","nas:timeCapsule,fritzbox:read"])}},{key:"update",value:function(e){this.subjectPermissionsProvider.update(e),this.subjectPermissionsProvider.apply()}}]),i}(),O.\u0275fac=function(e){return new(e||O)(p.Jb(o.a))},O.\u0275cmp=p.Db({type:O,selectors:[["app-permissions"]],decls:49,vars:12,consts:[["label","Overview"],[3,"highlight"],["label","Examples"],[4,"isPermitted"],[4,"ngIf"]],template:function(e,i){1&e&&(p.Ob(0,"mat-tab-group"),p.Ob(1,"mat-tab",0),p.Kb(2,"br"),p.Kb(3,"br"),p.Ob(4,"h2"),p.tc(5,"Installation"),p.Nb(),p.Ob(6,"pre"),p.Kb(7,"code",1),p.Nb(),p.Kb(8,"br"),p.Ob(9,"h2"),p.tc(10,"Usage"),p.Nb(),p.Ob(11,"h4"),p.tc(12,"Structural directives"),p.Nb(),p.Ob(13,"pre"),p.Kb(14,"code",1),p.Nb(),p.Kb(15,"br"),p.Ob(16,"h4"),p.tc(17,"Pipes"),p.Nb(),p.Ob(18,"pre"),p.Kb(19,"code",1),p.Nb(),p.Kb(20,"br"),p.Ob(21,"h4"),p.tc(22,"Pipes with poetry"),p.Nb(),p.Ob(23,"pre"),p.Kb(24,"code",1),p.Nb(),p.Nb(),p.Ob(25,"mat-tab",2),p.Kb(26,"br"),p.Kb(27,"br"),p.Ob(28,"h2"),p.tc(29,"Code"),p.Nb(),p.Ob(30,"h4"),p.tc(31,"Permissions"),p.Nb(),p.Ob(32,"pre"),p.Kb(33,"code",1),p.Nb(),p.Ob(34,"h4"),p.tc(35,"In action"),p.Nb(),p.Ob(36,"pre"),p.Kb(37,"code",1),p.Nb(),p.Ob(38,"pre"),p.Kb(39,"code",1),p.Nb(),p.Kb(40,"br"),p.Ob(41,"h2"),p.tc(42,"Result"),p.Nb(),p.Ob(43,"mat-card"),p.Ob(44,"span"),p.tc(45,"This is card is always visible to all users."),p.Nb(),p.Nb(),p.sc(46,g,3,0,"mat-card",3),p.sc(47,w,3,0,"mat-card",4),p.Yb(48,"isPermitted"),p.Nb(),p.Nb()),2&e&&(p.zb(7),p.dc("highlight","npm install --save @ngx-security/permissions"),p.zb(7),p.dc("highlight",i.isPermittedDirective),p.zb(5),p.dc("highlight",i.isPermittedPipe),p.zb(5),p.dc("highlight",i.isPermittedPipePoetry),p.zb(9),p.dc("highlight",i.permissions),p.zb(4),p.dc("highlight",i.firstCard),p.zb(2),p.dc("highlight",i.secondCard),p.zb(7),p.dc("isPermitted","printer:xpc4000:configure"),p.zb(1),p.dc("ngIf",p.ac(48,9,"user","nas:timeCapsule:write")))},directives:[d.b,d.a,h.b,m.a,l,f.l],pipes:[P],styles:[""],changeDetection:0}),O)}],C=((v=function i(){e(this,i)}).\u0275mod=p.Hb({type:v}),v.\u0275inj=p.Gb({factory:function(e){return new(e||v)},imports:[[u.f.forChild(N)],u.f]}),v),K=((y=function i(){e(this,i)}).\u0275mod=p.Hb({type:y}),y.\u0275inj=p.Gb({factory:function(e){return new(e||y)},imports:[[a.a,C,c.a.forChild()]]}),y)}}])}();