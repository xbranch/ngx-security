function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,e){for(var t=0;t<e.length;t++){var c=e[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(n,c.key,c)}}function _createClass(n,e,t){return e&&_defineProperties(n.prototype,e),t&&_defineProperties(n,t),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{pKmL:function(n,e,t){"use strict";t.r(e);var c=t("bTqV"),o=t("9r3w"),i=t("PCNd"),a=t("tyNb"),r=t("pfHM"),s=t("fXoL"),b=t("wZkO"),l=t("OtPg"),u=t("Wp6s"),p=t("ofXK");function f(n,e){1&n&&(s.Sb(0,"span"),s.xc(1,"Please login to continue"),s.Rb())}function m(n,e){if(1&n&&(s.Sb(0,"span"),s.xc(1),s.dc(2,"async"),s.Rb()),2&n){var t=s.cc();s.Cb(1),s.zc("Welcome, ",s.ec(2,1,t.user.displayName$),"")}}function h(n,e){if(1&n&&(s.Sb(0,"h3"),s.xc(1),s.dc(2,"json"),s.dc(3,"async"),s.Rb()),2&n){var t=s.cc();s.Cb(1),s.zc("authorities: ",s.ec(2,1,s.ec(3,3,t.user.authorities$)),"")}}function d(n,e){if(1&n){var t=s.Tb();s.Sb(0,"mat-card-actions",7),s.Sb(1,"button",8),s.ac("click",(function(){return s.pc(t),s.cc().login()})),s.xc(2,"LOGIN"),s.Rb(),s.Rb()}}function g(n,e){if(1&n){var t=s.Tb();s.Sb(0,"mat-card-actions",9),s.Sb(1,"button",10),s.ac("click",(function(){return s.pc(t),s.cc().logout()})),s.xc(2,"LOGOUT"),s.Rb(),s.Rb()}}var C,y,w=[{path:"",component:(C=function(){function n(e){_classCallCheck(this,n),this.user=e,this.usageComponentController="\nimport { Component } from '@angular/core';\nimport { SubjectService } from '@ngx-security/core';\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n  styleUrls: ['./app.component.scss']\n})\nexport class AppComponent {\n\n    constructor(public user: SubjectService) {\n    }\n}\n",this.usageComponentView="\n<h3>{{user.displayName$ | async}}</h3>\n<h5>{{user.authorities$ | async | json}}</h5>\n"}return _createClass(n,[{key:"ngOnInit",value:function(){}},{key:"login",value:function(){this.user.update({authorities:["ROLE_1","ROLE_2","ROLE_3"],details:{displayName:"Jon Snow"}})}},{key:"logout",value:function(){this.user.clear()}}]),n}(),C.\u0275fac=function(n){return new(n||C)(s.Nb(r.b))},C.\u0275cmp=s.Hb({type:C,selectors:[["app-core"]],decls:32,vars:18,consts:[["label","Overview"],[3,"highlight"],["label","Demo"],[1,"login-from-container"],[4,"ngIf"],["align","center",4,"ngIf"],["align","end",4,"ngIf"],["align","center"],["mat-raised-button","","color","primary",3,"click"],["align","end"],["mat-button","","color","primary",3,"click"]],template:function(n,e){1&n&&(s.Sb(0,"mat-tab-group"),s.Sb(1,"mat-tab",0),s.Ob(2,"br"),s.Ob(3,"br"),s.Sb(4,"h2"),s.xc(5,"Installation"),s.Rb(),s.Sb(6,"pre"),s.Ob(7,"code",1),s.Rb(),s.Ob(8,"br"),s.Sb(9,"h2"),s.xc(10,"Usage"),s.Rb(),s.Sb(11,"pre"),s.Ob(12,"code",1),s.Rb(),s.Sb(13,"pre"),s.Ob(14,"code",1),s.Rb(),s.Rb(),s.Sb(15,"mat-tab",2),s.Ob(16,"br"),s.Ob(17,"br"),s.Sb(18,"div",3),s.Sb(19,"mat-card"),s.Sb(20,"mat-card-title"),s.wc(21,f,2,0,"span",4),s.dc(22,"async"),s.wc(23,m,3,3,"span",4),s.dc(24,"async"),s.Rb(),s.Sb(25,"mat-card-content"),s.wc(26,h,4,5,"h3",4),s.dc(27,"async"),s.Rb(),s.wc(28,d,3,0,"mat-card-actions",5),s.dc(29,"async"),s.wc(30,g,3,0,"mat-card-actions",6),s.dc(31,"async"),s.Rb(),s.Rb(),s.Rb(),s.Rb()),2&n&&(s.Cb(7),s.ic("highlight","npm install --save @ngx-security/core"),s.Cb(5),s.ic("highlight",e.usageComponentController),s.Cb(2),s.ic("highlight",e.usageComponentView),s.Cb(7),s.ic("ngIf",!s.ec(22,8,e.user.isAuthorized$)),s.Cb(2),s.ic("ngIf",s.ec(24,10,e.user.isAuthorized$)),s.Cb(3),s.ic("ngIf",s.ec(27,12,e.user.isAuthorized$)),s.Cb(2),s.ic("ngIf",!s.ec(29,14,e.user.isAuthorized$)),s.Cb(2),s.ic("ngIf",s.ec(31,16,e.user.isAuthorized$)))},directives:[b.b,b.a,l.a,u.a,u.h,p.l,u.c,u.b,c.a],pipes:[p.b,p.f],styles:["[_nghost-%COMP%]   .login-from-container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}[_nghost-%COMP%]   .login-from-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1 1 100%;max-width:24em;min-width:12em;margin:2em}"],changeDetection:0}),C)}],O=((y=function n(){_classCallCheck(this,n)}).\u0275mod=s.Lb({type:y}),y.\u0275inj=s.Kb({factory:function(n){return new(n||y)},imports:[[a.f.forChild(w)],a.f]}),y);t.d(e,"CoreModule",(function(){return R}));var S,R=((S=function n(){_classCallCheck(this,n)}).\u0275mod=s.Lb({type:S}),S.\u0275inj=s.Kb({factory:function(n){return new(n||S)},imports:[[i.a,O,o.a.forChild(),c.b]]}),S)}}]);