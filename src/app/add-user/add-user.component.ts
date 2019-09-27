import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl }  from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

import { UserService } from '../service/userService';
import { User } from '../model/user-model';
import { UserSearchPipe } from '../service/searchUser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  userList: User[] = [];
  submitted = false;
  searchUsers: User[] = [];
  deleteUserId: number;
  isNewUser: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrManager: ToastrManager,
    private userSearchPipe: UserSearchPipe
  ){
   }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      userId: [''],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      empId: ['',Validators.required],
      searchKey: ['']      
    }    
    )
    this.loadUser();
    this.addUserForm.get('searchKey').valueChanges.subscribe(value => {
      this.searchUsers = this.userSearchPipe.transform(this.userList ,value)
    });
    this.isNewUser= true;
  }

  loadUser()
  {
    this.userService.getAllUser().subscribe(users =>
      {
        this.userList = users;
        this.searchUsers = users;
      })
  }
  addUser()
   {
    this.submitted = true;
    if(this.addUserForm.valid)  
    {
      let newUser: User = this.addUserForm.value;
      newUser.deleted=false;
      if(newUser.userId)
      {
        this.userService.updateUser(newUser).subscribe(userRes =>       
          {
            this.updateUserList(userRes);
            this.resetForm();
            this.toastrManager.successToastr("User "+userRes["firstName"] + " Updated Successfully");
          },
          error => {
            this.toastrManager.errorToastr("Failed to update user ");
          }
        )
      }
      else
      {
        this.userService.addUser(newUser).subscribe(userRes =>       
          {
            this.userList.push(new User(userRes["userId"],userRes["firstName"],userRes["lastName"],userRes["empId"]));
            this.resetForm();
            this.toastrManager.successToastr("User "+userRes["firstName"] + " Added Successfully");
          },
          error => {
            this.toastrManager.errorToastr("Failed to add user ");
          }
        )
      }
    }
   }

   resetForm(){
    this.addUserForm = this.formBuilder.group({  
      userId: [''],    
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      empId: ['',Validators.required],
      searchKey: ['']
    })  
    this.submitted = false;  
    this.searchUsers = this.userList; 
    this.deleteUserId = -1;
    this.isNewUser = true;

   }

   editUser(user: User)
   {
    this.addUserForm = this.formBuilder.group({  
      userId: [user.userId],    
      firstName: [user.firstName,Validators.required],
      lastName: [user.lastName,Validators.required],
      empId: [user.empId,Validators.required],
      searchKey: ['']
    })
    this.isNewUser =false;
   }
   deleteUser(userId: number)
   {
     this.deleteUserId = userId;
     this.userService.deleteUser(userId).subscribe(res =>
      {
        this.removeDeletedUser(this.deleteUserId);
        this.resetForm();
        this.toastrManager.successToastr("User deleted Successfully");
      },
      error => {
        this.toastrManager.errorToastr("Failed to delete user ");
      }
      )
   }

   updateUserList(updateUser: any)
   {
     let userId= updateUser["userId"]
     if(userId)
     {
      let userIndex = this.userList.findIndex(user => user.userId == userId);
      this.userList[userIndex] = updateUser; 
     }
   }

  removeDeletedUser(userId: number )
    {
      if(userId != -1)
      {
        let userIndex = this.userList.findIndex(user => user.userId == userId);
        if(userIndex != -1)
        {
          this.userList.splice(userIndex,1);  
        }        
      }
    }

  sortBylastName()
   {
      this.searchUsers = this.searchUsers.sort(function(user1, user2)
      {
        if(user1.lastName.toLowerCase() < user2.lastName.toLowerCase())
        {
          return -1;
        }
        return 0;         
      })
   }

   sortByfirstName()
   {
    this.searchUsers = this.searchUsers.sort(function(user1, user2)
    {
      if(user1.firstName.toLowerCase() < user2.firstName.toLowerCase())
      {
        return -1;
      }
      return 0;         
    })
   }

   sortByEmpId()
   {
    this.searchUsers = this.searchUsers.sort(function(user1, user2)
    {
      if(user1.empId < user2.empId)
      {
        return -1;
      }
      return 0;         
    })
   }
}
