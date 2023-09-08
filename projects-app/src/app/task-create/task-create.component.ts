import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Kanban } from '../enums/kanban.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../services/task.service';
import { FunctionalityService } from '../services/functionality.service';
import { Functionality } from '../interfaces/functionality';
import { Task } from '../interfaces/task';




@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  enumValues = Object.values(Kanban)
  taskForm!: FormGroup
  ownerOptions= ["Maciej"]
  functionalityOptions! : Functionality[];


  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private taskService : TaskService,
    private functionalityService: FunctionalityService

  )
  {}

  ngOnInit(): void {

    const currentDate = new Date().toISOString().split('T')[0];
      const addedDateControl = new FormControl({ value: currentDate, disabled: true });

    this.functionalityService.getFunctionalities().subscribe((functionalities:Functionality[]) => {
      this.functionalityOptions = functionalities
    })

    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      functionality: ['', Validators.required],
      kanban: ['', Validators.required],
      assignedUser: "Maciej"
    });

    
  }

  createTask()
  {
  

    const selectedFunctionalityName = this.taskForm.value.functionality
    const functionalityToBeSelected = this.functionalityOptions.find(f=>f.name === selectedFunctionalityName.name)


 

    if(!functionalityToBeSelected)
    {
      return;
    }
    const currentDate = new Date().toISOString().split('T')[0];
    const addedDateControl = new FormControl({ value: currentDate, disabled: true });
    const addedDateValue = addedDateControl.value !== null ? addedDateControl.value : currentDate;

    const task: Task = {
      ID:Date.now().toString(),
      name: this.taskForm.value.name,
      functionality: functionalityToBeSelected,
      kanban: this.taskForm.value.kanban,
      assignedUser: "Maciej" 
    };

    this.taskService.createTask(task).subscribe(
      () => {
        this.snackBar.open('Zadanie zostało utworzone', 'OK', {
          duration: 2000
        });
        this.taskForm.reset();
      },
      error => {
        this.snackBar.open(
          'Wystąpił błąd podczas tworzenia zadania',
          'OK',
          {
            duration: 2000
          }
        );
        console.log(error)
      }
    )

  }
}
