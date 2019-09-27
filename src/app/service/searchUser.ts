import {Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user-model';

@Pipe({
    name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {
    transform(userList: User[], searchKey: string){
        if (userList && userList.length){
            return userList.filter(user =>{                
                if(searchKey)
                {
                    if(user.firstName.toLowerCase().indexOf(searchKey.toLowerCase()) === -1 &&
                        user.lastName.toLowerCase().indexOf(searchKey.toLowerCase()) === -1 &&
                        user.empId.toString().indexOf(searchKey.toLowerCase()) === -1) {
                        return false;
                    }    
                }
                
                return true;
             });
        }
        else
        {
            return userList;
        }
    }
}