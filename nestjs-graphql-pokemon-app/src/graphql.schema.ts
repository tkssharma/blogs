
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class League {
    id: string;
    name: string;
    pokemons?: Nullable<Pokemon[]>;
}

export abstract class IQuery {
    abstract leagues(): Nullable<League[]> | Promise<Nullable<League[]>>;

    abstract league(id?: Nullable<string>): League | Promise<League>;

    abstract pokemons(): Nullable<Pokemon[]> | Promise<Nullable<Pokemon[]>>;

    abstract pokemon(id?: Nullable<string>): Pokemon | Promise<Pokemon>;
}

export abstract class IMutation {
    abstract createLeague(name: string): Nullable<League> | Promise<Nullable<League>>;

    abstract updateLeague(id: string, name: string): Nullable<League> | Promise<Nullable<League>>;

    abstract deleteLeague(id?: Nullable<string>): Nullable<Deleted> | Promise<Nullable<Deleted>>;

    abstract create(name: string, type: string): Nullable<Pokemon> | Promise<Nullable<Pokemon>>;

    abstract update(id: string, name: string, type: string): Nullable<Pokemon> | Promise<Nullable<Pokemon>>;

    abstract delete(id: string): Nullable<Deleted> | Promise<Nullable<Deleted>>;

    abstract assign(id: string, leagueId: string): Nullable<Pokemon> | Promise<Nullable<Pokemon>>;
}

export class Pokemon {
    id: string;
    name: string;
    type: string;
    league?: Nullable<League>;
}

export class Deleted {
    delete: boolean;
}

type Nullable<T> = T | null;
