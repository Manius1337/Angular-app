import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


 get user(): any {
    return localStorage.getItem('User');
}

get project(): any {
  return localStorage.getItem('Project');
}
}
