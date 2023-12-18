import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envDev } from '../../environments';
import { CommentOverview } from '../shared';
import { CreateCommentCommand } from '../shared/models/create-comment-command';
import { UpdateCommentCommand } from '../shared/models/update-comment-command';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly _baseUrl = `${envDev.baseUrl}/Comments`;

  constructor(private http: HttpClient) {}

  public get(ticketId: number): Observable<CommentOverview[]> {
    return this.http.get<CommentOverview[]>(`${this._baseUrl}/${ticketId}`);
  }

  public create(formData: CreateCommentCommand): Observable<void> {
    return this.http.post<void>(`${this._baseUrl}`, { formData });
  }

  public update(formData: UpdateCommentCommand): Observable<void> {
    return this.http.put<void>(`${this._baseUrl}`, { formData });
  }

  public delete(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/${commentId}`);
  }
}
