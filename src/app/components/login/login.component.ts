import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../../services';
import { Credentials } from '../../shared/models';

interface LoginFg {
  username: FormControl<string>;
  password: FormControl<string>;
}

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup<LoginFg>;
  usernameCtrl: FormControl<any>;
  passwordCtrl: FormControl<any>;

  // TODO: can set null for any datatype of ctrl
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.usernameCtrl = this.fb.control<string>('', [Validators.required]);
    this.passwordCtrl = this.fb.control<string>('', [Validators.required]);
    this.form = this.fb.group<LoginFg>(<LoginFg>{
      username: this.usernameCtrl,
      password: this.passwordCtrl,
    });

    this.form.markAsPristine();
  }

  public login() {
    const data: Credentials = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    };
    this.authService.login(data).pipe(untilDestroyed(this)).subscribe();
  }
}
