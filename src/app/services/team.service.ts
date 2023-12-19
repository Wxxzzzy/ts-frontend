import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envDev } from '../../environments';
import { KeyValues, TeamOverview } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly _baseUrl = `${envDev.baseUrl}/Teams`;

  constructor(private http: HttpClient) {}

  public getTeams(): Observable<TeamOverview[]> {
    return this.http.get<TeamOverview[]>(`${this._baseUrl}/my-teams`);
  }

  public getTeamInfo(teamId: number): Observable<TeamOverview> {
    return this.http.get<TeamOverview>(`${this._baseUrl}/${teamId}`);
  }

  public getTeamMembers(teamId: number): Observable<KeyValues[]> {
    return this.http.get<KeyValues[]>(`${this._baseUrl}/${teamId}/members`);
  }

  public createTeam(teamName: string): Observable<void> {
    return this.http.post<void>(`${this._baseUrl}`, { teamName });
  }

  public addMember(teamId: number, userId: number): Observable<void> {
    return this.http.put<void>(`${this._baseUrl}/members`, { teamId, userId });
  }

  public deleteTeam(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/${teamId}`);
  }

  public invite(
    userId: number,
    teamId: number,
    message: string,
  ): Observable<void> {
    return this.http.post<void>(`${this._baseUrl}/invite`, {
      userId,
      teamId,
      message,
    });
  }

  public acceptInvite(inviteId: number) {
    return this.http.delete<void>(`${this._baseUrl}/invite/${inviteId}`);
  }

  public decline(inviteId: number) {
    return this.http.delete<void>(
      `${this._baseUrl}/invite/${inviteId}/decline`,
    );
  }

  public getFreeUsers(teamId: number) {
    return this.http.get<KeyValues[]>(`${this._baseUrl}/${teamId}/not-in-team`);
  }
}
