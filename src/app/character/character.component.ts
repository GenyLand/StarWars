import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Films } from '../models/films.modul';
import { People } from '../models/people.model';
import { Planets } from '../models/planets.model';
import { Species } from '../models/species.model';
import { Starships } from '../models/starships.model';
import { Vehicles } from '../models/vehicles.model';
import { StarWarsService } from '../services/starWars.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  dataSourceFilms: MatTableDataSource<Films>;
  columnsFilms = ['title', 'episode', 'opening', 'director', 'producer', 'release'];
  dataSourceSpecies: MatTableDataSource<Species>;
  columnsSpecies = ['title', 'classification', 'designation', 'average', 'skin', 'hair', 'eye', 'lifespan', 'language'];
  dataSourceVehicles: MatTableDataSource<Vehicles>;
  columnsVehicles = ['name', 'model', 'manufacturer', 'credits', 'length', 'atmosphering', 'crew', 'passengers', 'cargo', 'consumables', 'vehicle'];
  dataSourceStarShips: MatTableDataSource<Starships>;
  columnsStarShips = ['name', 'model', 'manufacturer', 'credits', 'length', 'atmosphering', 'crew', 'passengers', 'cargo', 'consumables', 'hyperdrive', 'mglt', 'starship'];
  peoples: People[];
  people: People;
  homeworld: Planets;
  films: Films[] = [];
  species: Species[] = [];
  vehicles: Vehicles[] = [];
  starShips: Starships[] = [];

  constructor(public service: StarWarsService) { }

  ngOnInit() {
    this.dataSourceFilms = new MatTableDataSource();
    this.dataSourceSpecies = new MatTableDataSource();
    this.dataSourceVehicles = new MatTableDataSource();
    this.dataSourceStarShips = new MatTableDataSource();
    this.peoples = this.service.starWars.results;
  }

  getPeople(people: People): void {
    if (people === null) {
      this.people = null;
      this.dataSourceFilms.data = [];
      this.dataSourceSpecies.data = [];
      this.dataSourceVehicles.data = [];
      this.dataSourceStarShips.data = [];
      this.homeworld = null;
    } else {
      this.people = people;
      this.getFilms();
      this.getSpecies();
      this.getVehicles();
      this.getStarships();
      this.getHomeworld();
    }
  }

  private getFilms(): void {
    this.dataSourceFilms.data = [];
    if (this.people.films) {
      this.people.films.forEach((result) => {
        this.service.getUrlAll(result).subscribe((res) => {
          this.films.push(res);
          this.dataSourceFilms.data = this.films;
        });
      });
    }
  }

  private getSpecies(): void {
    this.dataSourceSpecies.data = [];
    if (this.people.species) {
      this.people.species.forEach((result) => {
        this.service.getUrlAll(result).subscribe((res) => {
          this.species.push(res);
          this.dataSourceSpecies.data = this.species;
        });
      });
    }
  }

  private getVehicles(): void {
    this.dataSourceVehicles.data = [];
    if (this.people.vehicles) {
      this.people.vehicles.forEach((result) => {
        this.service.getUrlAll(result).subscribe((res) => {
          this.vehicles.push(res);
          this.dataSourceVehicles.data = this.vehicles;
        });
      });
    }
  }

  private getStarships(): void {
    this.dataSourceStarShips.data = [];
    if (this.people.starships) {
      this.people.starships.forEach((result) => {
        this.service.getUrlAll(result).subscribe((res) => {
          this.starShips.push(res);
          this.dataSourceStarShips.data = this.starShips;
        });
      });
    }
  }

  private getHomeworld(): void  {
    this.homeworld = null;
    if (this.people.homeworld) {
      this.service.getUrlAll(this.people.homeworld).subscribe((res) => {
        this.homeworld = res;
      });
    }
  }
}
