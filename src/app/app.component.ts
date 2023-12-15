import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  ) {}

  public get showSideBar() {
    return (
      this.authService.isLogged &&
      this.router.url !== '/' &&
      this.router.url !== '/sign-up'
    );
  }
}
