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
import { AuthService, ClientNotificationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'team-sync';

  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationsService: ClientNotificationService,
  ) {
    ClarityIcons.addIcons(
      usersIcon,
      plusIcon,
      bellIcon,
      bugIcon,
      fileGroupIcon,
      successStandardIcon,
    );

    notificationsService.startConnection();
    notificationsService.addInviteListener();
  }

  public logout() {
    this.authService.logout().pipe(first()).subscribe();
  }

  public get isAuthPage() {
    return this.router.url === '/' || this.router.url === '/sign-up';
  }

  public get isAdmin() {
    return this.authService.userRoleId === 1;
  }

  public get showSideBar() {
    return !this.isAuthPage && this.authService.isLogged;
  }
}
