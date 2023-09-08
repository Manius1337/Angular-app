import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FunctionalityListComponent } from './functionality-list/functionality-list.component';
import { FunctionalityCreateComponent } from './functionality-create/functionality-create.component';
import { FunctionalityEditComponent } from './functionality-edit/functionality-edit.component';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskReadComponent } from './task-read/task-read.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
//service
import { FunctionalityService } from './services/functionality.service';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    FunctionalityListComponent,
    FunctionalityCreateComponent,
    FunctionalityEditComponent,
    TaskListComponent,
    TaskReadComponent,
    TaskEditComponent,
    TaskCreateComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule ,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule
  
  ],
  providers: [FunctionalityService, TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
