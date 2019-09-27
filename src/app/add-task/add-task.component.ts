import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl }  from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

import { TaskService } from '../service/taskService';
import { ProjectService } from '../service/projectService';
import { Task, ParentTask } from '../model/task-model';
import { User } from '../model/user-model';
import { Project } from '../model/project-model';
import { UserService } from '../service/userService';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup;
  allParentTask: Array<ParentTask> =new Array<ParentTask>();
  submitted = false;
  projectList: Array<Project> = new Array<Project>();
  userList: Array<User> =new Array<User>();
  selectedProject: Project;
  selectedUser: User;
  selectedParentTask: ParentTask;
  disableChildTask: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService,
    private toastrManager: ToastrManager
  ){
   }

   ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      projectName: ['',Validators.required],
      task: ['',Validators.required],
      parentTaskId: [''],
      priority: [0],
      startDate: ['', dateValidator],
      endDate: [''],
      isparentTask: [false],
      userName: ['',Validators.required],
      parentTaskName: ['',Validators.required]
    })
    this.addTaskForm.get('endDate').valueChanges.subscribe(value => {
      this.addTaskForm.get('startDate').updateValueAndValidity()
    });
    this.addTaskForm.get('isparentTask').valueChanges.subscribe(value => {
      this.addTaskForm.get('startDate').updateValueAndValidity()
    });

    this.getParentTask();
    this.getAllProject();
    this.getAllUser();
  }

   addTask()
   {
    this.submitted = true;
    this.addTaskForm.markAsTouched;    
    if(this.addTaskForm.valid)       
     {
     let addtask: Task = this.addTaskForm.value;
      if(addtask.isparentTask == true)
      {
        let parentTask = new ParentTask(undefined , addtask.task);
        this.taskService.addParentTask(parentTask).pipe(first()).subscribe(parentTaskres =>       
          {
            this.allParentTask.push(new ParentTask(parentTaskres["parentTaskId"], parentTaskres["parentTask"]));
            localStorage.setItem('parentTask',JSON.stringify(this.allParentTask));
            this.addTaskForm.patchValue(this.allParentTask);
            this.resetForm();
            this.toastrManager.successToastr("Task "+parentTaskres["parentTask"] + " Added successfully");
          },
          error => {
            this.toastrManager.errorToastr("Failed to add task ");
          }
        )
      }
      else
      {
        addtask.parentTask = this.selectedParentTask;
        addtask.project = this.selectedProject;
        addtask.user = this.selectedUser;
        this.taskService.addTask(addtask).pipe(first()).subscribe(
          (taskRes) => {
            this.toastrManager.successToastr("Task "+addtask.task + " Added successfully");
            this.resetForm();
          },
          error => {
            this.toastrManager.errorToastr("Failed to add task ");
          }
        )
      }
    }        
  }

   resetForm()
   {
    this.submitted = false;
    this.addTaskForm = this.formBuilder.group({        
      task: new FormControl('',Validators.required),
      projectName: [''],
      parentTaskId: [''],
      priority: [0],
      startDate: ['', dateValidator],
      endDate: ['', dateValidator],
      isparentTask: [false],
      userName: ['',Validators.required],
      parentTaskName: ['',Validators.required]
    })
    this.disableChildTask = false;
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

    getAllUser(){
      this.userService.getAllUser().subscribe(users =>
        {
          this.userList = users;
        })
    }
    handleSelectedProjectEvent(_event)
    {
      this.selectedProject =_event;
      this.addTaskForm.get('projectName').patchValue(this.selectedProject.projectName);
      this.submitted = false;
    }

    handleSelectedUserEvent(_event)
    {
      this.selectedUser =_event;
      this.addTaskForm.get('userName').patchValue(this.selectedUser.firstName);
      this.submitted = false;
    }

    handleSelectedParentTaskEvent(_event)
    {
      this.selectedParentTask =_event;
      this.addTaskForm.get('parentTaskName').patchValue(this.selectedParentTask.parentTask);
      this.submitted = false;
    }

    setParentTask()
    {
      let isParent = this.addTaskForm.get('isparentTask').value;
      if(isParent)
      {
        this.disableChildTask = true;
        this.addTaskForm.get('projectName').disable();
        this.addTaskForm.get('priority').disable();
        this.addTaskForm.get('parentTaskName').disable();
        this.addTaskForm.get('startDate').disable();
        this.addTaskForm.get('endDate').disable();
        this.addTaskForm.get('userName').disable();
      }else
      {
        this.disableChildTask = false;
        this.addTaskForm.get('projectName').disable();        
        this.addTaskForm.get('priority').enable();
        this.addTaskForm.get('parentTaskName').enable();
        this.addTaskForm.get('startDate').enable();
        this.addTaskForm.get('endDate').enable();
        this.addTaskForm.get('userName').enable();
      }
    }
}
export function dateValidator(control: AbstractControl): {[ket:string]: any} | null{
  const startDateCtrl = control.root.get('startDate')
  const endDateCtrl =control.root.get('endDate');
  const isparentTaskCtrl =control.root.get('isparentTask');
  if(isparentTaskCtrl)
  {
    if(isparentTaskCtrl.value)
    {
      return null;
    }else{
      if(!startDateCtrl || !startDateCtrl.value)
      {
        return {'startDateRequired':true}
      }else if(startDateCtrl && startDateCtrl.value && endDateCtrl && endDateCtrl.value)
      {
        const startDate = startDateCtrl.value;
        const endDate = endDateCtrl.value;
        if(new Date(startDate).getTime() > new Date(endDate).getTime()){
          return {'startDateInvalid':true}
        }
      }
    }
  }
  return null; 
}