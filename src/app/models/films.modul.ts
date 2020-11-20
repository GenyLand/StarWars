import { People } from './people.model';
import { Planets } from './planets.model';
import { Species } from './species.model';
import { Starships } from './starships.model';
import { Vehicles } from './vehicles.model';

export interface Films {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters?: People[];
    planets?: Planets[];
    starships?: Starships[];
    vehicles?: Vehicles[];
    species?: Species[];
}