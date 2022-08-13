import { NgModule } from '@angular/core';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportantComponent } from './important/important.component';
import { PlanComponent } from './plan/plan.component';
import { BookMarkComponent } from './book-mark/book-mark.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewListComponent } from './new-list/new-list.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { FolderComponent } from './folder/folder.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { NotesComponent } from './notes/notes.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes = [
  { path: '', component: ViewComponent },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'signin',
    component: SigninComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'important',
    component: ImportantComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'plan',
    component: PlanComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'book-mark',
    component: BookMarkComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'tasks',
    component: TasksComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'new-list',
    component: NewListComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'update-task/:id',
    component: UpdateTaskComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'folder',
    component: FolderComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'notes',
    component: NotesComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ViewComponent,
    HomeComponent,
    ProfileComponent,
    AddTaskComponent,
    ImportantComponent,
    PlanComponent,
    BookMarkComponent,
    TasksComponent,
    NewListComponent,
    UpdateTaskComponent,
    FolderComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
