import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'// Especifica un scope a nivel global, se puede especificar un módulo específico
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user): Observable<string> {
    return this.http
      .post<UserResponse>(environment.endpoint.register, user)
      .pipe(
        retry(2),
        map(response => {
          return response.fullName;
        })
      );
  }
}

interface UserResponse {
  fullName: string;
  email: string;
  id: number;
}
