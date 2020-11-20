import { Films } from './films.modul';
import { People } from './people.model';
import { Planets } from './planets.model';

export interface Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    language: string;
    homeworld?: Planets[];
    people?: People[];
    films?: Films[];
}