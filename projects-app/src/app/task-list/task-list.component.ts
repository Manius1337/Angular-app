import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Functionality } from '../interfaces/functionality';
import { catchError, finalize } from 'rxjs';
import { FunctionalityService } from '../services/functionality.service';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';
import { Kanban } from '../enums/kanban.enum';




@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  functionality!: Functionality
  kanban!: Kanban
  timeSpent! : number
  allTasks!: Task[] 
  functionalities : Functionality[] = []
  tasksBelongsToFunctionality: Task[] = []
  workingUsers= "Maciej";
  functionalityID!: string
  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'description', 'user' , 'kanban'];
 taskDisplayedColumns: string[] = ['taskName', 'taskKanban', 'taskAssignedUser', 'taskActions' ]



   constructor(private route: ActivatedRoute,
     private functionalityService: FunctionalityService,
     private router: Router,
     private taskService: TaskService,
    ){
       this.taskService.getTasks().subscribe((tasks:Task[])=>{
         this.allTasks = tasks
       })
     }
 
 
   ngOnInit(): void {
 
     this.route.paramMap.subscribe(params => {
       const id = params.get('id');
       if (id !== null) 
       {
         this.functionalityID = id;
       } 
       else 
       {
         this.functionalityID = '';
       }
       this.getFunctionalityTasks()
       this.getSingleFunctionality(this.functionalityID)
  
     });
   }
 
 
   createTask()
   {
     this.router.navigate(['/task/create'])
   }
 
   getSingleFunctionality(ID:string){
     this.isLoading = true;
     this.functionalityService
       .getSingleFunctionality(ID)
       .pipe(
         catchError(error => {
           console.error(error);
           return error;
         }),
         finalize(() => {
           this.isLoading = false;
         })
       )
       .subscribe(functionality => {
         this.functionality = functionality as Functionality;
        
         
         this.functionalities.push(this.functionality)
       });
   }
  
   getFunctionalityTasks()
   {
     this.tasksBelongsToFunctionality = this.allTasks.filter(task=>task.functionality.ID === this.functionalityID )
     console.log(this.tasksBelongsToFunctionality)
   }
 
  
 
   editTask(task:Task){
    this.router.navigate(['/task', task.ID, 'edit']);
  }

  deleteTask(task:Task){
    
      this.taskService.deleteTask(task.ID).subscribe(()=>{
      
        this.tasksBelongsToFunctionality = this.tasksBelongsToFunctionality.filter(f=>f.ID!==task.ID)
      })
    
  
  }

  viewTaskDetails(task:Task)
  {
    this.router.navigate(['/task', task.ID, 'read']);
  }
 
 }
 
