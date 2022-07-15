import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/' 
  httpOptions ={
    headers : new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http:HttpClient) { }
  register(formValue:
    {
      name:string,
      email:string,
      password:string,
      confirmPassword:string
    }):Observable<any>{
      return this.http.post<any>(this.url+'register' , formValue , this.httpOptions);
    }
}
