"use strict";(self.webpackChunkngx_security=self.webpackChunkngx_security||[]).push([[937],{7937:(w,r,t)=>{t.r(r),t.d(r,{AuthModule:()=>m});var l=t(6208),s=t(9810),n=t(5879),h=t(8517),u=t(2473),d=t(2423),c=t(4104),v=t(7326);const g=[{path:"",component:(()=>{class e{constructor(o,i,a){this.passwordFlowService=o,this.implicitFlowService=i,this.codeFlowService=a}ngOnInit(){this.implicitFlowService.initialize().subscribe(console.log,console.error),this.codeFlowService.initialize().subscribe(console.log,console.error)}passwordFlow(){this.passwordFlowService.authenticate("test@example.com","T3st@example.com").subscribe(console.log,console.error)}implicitFlow(){this.implicitFlowService.authenticate()}authorizationCodeFlow(){this.codeFlowService.authenticate()}static#n=this.\u0275fac=function(i){return new(i||e)(n.Y36(h.Y),n.Y36(u.r),n.Y36(d.P))};static#e=this.\u0275cmp=n.Xpm({type:e,selectors:[["app-auth"]],decls:30,vars:1,consts:[["label","Overview"],[3,"highlight"],["label","Password flow"],["label","Implicit flow"],["label","Authorization code Flow"]],template:function(i,a){1&i&&(n.TgZ(0,"mat-tab-group")(1,"mat-tab",0),n._UZ(2,"br")(3,"br"),n.TgZ(4,"h2"),n._uU(5,"Installation"),n.qZA(),n.TgZ(6,"pre"),n._UZ(7,"code",1),n.qZA(),n._UZ(8,"br"),n.qZA(),n.TgZ(9,"mat-tab",2),n._UZ(10,"br")(11,"br"),n.TgZ(12,"h2"),n._uU(13,"Overview"),n.qZA(),n.TgZ(14,"pre"),n._uU(15,"+----------+\n| Resource |\n|  Owner   |\n|          |\n+----------+\n     v\n     |    Resource Owner\n    (A) Password Credentials\n     |\n     v\n+---------+                                  +---------------+\n|         |>--(B)---- Resource Owner -------\x3e|               |\n|         |         Password Credentials     | Authorization |\n| Client  |                                  |     Server    |\n|         |<--(C)---- Access Token ---------<|               |\n|         |    (w/ Optional Refresh Token)   |               |\n+---------+                                  +---------------+\n    "),n.qZA()(),n.TgZ(16,"mat-tab",3),n._UZ(17,"br")(18,"br"),n.TgZ(19,"h2"),n._uU(20,"Overview"),n.qZA(),n.TgZ(21,"pre"),n._uU(22,"+----------+\n| Resource |\n|  Owner   |\n|          |\n+----------+\n     ^\n     |\n    (B)\n+----|-----+          Client Identifier     +---------------+\n|         -+----(A)-- & Redirection URI ---\x3e|               |\n|  User-   |                                | Authorization |\n|  Agent  -|----(B)-- User authenticates --\x3e|     Server    |\n|          |                                |               |\n|          |<---(C)--- Redirection URI ----<|               |\n|          |          with Access Token     +---------------+\n|          |            in Fragment\n|          |                                +---------------+\n|          |----(D)--- Redirection URI ----\x3e|   Web-Hosted  |\n|          |          without Fragment      |     Client    |\n|          |                                |    Resource   |\n|     (F)  |<---(E)------- Script ---------<|               |\n|          |                                +---------------+\n+-|--------+\n  |    |\n (A)  (G) Access Token\n  |    |\n  ^    v\n+---------+\n|         |\n|  Client |\n|         |\n+---------+\n    "),n.qZA()(),n.TgZ(23,"mat-tab",4),n._UZ(24,"br")(25,"br"),n.TgZ(26,"h2"),n._uU(27,"Overview"),n.qZA(),n.TgZ(28,"pre"),n._uU(29,"+----------+\n| Resource |\n|   Owner  |\n|          |\n+----------+\n     ^\n     |\n    (B)\n+----|-----+          Client Identifier      +---------------+\n|         -+----(A)-- & Redirection URI ----\x3e|               |\n|  User-   |                                 | Authorization |\n|  Agent  -+----(B)-- User authenticates ---\x3e|     Server    |\n|          |                                 |               |\n|         -+----(C)-- Authorization Code ---<|               |\n+-|----|---+                                 +---------------+\n  |    |                                         ^      v\n (A)  (C)                                        |      |\n  |    |                                         |      |\n  ^    v                                         |      |\n+---------+                                      |      |\n|         |>---(D)-- Authorization Code ---------'      |\n|  Client |          & Redirection URI                  |\n|         |                                             |\n|         |<---(E)----- Access Token -------------------'\n+---------+       (w/ Optional Refresh Token)\n    "),n.qZA()()()),2&i&&(n.xp6(7),n.Q6J("highlight","npm install --save @ngx-security/core @ngx-security/auth"))},dependencies:[c.uX,c.SP,v.y$],changeDetection:0})}return e})()}];let A=(()=>{class e{static#n=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=n.oAB({type:e});static#t=this.\u0275inj=n.cJS({imports:[s.Bz.forChild(g),s.Bz]})}return e})(),m=(()=>{class e{static#n=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=n.oAB({type:e});static#t=this.\u0275inj=n.cJS({imports:[l.m,A]})}return e})()}}]);