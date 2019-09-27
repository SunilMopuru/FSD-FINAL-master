import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

import { TaskService } from '../service/taskService';
import { UserService } from '../service/userService';
import { ProjectService } from '../service/projectService';

import { Task, ParentTask ,User, Project} from '../model';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  editTaskForm: FormGroup;
  taskId: number;
  editTask: Task = new Task();
  allParentTask: Array<ParentTask> = new Array<ParentTask>();
  submitted = false;
  selectedProject: Project;
  selectedUser: User;
  selectedParentTask: ParentTask;
  userList: Array<User> =new Array<User>();
  projectList: Array<Project> = new Array<Project>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService,
    private toastrManager: ToastrManager

  ) {
    this.editTaskForm = this.formBuilder.group({
      task: ['', Validators.required],
      taskId: ['', Validators.required],
      projectName: [''],
      parentTaskId: [''],
      priority: [0],
      startDate: ['', dateValidator],
      endDate: [''],
      userName: [''],
      parentTaskName: ['']
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.taskId = params['taskId']
    })
    this.getParentTask();
    this.getAllUser();

    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.editTask = task;
      this.updateFormValue();
    })
  }

  getParentTask() {
    let parentTaskAry = JSON.parse(localStorage.getItem('parentTask'))
    for (let parentTask of parentTaskAry) {
      this.allParentTask.push(new ParentTask(parentTask["parentTaskId"], parentTask["parentTask"]));
    }
  }

  getAllProject(projectId: number)
  {
    this.projectService.getAllProjects().subscribe(projects =>
      {
        this.projectList = projects;
        let projectIndex = this.projectList.findIndex(project => project.projectId == projectId);
        this.selectedProject = this.projectList[projectIndex];
        if(this.selectedProject)
        {
          this.editTaskForm.get('projectName').patchValue(this.selectedProject.projectName);
        }        
      })
  }

  getAllUser(){
    this.userService.getAllUser().subscribe(users =>
      {
        this.userList = users;
      })
  }

  updateFormValue()
  {
    this.editTaskForm.get("task").patchValue(this.editTask.task);
    this.editTaskForm.get("taskId").patchValue(this.editTask.taskId);
    this.editTaskForm.get("priority").patchValue(this.editTask.priority);
    this.editTaskForm.get("startDate").patchValue(this.editTask.startDate);
    this.editTaskForm.get("endDate").patchValue(this.editTask.endDate);
    if (this.editTask.parentTask) {
      this.editTaskForm.get('parentTaskName').patchValue(this.editTask.parentTask.parentTask);
      this.selectedParentTask = this.editTask.parentTask;
    }
    this.getAllProject(this.editTask.projectId);
    if(this.editTask.user)
    {
      this.editTaskForm.get('userName').patchValue(this.editTask.user.firstName);
      this.selectedUser = this.editTask.user;
    }
  }

  handleSelectedProjectEvent(_event)
  {
    this.selectedProject =_event;
    this.editTaskForm.get('projectName').patchValue(this.selectedProject.projectName);
    this.submitted = false;
  }

  handleSelectedUserEvent(_event)
  {
    this.selectedUser =_event;
    this.editTaskForm.get('userName').patchValue(this.selectedUser.firstName);
    this.submitted = false;
  }

  handleSelectedParentTaskEvent(_event)
  {
    this.selectedParentTask =_event;
    this.editTaskForm.get('parentTaskName').patchValue(this.selectedParentTask.parentTask);
    this.submitted = false;
  }

  updateTask() {
    this.submitted = true;
    this.editTaskForm.markAsTouched;
    if(this.editTaskForm.valid){
      let task: Task = this.editTaskForm.value;
      task.user = this.selectedUser;
      task.parentTask = this.selectedParentTask;
      task.project = this.selectedProject;
      this.taskService.updateTask(task).subscribe(task => {
        this.router.navigate(['/viewTask'])
        this.toastrManager.successToastr("Task "+task["task"] + " Updated successfully");
      },
      error => {
        this.toastrManager.errorToastr("Failed to update task ");
      }
    );  
    }
  }
}

function dateValidator(control: AbstractControl): {[ket:string]: any} | null{
  const startDateCtrl = control.root.get('startDate');
  const endDateCtrl = control.root.get('endDate');
  if(!startDateCtrl || !startDateCtrl.value)
  {
    return {'startDateRequired':true}
  }else if(startDateCtrl && endDateCtrl && startDateCtrl.value && endDateCtrl.value){
    const startDate = startDateCtrl.value; 
    const endDate = endDateCtrl.value;
    if(new Date(startDate).getTime() > new Date(endDate).getTime()){
      return {'startDateInvalid':true}
    }else{
      return null;
    }    
  }
}
