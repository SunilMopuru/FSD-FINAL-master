import {User} from './user-model';
import {Task} from './task-model';

export class Project {
    projectId: number;
    projectName: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    manager: User;
    completed: boolean;
    tasklist: Task[];
    totalTask: number;
    completedTask: number;
}