import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://dummyapi.io/data/v1';
  private token = '6630e25ac7ec1fee3a5d2d61';

  private isRequesting = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'app-id': this.token
    });
  }

  getUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/user`, { headers });
  }

  getUserById(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  createUser(userData: any): Observable<any> {
    const headers = this.getHeaders();
    this.isRequesting.next(true);
    return this.http.post<any>(`${this.apiUrl}/user/create`, userData, { headers }).pipe(
      tap((data) => console.log('Usuário criado com sucesso:', data)),
      catchError((error) => {
        console.error('Erro ao criar usuário:', error);
        throw error;
      }),
      finalize(() => this.isRequesting.next(false))
    );
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const headers = this.getHeaders();
    this.isRequesting.next(true);
    return this.http.put<any>(`${this.apiUrl}/user/${userId}`, userData, { headers }).pipe(
      tap((data) => console.log('Usuário atualizado com sucesso:', data)),
      catchError((error) => {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
      }),
      finalize(() => this.isRequesting.next(false))
    );
  }

  deleteUser(userId: string): Observable<any> {
    const headers = this.getHeaders();
    this.isRequesting.next(true);
    return this.http.delete<any>(`${this.apiUrl}/user/${userId}`, { headers }).pipe(
      tap((data) => console.log('Usuário deletado com sucesso:', data)),
      catchError((error) => {
        console.error('Erro ao deletar usuário:', error);
        throw error;
      }),
      finalize(() => this.isRequesting.next(false))
    );
  }

  getIsRequesting(): Observable<boolean> {
    return this.isRequesting.asObservable();
  }
}
