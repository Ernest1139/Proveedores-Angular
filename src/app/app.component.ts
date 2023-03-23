import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Articulos } from './interface/Articulos';
import { Proveedores } from './interface/Proveedores';
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

  proveedorSeleccionado : Proveedores = {
    Id : 0,
    CodigoProveedor : '',
    RazonSocial : '',
    RFC: '',
    Direccion : '',
    Email : ''
  }

  // abrirSidebar: boolean = false;

  seleccionar(articuloSeleccionar: Articulos){
    console.log(articuloSeleccionar);
    this.articuloSeleccionado = articuloSeleccionar;
  }

  seleccionarProv(proveedorSeleccionar: Proveedores){
    console.log(proveedorSeleccionar);
    this.proveedorSeleccionado = proveedorSeleccionar;
  }

  // mostrarSidebar(){
  //   this.abrirSidebar =! this.abrirSidebar;
  //   console.log(this.abrirSidebar)
  // }

  mostrarSidebar(){
    this.sidebar?.esconderSidebar();    
  }

}
