import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TeamService } from '../../../services';

interface CreateTeamFg {
  teamName: FormControl<string>;
}

@UntilDestroy()
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent {
  @Input() showDialog = true;

  public form: FormGroup<CreateTeamFg>;
  public teamNameCtrl: FormControl<any>;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router,
  ) {
    this.teamNameCtrl = this.fb.control<string>('', [Validators.required]);
    this.form = this.fb.group<CreateTeamFg>(<CreateTeamFg>{
      teamName: this.teamNameCtrl,
    });

    this.form.markAllAsTouched();
  }

  public close() {
    this.showDialog = false;
    this.router.navigate(['/user-page/my-teams']);
    this.showDialog = true;
  }

  public createTeam() {
    const title = this.form.controls.teamName.value;

    this.teamService
      .createTeam(title)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.showDialog = false;
        this.router.navigate(['/user-page/my-teams']);
        this.showDialog = true;
      });
  }
}
