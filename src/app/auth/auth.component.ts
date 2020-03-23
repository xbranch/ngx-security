import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PasswordFlowService } from '../../../projects/auth/src/lib/service/password-flow/password-flow.service';
import { ImplicitFlowService } from '../../../projects/auth/src/lib/service/implicit-flow/implicit-flow.service';
import { AuthorizationCodeFlowService } from '../../../projects/auth/src/lib/service/authorization-code-flow/authorization-code-flow.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  constructor(private passwordFlowAuthService: PasswordFlowService, private implicitFlowAuthService: ImplicitFlowService,
              private codeFlowAuthService: AuthorizationCodeFlowService) {
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
