import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona, PersonaServ } from '../Entity/Persona';

@Injectable({
  providedIn: 'root'
})

export class PersonasbinService {


  constructor(private http: HttpClient) { }
  url = 'http://httpbin.org/';
  //url = 'http://httpbin.org/post';

  guardarP(persona:PersonaServ){
    //console.log(persona/*SERVICE/ */)
    return this.http.post<Persona>(this.url+"post", persona);
  }
}
