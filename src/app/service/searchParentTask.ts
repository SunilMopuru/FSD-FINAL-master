import {Pipe, PipeTransform } from '@angular/core';
import { ParentTask } from '../model/task-model';

@Pipe({
    name: 'parentTaskSearch'
})
export class ParentTaskSearchPipe implements PipeTransform {
    transform(parentTaskList: ParentTask[], searchKey: string){
        if (parentTaskList && parentTaskList.length){
            return parentTaskList.filter(item =>{                
                if(searchKey && item.parentTask.toLowerCase().indexOf(searchKey.toLowerCase()) === -1){
                    return false;
                }                
                return true;
             });
    }
    else{
        return parentTaskList;
    }
    }
}