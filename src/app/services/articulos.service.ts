import { Injectable } from '@angular/core';
import { Articulos } from '../interface/Articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor() { }

  articulo: Articulos [] = [
    { codigo : "1", descripcion : "papa", precio : 10.55},
    { codigo : "2", descripcion : "manzana", precio : 12.01},
    { codigo : "3", descripcion : "melon", precio : 52.23},
    { codigo : "4", descripcion : "cebolla", precio : 17},
    { codigo : "5", descripcion : "calabaza", precio : 23}
  ]

  returnData(){
    return this.articulo;
  }

  validacion(articulos : Articulos) : boolean{
    const buscar = this.articulo.filter(a => a.codigo == articulos.codigo)
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

  agregar(articulos : Articulos){
    this.articulo.push(articulos);
  }

  seleccionar(codigo : string) : Articulos {
    return this.articulo.find(art => art.codigo == codigo)!;
  }
  
  getIndex(articulos: Articulos){
    let index = 0;
    this.articulo.forEach(art => {
      if(articulos.codigo == art.codigo){
        index = this.articulo.indexOf(art);
      }
    });
    return index;
  }
  
  modificar(articulos : Articulos){
    const index = this.getIndex(articulos)  
    this.articulo[index] = {...articulos};

  }

 eliminar(articulos : Articulos){
  const index = this.getIndex(articulos);
  this.articulo.splice(index,1);

 }

}
