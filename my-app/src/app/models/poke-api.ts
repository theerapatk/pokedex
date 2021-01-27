import { PokeApiResult } from "./poke-api-result";

export interface PokeApi {
    count: number;
    next: string;
    previous: string;
    results: PokeApiResult[]
}