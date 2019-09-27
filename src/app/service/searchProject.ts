import {Pipe, PipeTransform } from '@angular/core';
import { Project } from '../model/project-model';

@Pipe({
    name: 'projectSearch'
})
export class ProjectSearchPipe implements PipeTransform {
    transform(projectList: Project[], searchKey: string){
        if (projectList && projectList.length){
            return projectList.filter(project =>{                
                if(searchKey)
                {
                    if(project.projectName.toLowerCase().indexOf(searchKey.toLowerCase()) === -1){
                        return false;
                    }    
                }
                
                return true;
             });
        }
        else
        {
            return projectList;
        }
    }
}