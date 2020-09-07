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

  constructor(private passwordFlowService: PasswordFlowService, private implicitFlowService: ImplicitFlowService,
              private codeFlowService: AuthorizationCodeFlowService) {
  }

  ngOnInit(): void {
    this.implicitFlowService
      .initialize()
      .subscribe(console.log, console.error);
    this.codeFlowService
      .initialize()
      .subscribe(console.log, console.error);
  }

  passwordFlow(): void {
    this.passwordFlowService
      .authenticate('test@example.com', 'T3st@example.com')
      .subscribe(console.log, console.error);
  }

  implicitFlow(): void {
    this.implicitFlowService.authenticate();
  }

  authorizationCodeFlow(): void {
    this.codeFlowService.authenticate();
  }
}
