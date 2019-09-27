import { first } from 'rxjs/operators';
import { Task } from './task-model';
import { Project } from './project-model';

export class User {
    constructor(userId: number, firstName: string, lastName: string, empId: number,)
    {
        this.userId = userId;
        this.firstName=firstName;
        this.lastName=lastName;
        this.empId= empId;
    }
    userId: number;
    firstName: string;
    lastName: string;
    empId: number;
    deleted: boolean;
}