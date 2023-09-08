import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projects-app';

  ngOnInit(): void {
      var project = "Default";
      localStorage.setItem('Project', project)
    
      var user = "Maciej";
      localStorage.setItem('User', user)   
  }
   
}
     
  

 

