import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { TeamService } from '../../../../../../services';
import { TeamOverview } from '../../../../../../shared';

@UntilDestroy()
@Component({
  selector: 'app-right-side-menu',
  templateUrl: './right-side-menu.component.html',
  styleUrls: ['./right-side-menu.component.css'],
})
export class RightSideMenuComponent implements OnInit {
  @Input() teamId: number = 0;

  public teamInfo$ = new BehaviorSubject<TeamOverview | null>(null);
  public teamMembers$ = new BehaviorSubject<string[]>([]);

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.teamService
      .getTeamInfo(this.teamId)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.teamInfo$.next(x);
        this.teamMembers$.next(x.teamMembers);
      });
  }
}
