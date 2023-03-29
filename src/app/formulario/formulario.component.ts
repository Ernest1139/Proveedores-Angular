import { Component, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Articulos } from '../interface/Articulos';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  @Input() articuloSeleccionado : Articulos = {
    Id : 0,
    Codigo : '',
    Descripcion : '',
    Precio : 0
  }
  
  status : string = "";


  constructor(private articulosService : ArticulosService,
              private activateRoute : ActivatedRoute,
              private router : Router){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      console.log(params["id"]);
      const id : string = params["id"];
      this.status = id == undefined ? "agregar" : "modificar";

      this.articuloSeleccionado = id == undefined ? this.articuloSeleccionado : this.articulosService.seleccionar(id);
    })
    
  }

  alerta : boolean = false;

  mensajeAlerta : string = "";
  agregar() {
    if (this.articuloSeleccionado.Codigo == '' || this.articuloSeleccionado.Descripcion == '') {
      this.alerta = true;
      this.mensajeAlerta = "Llene todos los campos";
      return;
    }
    // const buscar = this.articulo.filter(a => a.codigo == this.articuloSeleccionado.codigo)
    // if (buscar.length != 0) {
    //   // alert("No pueden existir dos articulos con el mismo codigo");
    //   this.alerta = true;
    //   this.mensajeAlerta = "No pueden existir dos articulos con el mismo codigo";
    //   return;
    // }

    if(this.articulosService.validacion(this.articuloSeleccionado)){
      this.alerta = true;
      this.mensajeAlerta = "No pueden existir dos articulos con el mismo codigo";
      return;
    }

    // this.articulosService.agregar({
    //   ...this.articuloSeleccionado
    // });

    this.articulosService.agregar(({...this.articuloSeleccionado})).subscribe(data=>{
      console.log(data)
      this.articuloSeleccionado = {
        Codigo: '',
        Descripcion: '',
        Precio: 0
      }
    });

  }

  modificar() {
    // this.articulo = this.articulo.map(articulo => {
    //   if (articulo.codigo != this.articuloSeleccionado.codigo)
    //     return articulo
    //   else
    //     return {
    //       ...this.articuloSeleccionado
    //     }
    // });
    Swal.fire({
      title: '¿Seguro que quieres modificar el producto?',
      text: "Esta acción no es reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Modificar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articulosService.modificar(this.articuloSeleccionado);
        this.router.navigate(['/articulos']);
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }

  cerrar(){
    this.alerta = false;
  }

  limpiar(){
    this.articuloSeleccionado.Codigo = "";
    this.articuloSeleccionado.Descripcion = "";
    this.articuloSeleccionado.Precio = 0;
  }

  regresar(){
    this.router.navigate(['/articulos']);
  }

}
