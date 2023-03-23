import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {


  // @Input() sidebarAbrir: boolean = false;  
  sidebarAbrir: boolean = false;  

  esconderSidebar(){
    this.sidebarAbrir = !this.sidebarAbrir;
    // this.sidebarAbrir = false;
    console.log(this.sidebarAbrir);
  }

  

}
