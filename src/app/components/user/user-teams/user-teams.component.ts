import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { TeamService } from '../../../services/team.service';
import { TeamOverview } from '../../../shared';

@UntilDestroy()
@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss'],
})
export class UserTeamsComponent implements OnInit {
  public myTeams$ = new BehaviorSubject<TeamOverview[]>([]);

  constructor(private teamService: TeamService) {}

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

  public openTeam(id: number) {}

  public deleteTeam(id: number) {
    this.teamService
      .deleteTeam(id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.setupItemsLoading$();
      });
  }
}
