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
}
