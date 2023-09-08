import { Injectable } from "@angular/core";
import { Task } from "../interfaces/task";
import { Observable, of, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })


  export class TaskService {
    private localStorageKey = 'tasks';
    private tasks :Task[] = [];

    private loadTaskFromLocalStorage(): void {
        const projectsData = localStorage.getItem(this.localStorageKey);
        if (projectsData) {
          this.tasks = JSON.parse(projectsData);
        }
      }
    
      private saveTaskToLocalStorage(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
      }
  
  
      constructor() {
        this.loadTaskFromLocalStorage();
      }


      getTasks(): Observable<Task[]>{
        return of(this.tasks);
      }

      getSingleTask(ID: string): Observable<Task> {
        const task = this.tasks.find(p => p.ID === ID);
  
        if (task) 
        {
          return of(task);
        } 
        else 
        {
          return throwError(new Error('Task not found'));
        }
      }
  
      createTask(task:Task): Observable<Task>{
        this.tasks.push(task);
        this.saveTaskToLocalStorage();
        return of(task)
      }
  
      updateTask(task: Task): Observable<Task>{
        const taskToUpdate = this.tasks.find(u=>u.name === task.name);
  
        if(taskToUpdate)
        {
          taskToUpdate.name = task.name
          taskToUpdate.functionality = task.functionality
          taskToUpdate.kanban = task.kanban
          taskToUpdate.assignedUser = task.assignedUser
          this.saveTaskToLocalStorage();
          return of(taskToUpdate)
        }
        else
        {
          return of()
        }
      }
  
      deleteTask(ID: string): Observable<boolean>{
        const index = this.tasks.findIndex(t=>t.ID === ID);
  
        if (index !== -1) 
        {
          this.tasks.splice(index, 1);
          this.saveTaskToLocalStorage();
          return of(true);
        } 
        else 
        {
          return of(false);
        }
      }
  }
