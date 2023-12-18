import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, first, tap } from 'rxjs';
import { TaskService, TeamService } from '../../../../../../services';
import {
  CreateTicketCommand,
  ETicketStatus,
  KeyValues,
  TaskOverview,
  UpdateTicketCommand,
} from '../../../../../../shared';

interface CreateTaskFg {
  ticketTitle: FormControl<string>;
  shortDescription?: FormControl<string>;
  ticketStatus?: FormControl<string>;
  assignedTo?: FormControl<string>;
}

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() teamId: number = 0;

  private allTasks = new BehaviorSubject<TaskOverview[]>([]);

  public inProgressTasks$ = new BehaviorSubject<TaskOverview[]>([]);
  public openTasks$ = new BehaviorSubject<TaskOverview[]>([]);
  public resolvedTasks$ = new BehaviorSubject<TaskOverview[]>([]);
  public users$ = new BehaviorSubject<string[]>([]);
  public usersKeyValues$ = new BehaviorSubject<KeyValues[]>([]);

  public creationWindow = false;

  public taskCreationForm: FormGroup<CreateTaskFg>;

  constructor(
    private taskService: TaskService,
    private teamService: TeamService,
    private fb: FormBuilder,
  ) {
    this.taskCreationForm = this.fb.group<CreateTaskFg>(<CreateTaskFg>{
      ticketTitle: this.fb.control('', [Validators.required]),
      shortDescription: this.fb.control('', [
        Validators.required,
        Validators.maxLength(1024),
      ]),
      ticketStatus: this.fb.control(''),
      assignedTo: this.fb.control(''),
    });
  }

  ngOnInit() {
    this.setupItemsLoading$();
    this.getUsers();
  }

  public getUsers() {
    this.teamService
      .getTeamInfo(this.teamId)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.users$.next(x.teamMembers);
      });
  }

  public drop(event: CdkDragDrop<TaskOverview[]>) {
    const newTask = { ...event.item.data };
    const data = newTask as UpdateTicketCommand;
    data.ticketStatus = this.getStatus(event.container.id) as number;

    this.taskService
      .update(data)
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.setupItemsLoading$();
        }),
      )
      .subscribe();
  }

  private setupItemsLoading$() {
    this.taskService
      .getByTeam(this.teamId)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.allTasks.next(x);

        const inProgressTasks = this.filterTasksByStatus(
          x,
          ETicketStatus.InProgress,
        );
        const openTasks = this.filterTasksByStatus(x, ETicketStatus.Open);
        const resolvedTasks = this.filterTasksByStatus(
          x,
          ETicketStatus.Resolved,
        );

        this.inProgressTasks$.next(inProgressTasks);
        this.openTasks$.next(openTasks);
        this.resolvedTasks$.next(resolvedTasks);
      });
  }

  private filterTasksByStatus(data: TaskOverview[], status: ETicketStatus) {
    const statusId = status as number;
    return data.filter((x) => x.ticketStatus === statusId);
  }

  private getStatus(status: string) {
    let result: ETicketStatus;
    switch (status) {
      case 'Open':
        result = ETicketStatus.Open;
        break;
      case 'In Progress':
        result = ETicketStatus.InProgress;
        break;
      default:
        result = ETicketStatus.Resolved;
        break;
    }

    return result;
  }

  private getTeamMembers() {
    this.teamService
      .getTeamMembers(this.teamId)
      .pipe(first())
      .subscribe((x) => {
        this.usersKeyValues$.next(x);
      });
  }

  public openCreationWindow() {
    this.getTeamMembers();
    this.creationWindow = true;
  }

  public closeCreationWindow() {
    this.creationWindow = false;
  }

  public createTask() {
    const assignedTo = this.taskCreationForm.controls.assignedTo?.value;
    const assignedToId = this.usersKeyValues$.value.filter(
      (x) => x.value === assignedTo,
    )[0].id;

    const status = this.getStatus(
      this.taskCreationForm.controls.ticketStatus?.value ?? 'Open',
    );

    const data: CreateTicketCommand = {
      ticketTitle: this.taskCreationForm.controls.ticketTitle.value,
      assignedTo: assignedToId,
      ticketStatus: status,
      shortDescription:
        this.taskCreationForm.controls.shortDescription?.value ??
        'no description',
      teamId: this.teamId,
    };
    this.taskService
      .create(data)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.closeCreationWindow();
      });
    this.setupItemsLoading$();
  }
}
