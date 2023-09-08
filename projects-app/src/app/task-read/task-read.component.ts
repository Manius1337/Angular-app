import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { catchError, finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-read',
  templateUrl: './task-read.component.html',
  styleUrls: ['./task-read.component.css']
})
export class TaskReadComponent {
  task! : Task
  timeSpent! : number
  taskID! : string
  editedTask:any
  isLoading: boolean = false;
  tasks: Task[] = []
  displayedColumns: string[] = ['name', 'functionality', 'kanban', 'assignedUser'];
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private taskService: TaskService){}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) 
        {
          this.taskID = id;
        } 
        else 
        {
          this.taskID = '';
        }
      
        this.getSingleFunctionality(this.taskID)
  
  
      });
    }
  
 
  

  
    getSingleFunctionality(ID:string){
      this.isLoading = true;
      this.taskService
        .getSingleTask(ID)
        .pipe(
          catchError(error => {
            console.error(error);
            return error;
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(task => {
          this.task = task as Task;
          this.tasks.push(this.task)
        });
    }
  
   
  
  
  }
  
