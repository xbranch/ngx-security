import{i as p,j as u,k as w}from"./chunk-GIZIOGLJ.js";import{h as v,i as S,r as b}from"./chunk-XOFVMEAK.js";import{Ab as h,Na as n,_ as c,ca as a,ga as m,oa as d,wa as e,xa as t,ya as i}from"./chunk-N7OEIV7C.js";import"./chunk-EQDQRRRY.js";var x=(()=>{class o{constructor(l,r,s){this.passwordFlowService=l,this.implicitFlowService=r,this.codeFlowService=s}ngOnInit(){this.implicitFlowService.initialize().subscribe(console.log,console.error),this.codeFlowService.initialize().subscribe(console.log,console.error)}passwordFlow(){this.passwordFlowService.authenticate("test@example.com","T3st@example.com").subscribe(console.log,console.error)}implicitFlow(){this.implicitFlowService.authenticate()}authorizationCodeFlow(){this.codeFlowService.authenticate()}static{this.\u0275fac=function(r){return new(r||o)(a(p),a(u),a(w))}}static{this.\u0275cmp=m({type:o,selectors:[["app-auth"]],decls:30,vars:2,consts:[["label","Overview"],[3,"highlight","language"],["label","Password flow"],["label","Implicit flow"],["label","Authorization code Flow"]],template:function(r,s){r&1&&(e(0,"mat-tab-group")(1,"mat-tab",0),i(2,"br")(3,"br"),e(4,"h2"),n(5,"Installation"),t(),e(6,"pre"),i(7,"code",1),t(),i(8,"br"),t(),e(9,"mat-tab",2),i(10,"br")(11,"br"),e(12,"h2"),n(13,"Overview"),t(),e(14,"pre"),n(15,`+----------+
| Resource |
|  Owner   |
|          |
+----------+
     v
     |    Resource Owner
    (A) Password Credentials
     |
     v
+---------+                                  +---------------+
|         |>--(B)---- Resource Owner ------->|               |
|         |         Password Credentials     | Authorization |
| Client  |                                  |     Server    |
|         |<--(C)---- Access Token ---------<|               |
|         |    (w/ Optional Refresh Token)   |               |
+---------+                                  +---------------+
    `),t()(),e(16,"mat-tab",3),i(17,"br")(18,"br"),e(19,"h2"),n(20,"Overview"),t(),e(21,"pre"),n(22,`+----------+
| Resource |
|  Owner   |
|          |
+----------+
     ^
     |
    (B)
+----|-----+          Client Identifier     +---------------+
|         -+----(A)-- & Redirection URI --->|               |
|  User-   |                                | Authorization |
|  Agent  -|----(B)-- User authenticates -->|     Server    |
|          |                                |               |
|          |<---(C)--- Redirection URI ----<|               |
|          |          with Access Token     +---------------+
|          |            in Fragment
|          |                                +---------------+
|          |----(D)--- Redirection URI ---->|   Web-Hosted  |
|          |          without Fragment      |     Client    |
|          |                                |    Resource   |
|     (F)  |<---(E)------- Script ---------<|               |
|          |                                +---------------+
+-|--------+
  |    |
 (A)  (G) Access Token
  |    |
  ^    v
+---------+
|         |
|  Client |
|         |
+---------+
    `),t()(),e(23,"mat-tab",4),i(24,"br")(25,"br"),e(26,"h2"),n(27,"Overview"),t(),e(28,"pre"),n(29,`+----------+
| Resource |
|   Owner  |
|          |
+----------+
     ^
     |
    (B)
+----|-----+          Client Identifier      +---------------+
|         -+----(A)-- & Redirection URI ---->|               |
|  User-   |                                 | Authorization |
|  Agent  -+----(B)-- User authenticates --->|     Server    |
|          |                                 |               |
|         -+----(C)-- Authorization Code ---<|               |
+-|----|---+                                 +---------------+
  |    |                                         ^      v
 (A)  (C)                                        |      |
  |    |                                         |      |
  ^    v                                         |      |
+---------+                                      |      |
|         |>---(D)-- Authorization Code ---------'      |
|  Client |          & Redirection URI                  |
|         |                                             |
|         |<---(E)----- Access Token -------------------'
+---------+       (w/ Optional Refresh Token)
    `),t()()()),r&2&&(c(7),d("highlight","npm install --save @ngx-security/core @ngx-security/auth")("language","bash"))},dependencies:[b,v,S,h],encapsulation:2,changeDetection:0})}}return o})();export{x as AuthComponent};
