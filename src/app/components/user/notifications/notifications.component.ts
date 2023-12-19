import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { AuthService, TeamService } from '../../../services';
import { Notification } from '../../../shared';

@UntilDestroy()
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  public invites$ = new BehaviorSubject<Notification[]>([]);

  constructor(
    private authService: AuthService,
    private teamService: TeamService,
  ) {}

  ngOnInit() {
    this.setupItemsLoading$();
  }

  private setupItemsLoading$() {
    const userId = Number(localStorage.getItem('user_id'));

    this.authService
      .getUncheckedInvitations(userId)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.invites$.next(x);
      });
  }

  decline(invite: Notification) {
    this.teamService
      .decline(invite.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.setupItemsLoading$();
      });
  }

  accept(invite: Notification) {
    this.teamService
      .acceptInvite(invite.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.setupItemsLoading$();
      });
  }
}
