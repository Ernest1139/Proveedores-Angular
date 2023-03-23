import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Articulos } from '../interface/Articulos';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {

  //@Output() articuloSeleccionadoMostrar = new EventEmitter();

  articuloSeleccionado : Articulos = {
    codigo : '',
    descripcion : '',
    precio : 0
  }
  
  articulo : Articulos [] = [];

  constructor(private articulosService : ArticulosService, private router: Router){
    console.log("Soy el constructor");
    console.log(this.articulosService.returnData());
    this.articulo = this.articulosService.returnData();
  }

  borrar(articulo: Articulos) {
    const confirmacion = confirm(`¿Esta seguro de borrar el articulo? ${articulo.descripcion}`)
    if (confirmacion) {
      // this.articulo = this.articulo.filter(a => a.codigo != articulo.codigo); // muestra todos los articulos con el codigo diferente al seleccionado
      this.articulosService.eliminar(articulo);
    }
  }
  
  seleccionar(articulo: Articulos) {
    this.articuloSeleccionado = {
      ...articulo
    };

    // this.articuloSeleccionadoMostrar.emit(this.articuloSeleccionado);
    this.router.navigate([`modificarArticulo/${articulo.codigo}`]);
  }

}
