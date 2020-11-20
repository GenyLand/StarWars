import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { CharactersComponent } from './characters/characters.component';
import { ResidentsComponent } from './residents/residents.component';

const routes: Routes = [
  { path: 'personajes', component: CharactersComponent },
  { path: 'personaje', component: CharacterComponent },
  { path: 'residentes', component: ResidentsComponent },
  { path: '', redirectTo: '/personajes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
