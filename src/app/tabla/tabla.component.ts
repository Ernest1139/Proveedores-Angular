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
    Codigo : '',
    Descripcion : '',
    Precio : 0
  }
  
  articulo : Articulos [] = [];

  constructor(private articulosService : ArticulosService, private router: Router){
    console.log("Soy el constructor");
    console.log(this.articulosService.returnData());
    //this.articulo = this.articulosService.returnData();
    this.cargarData();
  }

  cargarData(){
    this.articulosService.returnData().subscribe(data=>{
      console.log(data);
      this.articulo=data;
    });
  }

  borrar(articulo: Articulos) {
    const confirmacion = confirm(`¿Esta seguro de borrar el articulo? ${articulo.Descripcion}`)
    if (confirmacion) {
      // this.articulo = this.articulo.filter(a => a.codigo != articulo.codigo); // muestra todos los articulos con el codigo diferente al seleccionado
      // this.articulosService.eliminar(articulo);
      this.articulosService.eliminar(articulo).subscribe(data=>{
        console.log(data);
        this.cargarData();
      });
      return;
    }
  }
  
  seleccionar(articulo: Articulos) {
    this.articuloSeleccionado = {
      ...articulo
    };

    // this.articuloSeleccionadoMostrar.emit(this.articuloSeleccionado);
    this.router.navigate([`modificarArticulo/${articulo.Codigo}`]);
  }

}
