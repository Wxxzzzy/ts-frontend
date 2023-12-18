import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  bellIcon,
  bugIcon,
  ClarityIcons,
  fileGroupIcon,
  plusIcon,
  successStandardIcon,
  usersIcon,
} from '@cds/core/icon';
import { first } from 'rxjs';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'team-sync';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    ClarityIcons.addIcons(
      usersIcon,
      plusIcon,
      bellIcon,
      bugIcon,
      fileGroupIcon,
      successStandardIcon,
    );
  }

  public logout() {
    this.authService.logout().pipe(first()).subscribe();
  }

  public get isAuthPage() {
    return this.router.url === '/' || this.router.url === '/sign-up';
  }

  public get showSideBar() {
    return !this.isAuthPage && this.authService.isLogged;
  }
}
