import { Injectable } from '@angular/core';
import { Proveedores } from '../interface/Proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor() { }

  proveedor: Proveedores [] = [
    { Id : 1, CodigoProveedor : "1111", RazonSocial : "Ej.1 RS", RFC: "Ej.1 RFC", Direccion : "Calle 1 ej", Email : "correo1@ejem.com" },
    { Id : 2, CodigoProveedor : "2222", RazonSocial : "Ej.2 RS", RFC: "Ej.2 RFC", Direccion : "Calle 2 ej", Email : "correo2@ejem.com" },
    { Id : 3, CodigoProveedor : "3333", RazonSocial : "Ej.3 RS", RFC: "Ej.3 RFC", Direccion : "Calle 3 ej", Email : "correo3@ejem.com" },
    { Id : 4, CodigoProveedor : "4444", RazonSocial : "Ej.4 RS", RFC: "Ej.4 RFC", Direccion : "Calle 4 ej", Email : "correo4@ejem.com" },
    { Id : 5, CodigoProveedor : "5555", RazonSocial : "Ej.5 RS", RFC: "Ej.5 RFC", Direccion : "Calle 5 ej", Email : "correo5@ejem.com" }
  ]

  returnData(){
    return this.proveedor;
  }

  validacion(proveedores : Proveedores) : boolean{
    const buscar = this.proveedor.filter(p => p.Id == proveedores.Id)
    // if (buscar.length != 0) {
    //   alert("No pueden existir dos articulos con el mismo codigo");
    //   this.alerta = true;
    //   this.mensajeAlerta = "No pueden existir dos articulos con el mismo codigo";
    //   return;
    // }

    if (buscar.length != 0) {
      return true;
    }
    return false;

  }

  agregar(proveedores : Proveedores){
    this.proveedor.push(proveedores);
  }

  seleccionar(codigo : number) : Proveedores {
    return this.proveedor.find(prov => prov.Id == codigo)!;
  }
  
  getIndex(proveedores : Proveedores){
    let index = 0;
    this.proveedor.forEach(prov => {
      if(proveedores.Id == prov.Id){
        index = this.proveedor.indexOf(prov);
      }
    });
    return index;
  }
  
  modificar(proveedores : Proveedores){
    const index = this.getIndex(proveedores)  
    this.proveedor[index] = {...proveedores};

  }

 eliminar(proveedores : Proveedores){
  const index = this.getIndex(proveedores);
  this.proveedor.splice(index,1);

 }

}