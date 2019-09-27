import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from '../model/user-model';

const endPoint = `http://localhost:8080/user/`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }
    getAllUser()
    {
        return this.http.get<User[]>(endPoint+'getAllUser');        
    }
    addUser(user: User)
    {
        return this.http.post(endPoint + 'addUser', JSON.stringify(user), httpOptions); 
    }

    updateUser(user: User)
    {
        return this.http.put(endPoint + 'updateUser', JSON.stringify(user), httpOptions); 
    }

    deleteUser(userId: number)
    {
        return this.http.delete(endPoint + 'deleteUser/'+userId, httpOptions); 
    }
}