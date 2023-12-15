import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { ERole } from '../../shared';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  constructor(private authService: AuthService) {}

  // TODO: Get rid of this
  public get isAdmin() {
    const userRole = this.authService.userRoleId as ERole;
    return this.authService.userRoleId === ERole.Admin;
  }
}
