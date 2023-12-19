import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import {
  CommentService,
  TaskService,
  TeamService,
} from '../../../../../../services';
import {
  CommentOverview,
  CreateCommentCommand,
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

interface CreateCommentFg {
  content: FormControl<string>;
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
  public commentCreator = false;

  public updateForm: FormGroup<TaskDetailsFg>;
  public commentForm: FormGroup<CreateCommentFg>;

  public users$ = new BehaviorSubject<KeyValues[]>([]);
  public comments$ = new BehaviorSubject<CommentOverview[]>([]);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private teamService: TeamService,
    private comments: CommentService,
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

    this.commentForm = this.fb.group<CreateCommentFg>(<CreateCommentFg>{
      content: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.taskData !== null) {
      const statusId = this.taskData.ticketStatus as ETicketStatus;
      this.taskStatusIcon = TicketStatusIconsDict[statusId];
      this.taskStatusString = TicketStatusDictionary[statusId];
      this.patchControls();
      this.getComments$();
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

  private getComments$() {
    if (this.taskData !== null) {
      this.comments
        .get(this.taskData?.id)
        .pipe(untilDestroyed(this))
        .subscribe((x) => {
          this.comments$.next(x);
        });
    }
  }

  public openCommentCreator() {
    this.commentCreator = true;
  }

  public closeCommentCreator() {
    this.commentCreator = false;
  }

  public addComment() {
    if (this.taskData !== null) {
      const content = this.commentForm.controls.content.value;

      const data: CreateCommentCommand = {
        ticketId: this.taskData.id,
        content: content,
      };

      this.comments
        .create(data)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.closeCommentCreator();
          this.getComments$();
        });
    }
  }

  public deleteComment(id: number) {
    this.comments
      .delete(id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.getComments$();
      });
  }
}
