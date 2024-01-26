import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonasbinService } from 'src/app/services/personasbin.service';
import Swal from 'sweetalert2'
import { Persona } from '../../Entity/Persona';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-identificacion-form',
  templateUrl: './identificacion-form.component.html',
  styleUrls: ['./identificacion-form.component.css']
})
export class IdentificacionFormComponent implements OnInit {

  constructor(private router: Router, private servicio: PersonasbinService, private http: HttpClient) { }

  ngOnInit():void {
  }

  persona: Persona = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    curp: '',
    rfc: '',
    codigoPostal: '',
    calle: '',
    numExterior: '',
    numInterior: '',
    estado: '',
    delegacion: '',
    colonia: ''
  };


  curpInvalid = false;
  rfcPattern = /^[A-Za-z]{4}\d{6}[A-Za-z\d]{3}$/;
  rfcErrorMessage = '';
  codigoPostalPattern = /^\d{5}$/; // Expresión regular para código postal de 5 dígitos
  codigoPostalErrorMessage = '';
  numExteriorErrorMessage = 'El Numero Exterior solo debe contener 5 números';
  inputNumberErrorMessage = 'El Numero Exterior solo debe contener 5 números';
  camposValidos = false;
  camposCompletos = false;
  campoFaltante = '';
  camposVacios: string[] = [];

  //SOLO ADMITIR TEXTO
  limitarCaracteres(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^A-Za-z]/g, '');
  }

  //VALIDACION DE CURP
  validarCurp(event: any) {
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/;

    if (!curpRegex.test(event.target.value)) {
      this.curpInvalid = true;
    } else {
      this.curpInvalid = false;
    }
  }

  //RFC
validarRFC(event: any) {
    const inputValue = event.target.value;

    // Ocultar el mensaje de error si el RFC está vacío
    if (inputValue.trim() === '') {
      this.rfcErrorMessage = '';
      return;
    }

    // Validar el RFC
    if (!this.rfcPattern.test(inputValue)) {
      this.rfcErrorMessage = 'El RFC no tiene el formato correcto';
    } else {
      this.rfcErrorMessage = '';
    }}

  validarInputNumbers(event: any) {
    let inputValue = event.target.value;

    // Limitar la longitud del código postal a 5 caracteres
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5);
      event.target.value = inputValue;
    }
  }


  validarCampos() {
    this.camposValidos = !this.curpInvalid && !this.rfcErrorMessage && !this.codigoPostalErrorMessage;
    //this.camposCompletos = this.verificarCamposCompletos();
  }


  mostrarMensaje() {
    if (this.camposValidos && this.camposCompletos) {
      console.log('Ingresa al valid campos pop')
      this.save();
      Swal.fire({
        icon: "success",
        title: "Campos validados correctamente..",
      });

    } else {
      if (this.camposVacios.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Existen campos por validar..",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Existen campos por validar..",
        });      }
    }
  }

  validarCamposCompletos(): boolean {
    const campos = ['nombre', 'apellido1', 'apellido2', 'curp', 'rfc', 'codigoPostal', 'calle', 'numExterior', 'numInterior', 'estado', 'delegacion', 'colonia'];
  
    for (const campo of campos) {
      const valor = (<HTMLInputElement>document.getElementById(campo)).value;
      if (!valor.trim()) {
        this.campoFaltante = campo;
        return false;
      }
    }

    this.campoFaltante = ''; // Restablecer campoFaltante si todos los campos están completos
    return true;
  }




  guardar() {
    this.validarCampos();
    this.camposCompletos = this.validarCamposCompletos();
    this.validarCamposVacios();
    this.mostrarMensaje();
  }

  validarCamposVacios(): void {
    const campos = ['nombre', 'apellido1', 'apellido2', 'curp', 'rfc', 'codigoPostal', 'calle', 'numExterior', 'numInterior', 'estado', 'delegacion', 'colonia'];
  
    this.camposVacios = [];

    for (const campo of campos) {
      const valor = (<HTMLInputElement>document.getElementById(campo)).value;
      if (!valor.trim()) {
        this.camposVacios.push(campo);
      }
    }
  }


  guardarDatos(formulario: { value: Persona }) {
    // Accede a los datos ingresados de manera tipada
    console.log(formulario.value);

    // También puedes acceder a this.datos
    console.log(this.persona);
  }

  save() {
    // Crear la estructura deseada para enviar al servidor
    const datosAEnviar = {
      infoUsuario: {
        nombre: this.persona.nombre,
        apellido1: this.persona.apellido1,
        apellido2: this.persona.apellido2,
        curp: this.persona.curp,
        rfc: this.persona.rfc,
      },
      Domicilio: {
        codigoPostal: this.persona.codigoPostal,
        calle: this.persona.calle,
        numExterior: this.persona.numExterior,
        numInterior: this.persona.numInterior,
        estado: this.persona.estado,
        delegacion: this.persona.delegacion,
        colonia: this.persona.colonia,
      },
    };
  console.log(datosAEnviar)


    // Enviar los datos al servicio PersonasbinService
    this.servicio.guardarP(datosAEnviar).subscribe(
      (data: any) => {
        console.log('Respuesta del servidor:', data);
        // Aquí puedes manejar la respuesta del servidor, mostrar mensajes, etc.
      },
      (error) => {
        console.error('Error al enviar los datos:', error);
        // Aquí puedes manejar errores, mostrar mensajes de error, etc.
      }
    );
  }

  }  
  
