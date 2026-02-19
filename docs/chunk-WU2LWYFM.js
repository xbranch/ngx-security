import{a as d}from"./chunk-OPOZHD2E.js";import"./chunk-J3YCXPTY.js";import{a as D}from"./chunk-KHNZOZVB.js";import{d as V,e as R}from"./chunk-KTZWDSLY.js";import{b as I}from"./chunk-UG2A2CXJ.js";import{$a as t,Ba as p,Bb as S,Ca as f,Db as E,Ga as b,Ha as g,Ia as v,Ja as y,La as w,Nb as j,T as u,Ua as C,Va as x,Za as l,_a as i,ab as n,pa as h,vb as m,wa as o,ya as P}from"./chunk-AGF3YKSF.js";import"./chunk-FDERIQAA.js";var T=(()=>{class e{set isPermitted(r){this.permission=r,this.updateView()}constructor(r,s,a,k){this.element=r,this.templateRef=s,this.viewContainer=a,this.subject=k,this.permission=null,this.embeddedViewRef=null}ngOnInit(){this.sub=this.subject.permissions$.subscribe(()=>this.updateView())}ngOnDestroy(){this.sub&&this.sub.unsubscribe()}updateView(){this.subject.isPermitted(this.permission)?this.embeddedViewRef||(this.embeddedViewRef=this.viewContainer.createEmbeddedView(this.templateRef)):(this.viewContainer.clear(),this.embeddedViewRef=null)}static{this.\u0275fac=function(s){return new(s||e)(p(h),p(P),p(f),p(d))}}static{this.\u0275dir=v({type:e,selectors:[["","isPermitted",""]],inputs:{isPermitted:"isPermitted"}})}}return e})();var F=(()=>{class e{constructor(r,s){this.ref=r,this.subject=s,this.isPermitted=null,this.sub=null}transform(r,s){return r=s||r,this.clear(),this.sub=this.subject.isPermittedAsync(r).subscribe(a=>{this.isPermitted!==a&&(this.isPermitted=a,this.ref.markForCheck())}),this.isPermitted}ngOnDestroy(){this.clear()}clear(){this.isPermitted=null,this.sub&&(this.sub.unsubscribe(),this.sub=null)}static{this.\u0275fac=function(s){return new(s||e)(p(j,16),p(d,16))}}static{this.\u0275pipe=y({name:"isPermitted",type:e,pure:!1})}}return e})();var O=(()=>{class e{static{this.\u0275fac=function(s){return new(s||e)}}static{this.\u0275mod=g({type:e})}static{this.\u0275inj=u({})}}return e})();function A(e,_){e&1&&(i(0,"mat-card")(1,"span"),m(2,"Permission is 'printer:xpc4000:configure'"),t()())}function B(e,_){e&1&&(i(0,"mat-card")(1,"span"),m(2,"Permission is 'nas:timeCapsule:write'"),t()())}var G=`<p *isPermitted="'printer:xpc4000:configure'">Visible to users with 'printer:xpc4000:configure' permission</p>`,H=`
@if ('nas:timeCapsule:write' | isPermitted) {
    <p>Visible to users with 'nas:timeCapsule:write' permission</p>
}
`,U=`
@if ('user' | isPermitted:'nas:timeCapsule:write') {
    <p>Visible to users with 'nas:timeCapsule:write' permission</p>
}
`,Z=(()=>{class e{constructor(r){this.subjectPermissionsProvider=r,this.isPermittedDirective=G,this.isPermittedPipe=H,this.isPermittedPipePoetry=U,this.permissions=`
[
  'printer:xpc5000:print',
  'printer:xpc4000:*',
  'nas:timeCapsule,fritzbox:read'
]
  `,this.firstCard=`
<mat-card *isPermitted="'printer:xpc4000:configure'">
  <span>Permission is 'printer:xpc4000:configure'</span>
</mat-card>
`,this.secondCard=`
@if ('user' | isPermitted:'nas:timeCapsule:write') {
    <mat-card >
        <span>Permission is 'nas:timeCapsule:write'</span>
    </mat-card>
}
`}ngOnInit(){this.update(["printer:xpc5000:print","printer:xpc4000:*","nas:timeCapsule,fritzbox:read"])}update(r){this.subjectPermissionsProvider.update(r),this.subjectPermissionsProvider.apply()}static{this.\u0275fac=function(s){return new(s||e)(p(d))}}static{this.\u0275cmp=b({type:e,selectors:[["app-permissions"]],decls:49,vars:19,consts:[["label","Overview"],[3,"highlight","language"],["label","Examples"],[4,"isPermitted"]],template:function(s,a){s&1&&(i(0,"mat-tab-group")(1,"mat-tab",0),n(2,"br")(3,"br"),i(4,"h2"),m(5,"Installation"),t(),i(6,"pre"),n(7,"code",1),t(),n(8,"br"),i(9,"h2"),m(10,"Usage"),t(),i(11,"h4"),m(12,"Structural directives"),t(),i(13,"pre"),n(14,"code",1),t(),n(15,"br"),i(16,"h4"),m(17,"Pipes"),t(),i(18,"pre"),n(19,"code",1),t(),n(20,"br"),i(21,"h4"),m(22,"Pipes with poetry"),t(),i(23,"pre"),n(24,"code",1),t()(),i(25,"mat-tab",2),n(26,"br")(27,"br"),i(28,"h2"),m(29,"Code"),t(),i(30,"h4"),m(31,"Permissions"),t(),i(32,"pre"),n(33,"code",1),t(),i(34,"h4"),m(35,"In action"),t(),i(36,"pre"),n(37,"code",1),t(),i(38,"pre"),n(39,"code",1),t(),n(40,"br"),i(41,"h2"),m(42,"Result"),t(),i(43,"mat-card")(44,"span"),m(45,"This is card is always visible to all users."),t()(),w(46,A,3,0,"mat-card",3),C(47,B,3,0,"mat-card"),S(48,"isPermitted"),t()()),s&2&&(o(7),l("highlight","npm install --save @ngx-security/core @ngx-security/permissions")("language","bash"),o(7),l("highlight",a.isPermittedDirective)("language","html"),o(5),l("highlight",a.isPermittedPipe)("language","html"),o(5),l("highlight",a.isPermittedPipePoetry)("language","html"),o(9),l("highlight",a.permissions)("language","typescript"),o(4),l("highlight",a.firstCard)("language","html"),o(2),l("highlight",a.secondCard)("language","html"),o(7),l("isPermitted","printer:xpc4000:configure"),o(),x(E(48,16,"user","nas:timeCapsule:write")?47:-1))},dependencies:[O,T,R,V,I,D,F],encapsulation:2})}}return e})();export{Z as PermissionsComponent};
