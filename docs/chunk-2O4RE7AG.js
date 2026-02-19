import{a as M}from"./chunk-DXWUZSEN.js";import{b as j}from"./chunk-MWH3VXXA.js";import"./chunk-USY727E2.js";import{a as O,b as T,c as B,e as V,f as $}from"./chunk-KHNZOZVB.js";import{d as A,e as P}from"./chunk-KTZWDSLY.js";import{b as w}from"./chunk-UG2A2CXJ.js";import{$ as h,$a as i,Ba as b,Bb as r,Cb as l,Ga as S,Ua as m,Va as d,Xb as v,Yb as E,Za as g,_a as t,aa as _,ab as s,eb as f,gb as x,hb as u,vb as c,wa as a,xb as y}from"./chunk-AGF3YKSF.js";import"./chunk-FDERIQAA.js";function D(e,C){e&1&&(t(0,"span"),c(1,"Please login to continue"),i())}function U(e,C){if(e&1&&(t(0,"span"),c(1),r(2,"async"),i()),e&2){let n=u();a(),y("Welcome, ",l(2,1,n.user.displayName$))}}function k(e,C){if(e&1&&(t(0,"h3"),c(1),r(2,"async"),r(3,"json"),i()),e&2){let n=u();a(),y("authorities: ",l(3,3,l(2,1,n.user.authorities$)))}}function z(e,C){if(e&1){let n=f();t(0,"mat-card-actions",4)(1,"button",5),x("click",function(){h(n);let o=u();return _(o.login())}),c(2,"LOGIN"),i()()}}function I(e,C){if(e&1){let n=f();t(0,"mat-card-actions",4)(1,"button",6),x("click",function(){h(n);let o=u();return _(o.logout())}),c(2,"LOGOUT"),i()()}}var L=`
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
`,N=`
<h3>{{user.displayName$ | async}}</h3>
<h5>{{user.authorities$ | async | json}}</h5>
`;var Y=(()=>{class e{constructor(n){this.user=n,this.usageComponentController=L,this.usageComponentView=N}login(){this.user.update({principal:"jsnow",authorities:["ROLE_1","ROLE_2","ROLE_3"],details:{displayName:"Jon Snow"}})}logout(){this.user.clear()}static{this.\u0275fac=function(p){return new(p||e)(b(M))}}static{this.\u0275cmp=S({type:e,selectors:[["app-core"]],decls:33,vars:21,consts:[["label","Overview"],[3,"highlight","language"],["label","Demo"],[1,"login-from-container"],["align","end"],["mat-raised-button","","color","primary",3,"click"],["mat-button","","color","primary",3,"click"]],template:function(p,o){p&1&&(t(0,"mat-tab-group")(1,"mat-tab",0),s(2,"br")(3,"br"),t(4,"h2"),c(5,"Installation"),i(),t(6,"pre"),s(7,"code",1),i(),s(8,"br"),t(9,"h2"),c(10,"Usage"),i(),t(11,"pre"),s(12,"code",1),i(),t(13,"pre"),s(14,"code",1),i()(),t(15,"mat-tab",2),s(16,"br")(17,"br"),t(18,"div",3)(19,"mat-card")(20,"mat-card-header")(21,"mat-card-title"),m(22,D,2,0,"span"),r(23,"async"),m(24,U,3,3,"span"),r(25,"async"),i()(),t(26,"mat-card-content"),m(27,k,4,5,"h3"),r(28,"async"),i(),m(29,z,3,0,"mat-card-actions",4),r(30,"async"),m(31,I,3,0,"mat-card-actions",4),r(32,"async"),i()()()()),p&2&&(a(7),g("highlight","npm install --save @ngx-security/core")("language","bash"),a(5),g("highlight",o.usageComponentController)("language","typescript"),a(2),g("highlight",o.usageComponentView)("language","html"),a(8),d(l(23,11,o.user.isAuthorized$)?-1:22),a(2),d(l(25,13,o.user.isAuthorized$)?24:-1),a(3),d(l(28,15,o.user.isAuthorized$)?27:-1),a(2),d(l(30,17,o.user.isAuthorized$)?-1:29),a(2),d(l(32,19,o.user.isAuthorized$)?31:-1))},dependencies:[P,A,w,O,$,T,B,V,j,v,E],styles:["[_nghost-%COMP%]   .login-from-container[_ngcontent-%COMP%]{display:flex;justify-content:center}[_nghost-%COMP%]   .login-from-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{flex:1 1 100%;max-width:24em;min-width:12em;margin:2em}"]})}}return e})();export{Y as CoreComponent};
