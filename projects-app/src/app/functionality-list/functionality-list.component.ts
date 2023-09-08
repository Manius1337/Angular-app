import { Component, OnInit} from '@angular/core';
import { FunctionalityService } from '../services/functionality.service';
import { Functionality } from '../interfaces/functionality';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-functionality-list',
  templateUrl: './functionality-list.component.html',
  styleUrls: ['./functionality-list.component.css']
})
export class FunctionalityListComponent {
  functionalities : Functionality[] =[];
  displayedColumns: string[] = ['name', 'kanban', 'actions'];
  functionalityOptions!: Functionality[]
  projectID!: string
  isLoading: boolean = false;
  
  
  functionalitiesBelongToProject: Functionality[] = []
  sortedData!: Functionality[];
  //dataSource!: MatTableDataSource<Functionality>
  
  
  //@ViewChild(MatSort) sorter!: MatSort;
  
    constructor(
      private functionalityService: FunctionalityService, 
      private router: Router,
      private route: ActivatedRoute,
      ){
        this.functionalityService.getFunctionalities().subscribe((functionalities:Functionality[])=>{
          this.functionalityOptions = functionalities
        })
        console.log(this.functionalityOptions)
        
      }
  
     
     
      compare(a: number | string, b: number | string, isAsc: boolean){
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      }
      
     
      
      
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) 
        {
          this.projectID = id;
        } 
        else 
        {
          this.projectID = '';
        }
  
  
        this.getFunctionalities()
        this.sortedData = this.functionalitiesBelongToProject.slice()
        console.log(this.sortedData)
        console.log(this.functionalitiesBelongToProject)
        
      });
    }
  
  
  
    getFunctionalities(){
      this.functionalitiesBelongToProject = this.functionalityOptions
      console.log(this.functionalitiesBelongToProject)
    }
  
    editFunctionality(functionality:Functionality){
      this.router.navigate(['/functionality', functionality.ID, 'edit']);
    }
  
    deleteFunctionality(functionality:Functionality){
      
        this.functionalityService.deleteFunctionality(functionality.ID).subscribe(()=>{
        
          this.sortedData = this.sortedData.filter(f=>f.ID!==functionality.ID)
        })
      
    
    }
  
    viewFunctionalityDetails(functionality:Functionality)
    {
      this.router.navigate(['/task', functionality.ID, 'list']);
    }
    createFunctionality() {
      // Przenieś się do komponentu tworzenia nowego projektu (np. CreateProjectComponent)
      this.router.navigate(['/functionality/create']);
    }
  }
  