import {Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task-model';

@Pipe({
    name: 'taskSearch'
})
export class TaskSearchPipe implements PipeTransform {
    transform(taskList: Task[], taskDesc: string , parentTask: string, priorityFrom: number, priorityTo: number, startDate: Date ,endDate: Date){
        if (taskList && taskList.length){
            return taskList.filter(item =>{
                
                if(taskDesc && item.task.toLowerCase().indexOf(taskDesc.toLowerCase()) === -1){
                    return false;
                }
                if((parentTask && parentTask.trim() !== '-1') && (!item.parentTask || item.parentTask.parentTask !== parentTask)){
                    return false;
                }
                if(priorityFrom && item.priority < priorityFrom){
                    return false;
                }
                if(priorityTo && item.priority > priorityTo){
                    return false;
                }
                if(startDate && (!item.startDate || new Date(item.startDate).getTime() != new Date(startDate).getTime())){
                    return false;
                }
                if(endDate && (!item.endDate || new Date(item.endDate).getTime() != new Date(endDate).getTime())){
                    return false;
                }
                return true;
             });
    }
    else{
        return taskList;
    }
    }
}