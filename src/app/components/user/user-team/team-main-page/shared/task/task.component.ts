import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { TaskService, TeamService } from '../../../../../../services';
import {
  ETicketStatus,
  KeyValues,
  TaskOverview,
  TicketStatusDictionary,
  TicketStatusIconsDict,
  UpdateTicketCommand,
} from '../../../../../../shared';

interface TaskDetailsFg {
  ticketTitle: FormControl<string>;
  ticketStatus: FormControl<string>;
  shortDescription: FormControl<string>;
  assignedToId: FormControl<string>;
  creatorName: FormControl<string>;
}

@UntilDestroy()
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() taskData: TaskOverview | null = null;

  public taskStatusIcon: string = '';
  public modalOpen = false;
  public taskStatusString: string = '';

  public updateForm: FormGroup<TaskDetailsFg>;

  public users$ = new BehaviorSubject<KeyValues[]>([]);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private teamService: TeamService,
    private router: Router,
  ) {
    this.updateForm = this.fb.group<TaskDetailsFg>(<TaskDetailsFg>{
      creatorName: this.fb.control('', [Validators.required]),
      assignedToId: this.fb.control('', [Validators.required]),
      shortDescription: this.fb.control('', [
        Validators.required,
        Validators.maxLength(1024),
      ]),
      ticketStatus: this.fb.control('', [Validators.required]),
      ticketTitle: this.fb.control('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.updateForm.enable();
    this.updateForm.controls.ticketTitle.disable({ emitEvent: false });
    this.updateForm.controls.ticketStatus.disable({ emitEvent: false });
    this.updateForm.controls.creatorName.disable({ emitEvent: false });
    this.updateForm.markAllAsTouched();
  }

  ngOnInit() {
    if (this.taskData !== null) {
      const statusId = this.taskData.ticketStatus as ETicketStatus;
      this.taskStatusIcon = TicketStatusIconsDict[statusId];
      this.taskStatusString = TicketStatusDictionary[statusId];
      this.patchControls();
    }
  }

  private patchControls() {
    if (this.taskData !== null) {
      this.updateForm.controls.ticketTitle.patchValue(
        this.taskData.ticketTitle,
      );
      this.updateForm.controls.ticketStatus.patchValue(this.taskStatusString);
      this.updateForm.controls.creatorName.patchValue(
        this.taskData.creatorName,
      );
      this.updateForm.controls.shortDescription.patchValue(
        this.taskData.shortDescription,
      );
      this.updateForm.controls.assignedToId.patchValue(
        this.taskData.assignedToName ?? '',
      );
    }
  }

  public openDetails() {
    this.getTeamUsers();
    this.modalOpen = true;
  }

  public closeDetails() {
    this.modalOpen = false;
  }

  public save() {
    if (this.taskData !== null) {
      const id = this.users$.value.filter(
        (x) => x.value === this.updateForm.controls.assignedToId.value,
      )[0].id;

      const data: UpdateTicketCommand = {
        id: this.taskData.id,
        teamId: this.taskData.teamId,
        ticketTitle: this.taskData.ticketTitle,
        ticketStatus: this.taskData.ticketStatus,
        shortDescription: this.updateForm.controls.shortDescription.value,
        assignedToId: id,
      };

      this.taskService
        .update(data)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.closeDetails();
        });
    }
  }

  public getTeamUsers() {
    if (this.taskData !== null) {
      this.teamService
        .getTeamMembers(this.taskData.teamId)
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.users$.next(x);
        });
    }
  }

  public delete() {
    if (this.taskData !== null) {
      this.taskService
        .delete(this.taskData.id)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.closeDetails();
        });
    }
  }
}
