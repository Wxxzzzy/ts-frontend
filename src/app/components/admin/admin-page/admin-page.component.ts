import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../services';
import { AdminControlUser } from '../../../shared';

@UntilDestroy()
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  public users$ = new BehaviorSubject<AdminControlUser[]>([]);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUsers$();
  }

  public logout() {
    this.authService.logout().pipe(untilDestroyed(this)).subscribe();
  }

  public getUsers$() {
    this.authService
      .getAllUsers()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.users$.next(x);
      });
  }

  public blockOrUnblockUser(username: string, block: boolean) {
    this.authService
      .blockOrUnblockUser(username, block)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.getUsers$();
      });
  }
}
