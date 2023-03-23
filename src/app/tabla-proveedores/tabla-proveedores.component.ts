import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedores } from '../interface/Proveedores';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrls: ['./tabla-proveedores.component.css']
})
export class TablaProveedoresComponent {

  proveedorSeleccionado : Proveedores = {
    Id : 0,
    CodigoProveedor : '',
    RazonSocial : '',
    RFC: '',
    Direccion : '',
    Email : ''
  }

  proveedor : Proveedores [] = [];

  constructor(private proveedoresService : ProveedoresService, private router: Router){
    console.log("Soy el constructor");
    console.log(this.proveedoresService.returnData());
    this.proveedor = this.proveedoresService.returnData();
  }

  borrarProv(proveedor: Proveedores) {
    const confirmacion = confirm(`¿Esta seguro de borrar el proveedor? ${proveedor.RazonSocial}`)
    if (confirmacion) {
      // this.articulo = this.articulo.filter(a => a.codigo != articulo.codigo); // muestra todos los articulos con el codigo diferente al seleccionado
      this.proveedoresService.eliminar(proveedor);
    }
  }
  
  seleccionarProv(proveedor: Proveedores) {
    this.proveedorSeleccionado = {
      ...proveedor
    };

    // this.articuloSeleccionadoMostrar.emit(this.articuloSeleccionado);
    //this.router.navigate([`modificarArticulo/${articulo.codigo}`]);
  }

}
