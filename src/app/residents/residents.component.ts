import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { People } from '../models/people.model';
import { StarWars } from '../models/starWars.model';
import { StarWarsService } from '../services/starWars.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  columns = ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
  planets: StarWars;
  residents: People[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: StarWarsService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getPlanets();
  }

  private getPlanets(): void {
    this.service.getPlanets().subscribe(res => {
      this.planets = res;
      this.getPlanetsAll();
    });
  }

  private getPlanetsAll(): void {
    if(this.planets.next !== null) {
      this.service.getUrlAll(this.planets.next).subscribe(res => {
        this.planets.next = res.next;
        this.planets.results = this.planets.results.concat(res.results);
        this.getPlanetsAll();
      });
    } else {
      let planet: any[] = [];
      let final: any[] = [];
      this.planets.results.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      this.planets.results.forEach(result => {
        if (result.residents.length > 0) {
          planet = planet.concat(result.residents);
        }
      });
      planet.forEach(result => {
        this.service.starWars.results.forEach(res => {
          if (result === res.url)
            final.push(res);
        })
      });
      this.dataSource.data = final;
      this.dataSource.paginator = this.paginator;
    }
  }
}
