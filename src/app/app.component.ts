import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { TaskService } from './service/taskService';
import { Task } from './model/task-model';
import { ParentTask } from './model/task-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'taskmanagement-app';
  allTasks: Task[] = [];
  allParentTask: ParentTask[];
  constructor(
    private taskService: TaskService
  ){

  }
  ngOnInit() {
    this.initializeTask();
  }

  private initializeTask()
  {
    this.taskService.getAllTask().pipe(first()).subscribe(tasks =>
      {
        this.allTasks = tasks
        localStorage.setItem('task',JSON.stringify(this.allTasks));
      });
      this.taskService.getAllParentTask().pipe(first()).subscribe(parentTasks =>
      {
          this.allParentTask = parentTasks
          localStorage.setItem('parentTask',JSON.stringify(this.allParentTask));
      });
  }
}
