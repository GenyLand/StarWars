import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StarWars } from '../models/starWars.model';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  private starWarsAPI: string = 'https://swapi.dev/api/';
  starWars: StarWars;

constructor(private http: HttpClient) { }

getPeople(): Observable<StarWars> {
  return this.http.get<StarWars>(this.starWarsAPI+'people/');
}

getUrlAll(url: string): Observable<any> {
  return this.http.get<any>(url);
}

getPeopleById(id: number): Observable<any> {
  return this.http.get<any>(this.starWarsAPI+'people/'+id+'/');
}

getPlanets(): Observable<any> {
  return this.http.get<any>(this.starWarsAPI+'planets/');
}

}
