import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskSearchPipe } from './service/searchTask';
import { UserSearchPipe } from './service/searchUser';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { NgbdModalBasic } from './add-project/user-modal';
import { NgbdProjectModal } from './add-task/project-modal';
import { NgbdParentTaskModal } from './add-task/parentTask-modal'
import { ProjectSearchPipe } from './service/searchProject';
import { ParentTaskSearchPipe } from './service/searchParentTask';
@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    AddTaskComponent,
    EditTaskComponent,
    TaskSearchPipe,
    UserSearchPipe,
    ProjectSearchPipe,
    ParentTaskSearchPipe,
    AddUserComponent,
    AddProjectComponent,
    NgbdModalBasic,
    NgbdProjectModal,
    NgbdParentTaskModal
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbButtonsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [UserSearchPipe, ProjectSearchPipe, ParentTaskSearchPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
