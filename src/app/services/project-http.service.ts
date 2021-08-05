import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProjectModel} from '../models';
import {catchError, map} from 'rxjs/operators';
import {ServerResponse} from '../models/server-response';
import {Handler} from '../Exceptions/handler';
import {environment} from '../../environments/environment';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpService {
  API_URL_PRIVATE: string = environment.API_URL_PRIVATE;
  API_URL_PUBLIC: string = environment.API_URL_PUBLIC;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {

  }

  getAll(): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + 'projects';
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getOne(id: number): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + 'projects/' + id;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  create(project: ProjectModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + 'projects';
    return this.httpClient.post<ServerResponse>(url, project).pipe(
      map(response => response),
      catchError(Handler.render)
    );
  }

  update(id: number | undefined, project: ProjectModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + 'projects/' + id;
    return this.httpClient.put<ServerResponse>(url, project).pipe(
      map(response => response),
      catchError(Handler.render)
    );
  }

  delete(id: number | undefined): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + 'projects/' + id;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => response),
      catchError(Handler.render)
    );
  }

  changeState(id: number, project: ProjectModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}projects/${id}/state`;
    return this.httpClient.patch<ServerResponse>(url, project).pipe(
      map(response => response),
      catchError(Handler.render)
    );
  }
}
