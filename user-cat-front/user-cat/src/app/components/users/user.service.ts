import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:1010'

    constructor(private http: HttpClient) { }

    updateDetails(){
        return this.http.put(`${this.baseUrl}/api/update-user/:id`,{}).subscribe()
    }
    deleteUser(){
        return this.http.delete(`${this.baseUrl}/api/delete-user/:id`,{}).subscribe();
    }
}
