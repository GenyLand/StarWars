import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StarWarsService } from '../services/starWars.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  columns = ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StarWarsService) { }

  ngOnInit() {
    this.dataSource =new MatTableDataSource();
    this.getInit();
  }

  getInit(): void {
    this.service.getPeople().subscribe(res => {
      this.service.starWars = res;
      this.getPeopleAll();
    })
  }

  private getPeopleAll(): void {
    if (this.service.starWars.next !== null) {
      this.service.getUrlAll(this.service.starWars.next).subscribe(res => {
        this.service.starWars.next = res.next;
        this.service.starWars.results = this.service.starWars.results.concat(res.results);
        this.getPeopleAll();
      });
    } else {
      this.dataSource.data = this.service.starWars.results;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
