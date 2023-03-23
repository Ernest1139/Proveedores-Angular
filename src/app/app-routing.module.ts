import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TablaComponent } from './tabla/tabla.component';
import { FormularioComponent } from './formulario/formulario.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes : Routes = [
  { path: 'articulos', component: TablaComponent},
  { path: 'agregararticulo', component: FormularioComponent},
  { path: 'modificarArticulo/:id', component: FormularioComponent},
  { path: '**', redirectTo : ''}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
