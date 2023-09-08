import { Component, OnInit } from '@angular/core';
import { Kanban } from '../enums/kanban.enum';
import { Task } from '../interfaces/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { catchError, finalize } from 'rxjs';
import { Functionality } from '../interfaces/functionality';
import { FunctionalityService } from '../services/functionality.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent {
  taskID!: string
  task!: Task
  editForm!: FormGroup
  isLoading: boolean = false;
  enumValues = Object.values(Kanban)
  functionalityOptions! : Functionality[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private functionalityService: FunctionalityService,
    private location: Location
    
    ){
      this.editForm = this.formBuilder.group({
        name: ['', Validators.required],
        kanban: [Kanban, Validators.required],
        functionality: ['', Validators.required ]
      });
    }

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
  
        this.getSingleTask(this.taskID);
        this.functionalityService.getFunctionalities().subscribe((functionalities:Functionality[]) => {
          this.functionalityOptions = functionalities
        })
      });
    }

    getSingleTask(ID:string){
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
          this.populateForm();
        });
    }

    populateForm() {
      this.editForm.patchValue({
        name: this.task.name,
        kanban: this.task.kanban,
        functionality: this.task.functionality
      });
    }

   


    onSubmit(){
   
     

      const updatedTask: Task = {
        ID: this.task.ID,
        name: this.editForm.value.name,
        kanban: this.editForm.value.kanban,
        assignedUser: "Maciej",
        functionality: this.task.functionality
      }

      console.log(updatedTask)

      this.isLoading = true;
      this.taskService
        .updateTask(updatedTask)
        .pipe(
          catchError(error => {
            console.error(error);
            return error;
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
      
    }

}


