(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{UiQT:function(l,n,u){"use strict";u.r(n);var e=u("8Y7J");class s{}var i=u("pMnS"),t=u("lzlj"),r=u("igqZ"),b=u("omvX"),a=u("Rlre"),o=u("rWV4"),c=u("dJsq"),d=u("8Cu2");class p{constructor(l,n,u,e){this.element=l,this.templateRef=n,this.viewContainer=u,this.subject=e,this.permission=null,this.embeddedViewRef=null}set isPermitted(l){this.permission=l,this.updateView()}ngOnInit(){this.sub=this.subject.permissions$.subscribe(()=>this.updateView())}ngOnDestroy(){this.sub&&this.sub.unsubscribe()}updateView(){this.subject.isPermitted(this.permission)?this.embeddedViewRef||(this.embeddedViewRef=this.viewContainer.createEmbeddedView(this.templateRef)):(this.viewContainer.clear(),this.embeddedViewRef=null)}}var h=u("SVse");class m{constructor(l,n){this.ref=l,this.subject=n,this.isPermitted=null,this.sub=null}transform(l,n){return l=n||l,this.clear(),this.sub=this.subject.isPermittedAsync(l).subscribe(l=>{this.isPermitted!==l&&(this.isPermitted=l,this.ref.markForCheck())}),this.isPermitted}ngOnDestroy(){this.clear()}clear(){this.isPermitted=null,this.sub&&(this.sub.unsubscribe(),this.sub=null)}}const C="<p *isPermitted=\"'printer:xpc4000:configure'\"></p>",f="<p *ngIf=\"'nas:timeCapsule:write' | isPermitted\"></p>",P="<p *ngIf=\"'user' | isPermitted:'nas:timeCapsule:write'\"></p>";class g{constructor(l){this.subject=l,this.isPermittedDirective=C,this.isPermittedPipe=f,this.isPermittedPipePoetry=P,this.permissions="\n[\n  'printer:xpc5000:print',\n  'printer:xpc4000:*',\n  'nas:timeCapsule,fritzbox:read'\n]\n  ",this.firstCard="\n<mat-card *isPermitted=\"'printer:xpc4000:configure'\">\n<span>Permission is 'printer:xpc4000:configure'</span>\n</mat-card>\n",this.secondCard="\n<mat-card *ngIf=\"'user' | isPermitted:'nas:timeCapsule:write'\">\n<span>Permission is 'nas:timeCapsule:write'</span>\n</mat-card>\n"}ngOnInit(){this.subject.apply(["printer:xpc5000:print","printer:xpc4000:*","nas:timeCapsule,fritzbox:read"])}}var w=e.qb({encapsulation:0,styles:[[""]],data:{}});function x(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,3,"mat-card",[["class","mat-card"]],[[2,"_mat-animation-noopable",null]],null,null,t.d,t.a)),e.rb(1,49152,null,0,r.a,[[2,b.a]],null,null),(l()(),e.sb(2,0,null,0,1,"span",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Permission is 'printer:xpc4000:configure'"]))],null,function(l,n){l(n,0,0,"NoopAnimations"===e.Eb(n,1)._animationMode)})}function L(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,3,"mat-card",[["class","mat-card"]],[[2,"_mat-animation-noopable",null]],null,null,t.d,t.a)),e.rb(1,49152,null,0,r.a,[[2,b.a]],null,null),(l()(),e.sb(2,0,null,0,1,"span",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Permission is 'nas:timeCapsule:write'"]))],null,function(l,n){l(n,0,0,"NoopAnimations"===e.Eb(n,1)._animationMode)})}function v(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,66,"mat-tab-group",[["class","mat-tab-group"]],[[2,"mat-tab-group-dynamic-height",null],[2,"mat-tab-group-inverted-header",null]],null,null,a.c,a.b)),e.rb(1,3325952,null,1,o.f,[e.k,e.h,[2,o.a],[2,b.a]],null,null),e.Jb(603979776,1,{_tabs:1}),(l()(),e.sb(3,16777216,null,null,30,"mat-tab",[["label","Overview"]],null,null,null,a.d,a.a)),e.rb(4,770048,[[1,4]],2,o.c,[e.N],{textLabel:[0,"textLabel"]},null),e.Jb(603979776,2,{templateLabel:0}),e.Jb(335544320,3,{_explicitContent:0}),(l()(),e.sb(7,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.sb(8,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.sb(9,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Installation"])),(l()(),e.sb(11,0,null,0,2,"pre",[],null,null,null,null,null)),(l()(),e.sb(12,0,null,null,1,"code",[],[[2,"hljs",null],[8,"innerHTML",1]],null,null,null,null)),e.rb(13,540672,null,0,c.b,[c.c,e.x],{code:[0,"code"]},null),(l()(),e.sb(14,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.sb(15,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Usage"])),(l()(),e.sb(17,0,null,0,1,"h4",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Structural directives"])),(l()(),e.sb(19,0,null,0,2,"pre",[],null,null,null,null,null)),(l()(),e.sb(20,0,null,null,1,"code",[],[[2,"hljs",null],[8,"innerHTML",1]],null,null,null,null)),e.rb(21,540672,null,0,c.b,[c.c,e.x],{code:[0,"code"]},null),(l()(),e.sb(22,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.sb(23,0,null,0,1,"h4",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Pipes"])),(l()(),e.sb(25,0,null,0,2,"pre",[],null,null,null,null,null)),(l()(),e.sb(26,0,null,null,1,"code",[],[[2,"hljs",null],[8,"innerHTML",1]],null,null,null,null)),e.rb(27,540672,null,0,c.b,[c.c,e.x],{code:[0,"code"]},null),(l()(),e.sb(28,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.sb(29,0,null,0,1,"h4",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Pipes with poetry"])),(l()(),e.sb(31,0,null,0,2,"pre",[],null,null,null,null,null)),(l()(),e.sb(32,0,null,null,1,"code",[],[[2,"hljs",null],[8,"innerHTML",1]],null,null,null,null)),e.rb(33,540672,null,0,c.b,[c.c,e.x],{code:[0,"code"]},null),(l()(),e.sb(34,16777216,null,null,32,"mat-tab",[["label","Examples"]],null,null,null,a.d,a.a)),e.rb(35,770048,[[1,4]],2,o.c,[e.N],{textLabel:[0,"textLabel"]},null),e.Jb(603979776,4,{templateLabel:0}),e.Jb(335544320,5,{_explicitContent:0}),(l()(),e.sb(38,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.sb(39,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.sb(40,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Code"])),(l()(),e.sb(42,0,null,0,1,"h4",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Permissions"])),(l()(),e.sb(44,0,null,0,2,"pre",[],null,null,null,null,null)),(l()(),e.sb(45,0,null,null,1,"code",[],[[2,"hljs",null],[8,"innerHTML",1]],null,null,null,null)),e.rb(46,540672,null,0,c.b,[c.c,e.x],{code:[0,"code"]},null),(l()(),e.sb(47,0,null,0,1,"h4",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["In action"])),(l()(),e.sb(49,0,null,0,2,"pre",[],null,null,null,null,null)),(l()(),e.sb(50,0,null,null,1,"code",[],[[2,"hljs",null],[8,"innerHTML",1]],null,null,null,null)),e.rb(51,540672,null,0,c.b,[c.c,e.x],{code:[0,"code"]},null),(l()(),e.sb(52,0,null,0,2,"pre",[],null,null,null,null,null)),(l()(),e.sb(53,0,null,null,1,"code",[],[[2,"hljs",null],[8,"innerHTML",1]],null,null,null,null)),e.rb(54,540672,null,0,c.b,[c.c,e.x],{code:[0,"code"]},null),(l()(),e.sb(55,0,null,0,0,"br",[],null,null,null,null,null)),(l()(),e.sb(56,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Result"])),(l()(),e.sb(58,0,null,0,3,"mat-card",[["class","mat-card"]],[[2,"_mat-animation-noopable",null]],null,null,t.d,t.a)),e.rb(59,49152,null,0,r.a,[[2,b.a]],null,null),(l()(),e.sb(60,0,null,0,1,"span",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["This is card is always visible to all users."])),(l()(),e.hb(16777216,null,0,1,null,x)),e.rb(63,212992,null,0,p,[e.k,e.K,e.N,d.b],{isPermitted:[0,"isPermitted"]},null),(l()(),e.hb(16777216,null,0,2,null,L)),e.rb(65,16384,null,0,h.l,[e.N,e.K],{ngIf:[0,"ngIf"]},null),e.Gb(131072,m,[e.h,d.b])],function(l,n){var u=n.component;l(n,4,0,"Overview"),l(n,13,0,"npm install --save @ngx-security/permissions"),l(n,21,0,u.isPermittedDirective),l(n,27,0,u.isPermittedPipe),l(n,33,0,u.isPermittedPipePoetry),l(n,35,0,"Examples"),l(n,46,0,u.permissions),l(n,51,0,u.firstCard),l(n,54,0,u.secondCard),l(n,63,0,"printer:xpc4000:configure"),l(n,65,0,e.Mb(n,65,0,e.Eb(n,66).transform("user","nas:timeCapsule:write")))},function(l,n){l(n,0,0,e.Eb(n,1).dynamicHeight,"below"===e.Eb(n,1).headerPosition),l(n,12,0,!0,e.Eb(n,13).highlightedCode),l(n,20,0,!0,e.Eb(n,21).highlightedCode),l(n,26,0,!0,e.Eb(n,27).highlightedCode),l(n,32,0,!0,e.Eb(n,33).highlightedCode),l(n,45,0,!0,e.Eb(n,46).highlightedCode),l(n,50,0,!0,e.Eb(n,51).highlightedCode),l(n,53,0,!0,e.Eb(n,54).highlightedCode),l(n,58,0,"NoopAnimations"===e.Eb(n,59)._animationMode)})}function j(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,1,"app-permissions",[],null,null,null,v,w)),e.rb(1,114688,null,0,g,[d.b],null,null)],function(l,n){l(n,1,0)},null)}var E=e.ob("app-permissions",g,j,{},{},[]),y=u("POq0"),M=u("IP0z"),N=u("Xd0L"),I=u("cUpR"),V=u("zMNK"),H=u("/HVE"),J=u("5GAg"),R=u("Gi4r"),T=u("PCNd"),_=u("iInd");class O{}var k=u("OCPU");u.d(n,"PermissionsModuleNgFactory",function(){return z});var z=e.pb(s,[],function(l){return e.Bb([e.Cb(512,e.j,e.ab,[[8,[i.a,E]],[3,e.j],e.v]),e.Cb(4608,h.n,h.m,[e.s,[2,h.y]]),e.Cb(4608,y.c,y.c,[]),e.Cb(1073742336,h.c,h.c,[]),e.Cb(1073742336,M.a,M.a,[]),e.Cb(1073742336,N.j,N.j,[[2,N.c],[2,I.f]]),e.Cb(1073742336,V.d,V.d,[]),e.Cb(1073742336,H.b,H.b,[]),e.Cb(1073742336,N.u,N.u,[]),e.Cb(1073742336,y.d,y.d,[]),e.Cb(1073742336,J.a,J.a,[]),e.Cb(1073742336,o.j,o.j,[]),e.Cb(1073742336,r.f,r.f,[]),e.Cb(1073742336,R.c,R.c,[]),e.Cb(1073742336,c.d,c.d,[]),e.Cb(1073742336,T.a,T.a,[]),e.Cb(1073742336,_.n,_.n,[[2,_.s],[2,_.l]]),e.Cb(1073742336,O,O,[]),e.Cb(1073742336,k.a,k.a,[]),e.Cb(1073742336,s,s,[]),e.Cb(1024,_.j,function(){return[[{path:"",component:g}]]},[])])})}}]);