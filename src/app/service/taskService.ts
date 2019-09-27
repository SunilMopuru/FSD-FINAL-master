import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Task, ParentTask } from '../model/task-model';


const endPoint = `http://localhost:8080/task/`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  private extractDate(res: Response){
    let body = res;
    return body || {};
  }

  addTask(task: Task)
  {
      return this.http.post(endPoint + 'addTask', JSON.stringify(task), httpOptions);      
  }

  addParentTask(parentTask: ParentTask)
  {
    return this.http.post(endPoint + 'addParentTask', JSON.stringify(parentTask), httpOptions);

  }
  getTaskById(taskId)
  {
    return this.http.get<Task>(endPoint+'getTask/'+taskId);
  }

  getAllTask()
  {
    return this.http.get<Task[]>(endPoint+'getAllTask');
  }
  getTaskByProjectId(projectId)
  {
    return this.http.get<Task[]>(endPoint+'getTaskByProjectId/'+projectId);
  }
  
  getAllParentTask()
  {
    return this.http.get<ParentTask[]>(endPoint+'getAllParentTask');
  }

  closeTask(task)
  {    
    return this.http.put(endPoint + 'closeTask', JSON.stringify(task) , httpOptions);
  }

  updateTask(task)
  {    
    return this.http.put(endPoint + 'updateTask', JSON.stringify(task) , httpOptions);
  }

}
