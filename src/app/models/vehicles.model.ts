import { Films } from './films.modul';
import { People } from './people.model';

export interface Vehicles {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: number;
    max_atmosphering_speed: number;
    crew: number;
    passengers: number;
    cargo_capacity: number;
    consumables: string;
    pilots?: People[];
    films?: Films[];
}