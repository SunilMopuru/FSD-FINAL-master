import { Project } from './project-model';
import { User } from './user-model';

export class ParentTask
{
    constructor(parentTaskId: number,
        parentTask: string)
        {
            this.parentTaskId = parentTaskId;
            this.parentTask =parentTask;
        }
    parentTaskId: number;
    parentTask: string;
}

export class Task {
    taskId: number;
    task: string;
    isparentTask: boolean;
    priority: number;
    startDate: Date;
    endDate: Date;
    parentTaskId: number;
    parentTask: ParentTask;
    project: Project;
    user: User;
    projectId: number;
}