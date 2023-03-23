import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Proveedores } from '../interface/Proveedores';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-formulario-proveedores',
  templateUrl: './formulario-proveedores.component.html',
  styleUrls: ['./formulario-proveedores.component.css']
})
export class FormularioProveedoresComponent {

  @Input() proveedorSeleccionado : Proveedores = {
    Id : 0,
    CodigoProveedor : '',
    RazonSocial : '',
    RFC: '',
    Direccion : '',
    Email : ''
  }
  
  status : string = "";


  constructor(private proveedoresService : ProveedoresService,
              private activateRoute : ActivatedRoute,
              private router : Router){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      console.log(params["id"]);
      const id : number = params["id"];
      this.status = id == undefined ? "agregar" : "modificar";

      this.proveedorSeleccionado = id == undefined ? this.proveedorSeleccionado : this.proveedoresService.seleccionar(id);
    })
    
  }

  alerta : boolean = false;

  mensajeAlerta : string = "";
  agregar() {
    if (this.proveedorSeleccionado.Id == 0 || this.proveedorSeleccionado.CodigoProveedor == '' || this.proveedorSeleccionado.RazonSocial == '' ||  this.proveedorSeleccionado.RFC == '' ||  this.proveedorSeleccionado.Direccion == '' ||  this.proveedorSeleccionado.Email == ''  ) {
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

    if(this.proveedoresService.validacion(this.proveedorSeleccionado)){
      this.alerta = true;
      this.mensajeAlerta = "No pueden existir dos articulos con el mismo codigo";
      return;
    }

    this.proveedoresService.agregar({
      ...this.proveedorSeleccionado
    });
    this.proveedorSeleccionado = {
      Id : 0,
      CodigoProveedor : '',
      RazonSocial : '',
      RFC: '',
      Direccion : '',
      Email : ''
    }
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
      title: '¿Seguro que quieres modificar la información del proveedor?',
      text: "Esta acción no es reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Modificar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedoresService.modificar(this.proveedorSeleccionado);
        this.router.navigate(['/proveedores']);
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
    this.proveedorSeleccionado.Id = 0;
    this.proveedorSeleccionado.CodigoProveedor = "";
    this.proveedorSeleccionado.RazonSocial = "";
    this.proveedorSeleccionado.RFC = "";
    this.proveedorSeleccionado.Direccion = "";
    this.proveedorSeleccionado.Email = "";
  }

  regresar(){
    this.router.navigate(['/proveedores']);
  }
}
