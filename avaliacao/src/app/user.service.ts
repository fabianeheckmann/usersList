import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'app-id': '64ed062d4340d2b2d45be2db',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<FormData> {
    return this.http.post<FormData>(
      `${this.apiUrl}/user/create`,
      user,
      this.httpOptions
    );
  }

  getUsers(
    page: number,
    limit: number
  ): Observable<{ data: User[]; total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ data: User[]; total: number }>(
      `${this.baseApiUrl}/user`,
      {
        headers: this.httpOptions.headers,
        params: params,
      }
    );
  }

  deleteUser(userId: string): Observable<void> {
    const url = `${this.baseApiUrl}/user/${userId}`;
    return this.http.delete<void>(url, this.httpOptions);
  }

  getUserById(userId: string): Observable<User> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<User>(url, this.httpOptions);
  }

  updateUser(userId: string, updatedUserData: User): Observable<void> {
    const url = `${this.baseApiUrl}/user/${userId}`;
    return this.http.put<void>(url, updatedUserData, this.httpOptions);
  }

  searchUsers(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(`${this.apiUrl}/searchUsers`, { params });
  }
}
