import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { TeamService } from '../../../services/team.service';
import { TeamOverview } from '../../../shared';

@UntilDestroy()
@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.css'],
})
export class UserTeamsComponent implements OnInit {
  public myTeams$ = new Subject<TeamOverview[]>();

  constructor(private teamService: TeamService) {}

  //TODO: interceptor for tokens
  ngOnInit() {
    this.setupItemsLoading$();
  }

  public setupItemsLoading$() {
    this.teamService
      .getTeams()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.myTeams$.next(x);
      });
  }
}
