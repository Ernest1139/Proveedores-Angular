import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() sidebar : SidebarComponent | undefined;

  mostrarSidebar(){
    this.sidebar?.esconderSidebar();
  }


}
