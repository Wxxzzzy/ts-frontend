import { Component, Input, OnInit } from '@angular/core';
import {
  ETicketStatus,
  TaskOverview,
  TicketStatusIconsDict,
} from '../../../../../../shared';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() taskData: TaskOverview | null = null;

  public taskStatusIcon: string = '';
  constructor() {}

  ngOnInit() {
    if (this.taskData !== null) {
      const statusId = this.taskData.ticketStatus as ETicketStatus;
      this.taskStatusIcon = TicketStatusIconsDict[statusId];
    }
  }
}
