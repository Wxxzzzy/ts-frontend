import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envDev } from '../../environments';
import { TeamOverview } from '../shared';

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

  public getTeamMembers(
    teamId: number,
  ): Observable<KeyValue<number, string>[]> {
    return this.http.get<KeyValue<number, string>[]>(
      `${this._baseUrl}/${teamId}/members`,
    );
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
}
