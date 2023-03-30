import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Articulos } from '../interface/Articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  articulo: Articulos [] = [
    //{ Codigo : "1", Descripcion : "papa", Precio : 10.55},
    //{ Codigo : "2", Descripcion : "manzana", Precio : 12.01},
    //{ Codigo : "3", Descripcion : "melon", Precio : 52.23},
    //{ Codigo : "4", Descripcion : "cebolla", Precio : 17},
    //{ Codigo : "5", Descripcion : "calabaza", Precio : 23}
  ]

  baseUrl : string = "http://localhost:3000/api/productos/"

  constructor(private http: HttpClient) {
    
  }

  returnData() : Observable<Articulos[]>{ // Preparar el Observable
    //return this.articulo;
    return this.http.get<Articulos[]>(this.baseUrl)
  }

  validacion(articulos : Articulos) : boolean{
    const buscar = this.articulo.filter(a => a.Codigo == articulos.Codigo)
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

  agregar(articulos : Articulos) : Observable<any>{
    //this.articulo.push(articulos);
    const headers = { 'Content-type' : 'application/json'};
    const body = JSON.stringify(articulos);
    return this.http.post(this.baseUrl,body,{ 'headers' : headers});
  }

  seleccionar(Id : string) : Observable<any> {
    //return this.articulo.find(art => art.Codigo == Id)!;
    return this.http.get(this.baseUrl+Id);
  }
  
  getIndex(articulos: Articulos){
    let index = 0;
    this.articulo.forEach(art => {
      if(articulos.Codigo == art.Codigo){
        index = this.articulo.indexOf(art);
      }
    });
    return index;
  }
  
  modificar(articulos : Articulos) : Observable<any>{
    //const index = this.getIndex(articulos)  
    //this.articulo[index] = {...articulos};
    const headers = { 'Content-type' : 'application/json'};
    const body = JSON.stringify(articulos);
    return this.http.put(this.baseUrl+articulos.Id,body,{ 'headers' : headers});
  }

 eliminar(articulos : Articulos) : Observable<any>{
  // const index = this.getIndex(articulos);
  // this.articulo.splice(index,1);
  return this.http.delete(this.baseUrl + articulos.Id);
 }

}
