import { Component, OnInit } from '@angular/core';
import { Kanban } from '../enums/kanban.enum';
import { Functionality } from '../interfaces/functionality';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionalityService } from '../services/functionality.service';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-functionality-edit',
  templateUrl: './functionality-edit.component.html',
  styleUrls: ['./functionality-edit.component.css']
})
export class FunctionalityEditComponent {
  functionalityID!: string
  functionality!: Functionality
  editForm!: FormGroup
  isLoading: boolean = false;
  enumValues = Object.values(Kanban)

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private functionalityService: FunctionalityService,
    
    ){
      this.editForm = this.formBuilder.group({
        name: ['', Validators.required],
        kanban: [Kanban, Validators.required]
      });
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
  
        this.getSingleFunctionality(this.functionalityID);
      });
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
          this.populateForm();
        });
    }

    populateForm() {
      this.editForm.patchValue({
        name: this.functionality.name,
        kanban: this.functionality.kanban
      });
    }
    onSubmit(){
   
      
      const updatedFunctionality: Functionality = {
        ID: this.functionality.ID, 
        name: this.editForm.value.name,
        description: this.functionality.description, 
        project: this.functionality.project, 
        user: this.functionality.user, 
        kanban: this.editForm.value.kanban,

       
      }

      console.log(updatedFunctionality)

      this.isLoading = true;
      this.functionalityService
        .updateFunctionality(updatedFunctionality)
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
          console.log(functionality)
          this.router.navigate(['/functionality/list']);
        });

       
    }
}

