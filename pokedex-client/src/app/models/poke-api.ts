import { Pokemon } from './pokemon';

export interface PokeApi {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}
