import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Functionality } from "../interfaces/functionality";

@Injectable({
    providedIn: 'root'
  })


  export class FunctionalityService{
    private localStorageKey = 'functionalities';
    private functionalities: Functionality[] =[];

    private loadFunctionalitiesFromLocalStorage(): void {
        const functionalitiesData = localStorage.getItem(this.localStorageKey);
        if (functionalitiesData) {
          this.functionalities = JSON.parse(functionalitiesData);
        }
      }
    
      private saveFunctionalitiesToLocalStorage(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.functionalities));
      }

      constructor() {
        this.loadFunctionalitiesFromLocalStorage();
      }

      
      getFunctionalities(): Observable<Functionality[]> {
        return of(this.functionalities);
      }

      getSingleFunctionality(ID: string): Observable<Functionality> {
        const functionality = this.functionalities.find(f => f.ID === ID);
  
        if (functionality) 
        {
          return of(functionality);
        } 
        else 
        {
          return throwError(new Error('Project not found'));
        }
      }

      createFunctionality(functionality: Functionality): Observable<Functionality> {
        this.functionalities.push(functionality);
        this.saveFunctionalitiesToLocalStorage();
        return of(functionality);
      }
    
      updateFunctionality(functionality: Functionality): Observable<Functionality> {
        console.log(functionality)
        const functionalityToUpdate = this.functionalities.find(f => f.ID === functionality.ID);
    
        if (functionalityToUpdate) {
          functionalityToUpdate.name = functionality.name;
          functionalityToUpdate.description = functionality.description;
          functionalityToUpdate.project = functionality.project;
          functionalityToUpdate.user = functionality.user;
          functionalityToUpdate.kanban = functionality.kanban;
          this.saveFunctionalitiesToLocalStorage();
          return of(functionalityToUpdate);
        } 
        else 
        {
          return of();
        }
      }
    
      deleteFunctionality(ID: string): Observable<boolean> {
        const index = this.functionalities.findIndex(f => f.ID === ID);
    
        if (index !== -1) {
          this.functionalities.splice(index, 1);
          this.saveFunctionalitiesToLocalStorage();
          return of(true);
        } else {
          return of(false);
        }
      }
  }
