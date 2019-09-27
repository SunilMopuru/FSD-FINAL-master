import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Project } from '../model/project-model';


const endPoint = `http://localhost:8080/project/`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) { }
    getAllProjects()
    {
        return this.http.get<Project[]>(endPoint+'getAllProject');        
    }
    addProject(project: Project)
    {
        return this.http.post(endPoint + 'addProject', JSON.stringify(project), httpOptions); 
    }

    updateProject(project: Project)
    {
        return this.http.put(endPoint + 'updateProject', JSON.stringify(project), httpOptions); 
    }

    suspendProject(projectId: number)
    {    
        return this.http.put(endPoint + 'suspendProject/'+projectId, httpOptions); 
    }
}