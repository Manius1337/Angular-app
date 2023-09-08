import { Component, OnInit } from '@angular/core';
import { Kanban } from '../enums/kanban.enum';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Functionality } from '../interfaces/functionality';
import { FunctionalityService } from '../services/functionality.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-functionality-create',
  templateUrl: './functionality-create.component.html',
  styleUrls: ['./functionality-create.component.css']
})
export class FunctionalityCreateComponent {
  enumValues = Object.values(Kanban)
  userValues = ["Maciej"]
  projectValues = ["Default"]
  functionalityForm! : FormGroup;
  addedDateCustom : any 
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private functionalityService : FunctionalityService,
    private snackBar: MatSnackBar,
    ) 
    {
      
      
    }

    ngOnInit() {



      const currentDate = new Date().toISOString().split('T')[0];
      this.addedDateCustom = new FormControl({ value: currentDate, disabled: true });

      console.log(currentDate)

      this.functionalityForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        priority: ['', Validators.required],
        projectName: [''], 
        owner: ['', Validators.required],
        kanban: [Kanban.Todo, Validators.required],
        addedDate: this.addedDateCustom,
        startDate: [''],
        endDate: [''],
        timeSpent: ['']
      });
      
    }

    createFunctionality(){
     

      const selectedProjectName = this.functionalityForm.value.projectName;

      const selectedOwnerLogin = this.functionalityForm.value.owner;
      
  


      const functionality: Functionality = {
        ID: Date.now().toString(),
        name: this.functionalityForm.value.name,
        description: this.functionalityForm.value.description,
        kanban: this.functionalityForm.value.kanban,
        project: 'Default Project',
        user: 'Maciej'
      };

     
      this.functionalityService.createFunctionality(functionality).subscribe(
        () => {
          this.snackBar.open('Zadanie została utworzona', 'OK', {
            duration: 2000
          });
          this.functionalityForm.reset();
        },
        error => {
          this.snackBar.open(
            'Wystąpił błąd podczas tworzenia zadanie',
            'OK',
            {
              duration: 2000
            }
          );
          console.log(error)
        }
      );

      this.router.navigate(['/functionality/list']);

    }
}
