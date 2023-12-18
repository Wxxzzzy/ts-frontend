import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, tap } from 'rxjs';
import { TaskService } from '../../../../../../services';
import {
  ETicketStatus,
  TaskOverview,
  UpdateTicketCommand,
} from '../../../../../../shared';

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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.setupItemsLoading$();
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

  protected readonly ETicketStatus = ETicketStatus;
}
