(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{Yj9t:function(e,n,t){"use strict";t.r(n),t.d(n,"AuthModule",function(){return h});var i=t("PCNd"),r=t("tyNb"),o=t("RWdr"),c=t("Pv2G"),s=t("ngFo"),b=t("fXoL"),a=t("wZkO"),l=t("OtPg");const u=[{path:"",component:(()=>{class e{constructor(e,n,t){this.passwordFlowService=e,this.implicitFlowService=n,this.codeFlowService=t}ngOnInit(){this.implicitFlowService.initialize().subscribe(console.log,console.error),this.codeFlowService.initialize().subscribe(console.log,console.error)}passwordFlow(){this.passwordFlowService.authenticate("test@example.com","T3st@example.com").subscribe(console.log,console.error)}implicitFlow(){this.implicitFlowService.authenticate()}authorizationCodeFlow(){this.codeFlowService.authenticate()}}return e.\u0275fac=function(n){return new(n||e)(b.Jb(o.a),b.Jb(c.a),b.Jb(s.a))},e.\u0275cmp=b.Db({type:e,selectors:[["app-auth"]],decls:30,vars:1,consts:[["label","Overview"],[3,"highlight"],["label","Password flow"],["label","Implicit flow"],["label","Authorization code Flow"]],template:function(e,n){1&e&&(b.Ob(0,"mat-tab-group"),b.Ob(1,"mat-tab",0),b.Kb(2,"br"),b.Kb(3,"br"),b.Ob(4,"h2"),b.tc(5,"Installation"),b.Nb(),b.Ob(6,"pre"),b.Kb(7,"code",1),b.Nb(),b.Kb(8,"br"),b.Nb(),b.Ob(9,"mat-tab",2),b.Kb(10,"br"),b.Kb(11,"br"),b.Ob(12,"h2"),b.tc(13,"Overview"),b.Nb(),b.Ob(14,"pre"),b.tc(15,"+----------+\n| Resource |\n|  Owner   |\n|          |\n+----------+\n     v\n     |    Resource Owner\n    (A) Password Credentials\n     |\n     v\n+---------+                                  +---------------+\n|         |>--(B)---- Resource Owner -------\x3e|               |\n|         |         Password Credentials     | Authorization |\n| Client  |                                  |     Server    |\n|         |<--(C)---- Access Token ---------<|               |\n|         |    (w/ Optional Refresh Token)   |               |\n+---------+                                  +---------------+\n    "),b.Nb(),b.Nb(),b.Ob(16,"mat-tab",3),b.Kb(17,"br"),b.Kb(18,"br"),b.Ob(19,"h2"),b.tc(20,"Overview"),b.Nb(),b.Ob(21,"pre"),b.tc(22,"+----------+\n| Resource |\n|  Owner   |\n|          |\n+----------+\n     ^\n     |\n    (B)\n+----|-----+          Client Identifier     +---------------+\n|         -+----(A)-- & Redirection URI ---\x3e|               |\n|  User-   |                                | Authorization |\n|  Agent  -|----(B)-- User authenticates --\x3e|     Server    |\n|          |                                |               |\n|          |<---(C)--- Redirection URI ----<|               |\n|          |          with Access Token     +---------------+\n|          |            in Fragment\n|          |                                +---------------+\n|          |----(D)--- Redirection URI ----\x3e|   Web-Hosted  |\n|          |          without Fragment      |     Client    |\n|          |                                |    Resource   |\n|     (F)  |<---(E)------- Script ---------<|               |\n|          |                                +---------------+\n+-|--------+\n  |    |\n (A)  (G) Access Token\n  |    |\n  ^    v\n+---------+\n|         |\n|  Client |\n|         |\n+---------+\n    "),b.Nb(),b.Nb(),b.Ob(23,"mat-tab",4),b.Kb(24,"br"),b.Kb(25,"br"),b.Ob(26,"h2"),b.tc(27,"Overview"),b.Nb(),b.Ob(28,"pre"),b.tc(29,"+----------+\n| Resource |\n|   Owner  |\n|          |\n+----------+\n     ^\n     |\n    (B)\n+----|-----+          Client Identifier      +---------------+\n|         -+----(A)-- & Redirection URI ----\x3e|               |\n|  User-   |                                 | Authorization |\n|  Agent  -+----(B)-- User authenticates ---\x3e|     Server    |\n|          |                                 |               |\n|         -+----(C)-- Authorization Code ---<|               |\n+-|----|---+                                 +---------------+\n  |    |                                         ^      v\n (A)  (C)                                        |      |\n  |    |                                         |      |\n  ^    v                                         |      |\n+---------+                                      |      |\n|         |>---(D)-- Authorization Code ---------'      |\n|  Client |          & Redirection URI                  |\n|         |                                             |\n|         |<---(E)----- Access Token -------------------'\n+---------+       (w/ Optional Refresh Token)\n    "),b.Nb(),b.Nb(),b.Nb()),2&e&&(b.zb(7),b.dc("highlight","npm install --save @ngx-security/core @ngx-security/auth"))},directives:[a.b,a.a,l.b],styles:[""],changeDetection:0}),e})()}];let w=(()=>{class e{}return e.\u0275mod=b.Hb({type:e}),e.\u0275inj=b.Gb({factory:function(n){return new(n||e)},imports:[[r.f.forChild(u)],r.f]}),e})(),h=(()=>{class e{}return e.\u0275mod=b.Hb({type:e}),e.\u0275inj=b.Gb({factory:function(n){return new(n||e)},imports:[[i.a,w]]}),e})()}}]);