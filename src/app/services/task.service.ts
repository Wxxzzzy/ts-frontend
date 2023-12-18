import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envDev } from '../../environments';
import {
  CreateTicketCommand,
  TaskOverview,
  UpdateTicketCommand,
} from '../shared';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _baseUrl = `${envDev.baseUrl}/tickets`;

  constructor(private http: HttpClient) {}

  public getByTeam(teamId: number): Observable<TaskOverview[]> {
    return this.http.get<TaskOverview[]>(
      `${this._baseUrl}/${teamId}/team-tickets`,
    );
  }

  public getByUserAndTeam(teamId: number, userId: number) {
    return this.http.get<TaskOverview[]>(
      `${this._baseUrl}/${userId}/${teamId}/user-tickets`,
    );
  }

  public getTicketInfo(taskId: number): Observable<TaskOverview> {
    return this.http.get<TaskOverview>(`${this._baseUrl}/${taskId}`);
  }

  public create(formData: CreateTicketCommand): Observable<void> {
    const TicketTitle = formData.ticketTitle;
    const ShortDescription = formData.shortDescription ?? 'no description';
    const ticketStatus = formData.ticketStatus ?? 1;
    const teamId = formData.teamId;
    const assignedToId = formData.assignedTo;

    const body = {
      TicketTitle,
      ShortDescription,
      ticketStatus,
      teamId,
      assignedToId,
    };

    return this.http.post<void>(`${this._baseUrl}`, body);
  }

  public update(formData: UpdateTicketCommand): Observable<void> {
    const id = formData.id;
    const ticketStatus = formData.ticketStatus;
    const teamId = formData.teamId;
    const assignedToId = formData.assignedToId;
    const ShortDescription = formData.shortDescription;
    const TicketTitle = formData.ticketTitle;

    const body = {
      id,
      ticketStatus,
      teamId,
      assignedToId,
      ShortDescription,
      TicketTitle,
    };
    return this.http.put<void>(`${this._baseUrl}`, body);
  }

  public delete(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/${taskId}`);
  }
}
