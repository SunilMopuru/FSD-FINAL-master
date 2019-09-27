import { Router  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder }  from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';


import { TaskService } from '../service/taskService';
import { ProjectService } from '../service/projectService';
import { Task , ParentTask } from '../model/task-model';
import { Project } from '../model/project-model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  allTasks: Task[] = [];
  allParentTask: Array<ParentTask> =new Array<ParentTask>();
  projectList: Array<Project> = new Array<Project>();
  viewTaskForm: FormGroup;
  public projectName: string;
  selectedProject: Project;
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrManager: ToastrManager

  ) { }

  ngOnInit() {
    this.viewTaskForm = this.formBuilder.group({        
      taskDesc: new FormControl()
    })
    this.getParentTask();
    this.getAllProject();
    this.refreshData();
  }

  refreshData()
  {
    if(this.selectedProject)
    {
      this.taskService.getTaskByProjectId(this.selectedProject.projectId).subscribe(tasks =>
        {
          this.allTasks = tasks;
        })  
    }else{
      this.taskService.getAllTask().subscribe(tasks =>
        {
          this.allTasks = tasks;
        })  
    }
  }

  updateTask(taskId){        
      this.router.navigate(['/editTask']);
  }

  endTask(task: Task){    
    this.taskService.closeTask(task).subscribe(task =>
      {
        if(task != null)
        {
          this.toastrManager.successToastr("Task "+task["task"] + " closed successfully");
          this.refreshData();
        }
      },
      error => {
        this.toastrManager.errorToastr("Failed to close task ");
      }
      );    
  }

  getParentTask()
  {
    let parentTaskAry = JSON.parse(localStorage.getItem('parentTask'))
    for(let parentTask of parentTaskAry)
    {
      this.allParentTask.push(new ParentTask(parentTask["parentTaskId"], parentTask["parentTask"]));
    }
  }

  getAllProject()
    {
      this.projectService.getAllProjects().subscribe(projects =>
        {
          this.projectList = projects;
        })
    }

  handleSelectedProjectEvent(_event)
  {
    this.selectedProject =_event;
    if(this.selectedProject)
    {
      this.projectName = this.selectedProject.projectName;
      this.taskService.getTaskByProjectId(this.selectedProject.projectId).subscribe(tasks =>
        {
          this.allTasks = tasks;
        })
    }
  }

  sortByStartDate()
  {
    this.allTasks = this.allTasks.sort(function(task1, task2)
    {
      if(new Date(task1.startDate).getTime() < new Date(task2.startDate).getTime())
      {
        return -1;
      }
      return 0;         
    })
  }

  sortByEndDate()
  {
    this.allTasks = this.allTasks.sort(function(task1, task2)
    {
      if(new Date(task1.endDate).getTime() < new Date(task2.endDate).getTime())
      {
        return -1;
      }
      return 0;         
    })
  }

  sortByPriority()
  {
    this.allTasks = this.allTasks.sort(function(task1, task2)
    {
      if(task1.priority < task2.priority)
      {
        return -1;
      }
      return 0;         
    })
  }

  sortByCompleted()
  {
    this.allTasks = this.allTasks.sort(function(task1, task2)
    {
      if(new Date(task1.endDate).getTime() > new Date(task2.endDate).getTime())
      {
        return -1;
      }
      return 0;         
    })
  }
}
