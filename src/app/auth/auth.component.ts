import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PasswordFlowAuthService } from '../../../projects/auth/src/lib/service/password-flow/password-flow-auth.service';
import { ImplicitFlowAuthService } from '../../../projects/auth/src/lib/service/implicit-flow/implicit-flow-auth.service';
import { AuthorizationCodeFlowAuthService } from '../../../projects/auth/src/lib/service/authorization-code-flow/authorization-code-flow-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  constructor(private passwordFlowAuthService: PasswordFlowAuthService, private implicitFlowAuthService: ImplicitFlowAuthService,
              private codeFlowAuthService: AuthorizationCodeFlowAuthService) {
  }

  ngOnInit(): void {
    this.implicitFlowAuthService
      .initialize()
      .subscribe(console.log, console.error);
    this.codeFlowAuthService
      .initialize()
      .subscribe(console.log, console.error);
  }

  passwordFlow(): void {
    this.passwordFlowAuthService
      .authenticate('test@example.com', 'T3st@example.com')
      .subscribe(console.log, console.error);
  }

  implicitFlow(): void {
    this.implicitFlowAuthService.authenticate();
  }

  authorizationCodeFlow(): void {
    this.codeFlowAuthService.authenticate();
  }
}
