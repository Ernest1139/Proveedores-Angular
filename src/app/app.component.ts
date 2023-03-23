import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Articulos } from './interface/Articulos';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})

export class AppComponent {
  
  @ViewChild("sidebar") sidebar : SidebarComponent | undefined;

  articuloSeleccionado : Articulos = {
    codigo : '',
    descripcion : '',
    precio : 0
  }

  // abrirSidebar: boolean = false;

  seleccionar(articuloSeleccionar: Articulos){
    console.log(articuloSeleccionar);
    this.articuloSeleccionado = articuloSeleccionar;
  }

  // mostrarSidebar(){
  //   this.abrirSidebar =! this.abrirSidebar;
  //   console.log(this.abrirSidebar)
  // }

  mostrarSidebar(){
    this.sidebar?.esconderSidebar();    
  }

}
