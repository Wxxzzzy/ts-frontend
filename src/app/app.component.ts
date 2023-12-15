import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bellIcon, ClarityIcons, plusIcon, usersIcon } from '@cds/core/icon';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'team-sync';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    ClarityIcons.addIcons(usersIcon, plusIcon, bellIcon);
  }

  ngOnInit() {
    ClarityIcons.addIcons();
  }

  public get showSideBar() {
    return (
      this.authService.isLogged &&
      this.router.url !== '/' &&
      this.router.url !== '/sign-up'
    );
  }
}
