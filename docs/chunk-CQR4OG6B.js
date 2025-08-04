import{a as w}from"./chunk-SGE4TNXC.js";import{a as I,b as j,c as O,e as T,f as B,h as D,i as V,r as A}from"./chunk-XOFVMEAK.js";import{Ab as M,Ba as f,Ca as u,M as _,N as h,Na as c,Pa as y,Ta as s,Ua as p,_ as a,ca as x,eb as S,ga as b,gb as v,hb as E,la as d,oa as r,qc as $,wa as t,xa as i,ya as m,za as C}from"./chunk-N7OEIV7C.js";import"./chunk-EQDQRRRY.js";function P(e,g){e&1&&(t(0,"span"),c(1,"Please login to continue"),i())}function U(e,g){if(e&1&&(t(0,"span"),c(1),s(2,"async"),i()),e&2){let n=u();a(),y("Welcome, ",p(2,1,n.user.displayName$),"")}}function k(e,g){if(e&1&&(t(0,"h3"),c(1),s(2,"async"),s(3,"json"),i()),e&2){let n=u();a(),y("authorities: ",p(3,3,p(2,1,n.user.authorities$)),"")}}function z(e,g){if(e&1){let n=C();t(0,"mat-card-actions",6)(1,"button",7),f("click",function(){_(n);let o=u();return h(o.login())}),c(2,"LOGIN"),i()()}}function L(e,g){if(e&1){let n=C();t(0,"mat-card-actions",6)(1,"button",8),f("click",function(){_(n);let o=u();return h(o.logout())}),c(2,"LOGOUT"),i()()}}var N=`
import { Component } from '@angular/core';
import { SubjectService } from '@ngx-security/core';

class UserDetails extends SubjectDetails {
}

class User extends Subject<UserDetails> {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(public user: SubjectService<UserDetails, User>) {
    }
}
`,G=`
<h3>{{user.displayName$ | async}}</h3>
<h5>{{user.authorities$ | async | json}}</h5>
`;var ee=(()=>{class e{constructor(n){this.user=n,this.usageComponentController=N,this.usageComponentView=G}login(){this.user.update({principal:"jsnow",authorities:["ROLE_1","ROLE_2","ROLE_3"],details:{displayName:"Jon Snow"}})}logout(){this.user.clear()}static{this.\u0275fac=function(l){return new(l||e)(x(w))}}static{this.\u0275cmp=b({type:e,selectors:[["app-core"]],decls:33,vars:21,consts:[["label","Overview"],[3,"highlight","language"],["label","Demo"],[1,"login-from-container"],[4,"ngIf"],["align","end",4,"ngIf"],["align","end"],["mat-raised-button","","color","primary",3,"click"],["mat-button","","color","primary",3,"click"]],template:function(l,o){l&1&&(t(0,"mat-tab-group")(1,"mat-tab",0),m(2,"br")(3,"br"),t(4,"h2"),c(5,"Installation"),i(),t(6,"pre"),m(7,"code",1),i(),m(8,"br"),t(9,"h2"),c(10,"Usage"),i(),t(11,"pre"),m(12,"code",1),i(),t(13,"pre"),m(14,"code",1),i()(),t(15,"mat-tab",2),m(16,"br")(17,"br"),t(18,"div",3)(19,"mat-card")(20,"mat-card-header")(21,"mat-card-title"),d(22,P,2,0,"span",4),s(23,"async"),d(24,U,3,3,"span",4),s(25,"async"),i()(),t(26,"mat-card-content"),d(27,k,4,5,"h3",4),s(28,"async"),i(),d(29,z,3,0,"mat-card-actions",5),s(30,"async"),d(31,L,3,0,"mat-card-actions",5),s(32,"async"),i()()()()),l&2&&(a(7),r("highlight","npm install --save @ngx-security/core")("language","bash"),a(5),r("highlight",o.usageComponentController)("language","typescript"),a(2),r("highlight",o.usageComponentView)("language","html"),a(8),r("ngIf",!p(23,11,o.user.isAuthorized$)),a(2),r("ngIf",p(25,13,o.user.isAuthorized$)),a(3),r("ngIf",p(28,15,o.user.isAuthorized$)),a(2),r("ngIf",!p(30,17,o.user.isAuthorized$)),a(2),r("ngIf",p(32,19,o.user.isAuthorized$)))},dependencies:[A,S,D,V,I,T,O,B,j,$,M,v,E],styles:["[_nghost-%COMP%]   .login-from-container[_ngcontent-%COMP%]{display:flex;justify-content:center}[_nghost-%COMP%]   .login-from-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{flex:1 1 100%;max-width:24em;min-width:12em;margin:2em}"],changeDetection:0})}}return e})();export{ee as CoreComponent};
