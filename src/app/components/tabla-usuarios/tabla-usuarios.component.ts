import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})

export class TablaUsuariosComponent implements OnInit {
  
  datos: any;
  constructor(private servicio: UsersService) { }

  ngOnInit(): void {
    this.servicio.obtenerDatos().subscribe(data => {
      this.datos = data;
      console.log(this.datos);
    });
  }

}
