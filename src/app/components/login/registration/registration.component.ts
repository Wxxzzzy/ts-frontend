import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '../../../services';
import { RegistrationCredentials } from '../../../shared';

interface SignUpFg {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@UntilDestroy()
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  form: FormGroup<SignUpFg>;
  usernameCtrl: FormControl<any>;
  passwordCtrl: FormControl<any>;
  emailCtrl: FormControl<any>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.usernameCtrl = this.fb.control<string>('', [Validators.required]);
    this.passwordCtrl = this.fb.control<string>('', [Validators.required]);
    this.emailCtrl = this.fb.control<string>('', [Validators.required]);
    this.form = this.fb.group<SignUpFg>(<SignUpFg>{
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      email: this.emailCtrl,
    });

    this.form.markAllAsTouched();
  }

  public back(): void {
    this.router.navigate(['']);
  }

  public signUp() {
    const data = this.form.getRawValue() as RegistrationCredentials;
    this.authService.register(data).subscribe();
  }
}
