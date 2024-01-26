export class Persona {
    nombre!: string;
    apellido1!: string;
    apellido2!: string;
    curp!: string;
    rfc!: string;
    codigoPostal!: string;
    calle!: string;
    numExterior!: string;
    numInterior!: string;
    estado!: string;
    delegacion!: string;
    colonia!: string;
    
    infoUsuario?: {
      nombre: string;
      apellido1: string;
      apellido2: string;
      curp: string;
      rfc: string;
    };
    Domicilio?: {
      codigoPostal: string;
      calle: string;
      numExterior: string;
      numInterior: string;
      estado: string;
      delegacion: string;
      colonia: string;
    };
  }
  

  