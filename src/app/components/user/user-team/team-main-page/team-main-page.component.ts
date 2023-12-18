import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-team-main-page',
  templateUrl: './team-main-page.component.html',
  styleUrls: ['./team-main-page.component.css'],
})
export class TeamMainPageComponent implements OnInit {
  public teamId: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.teamId = +params['teamId'];
    });
  }
}
