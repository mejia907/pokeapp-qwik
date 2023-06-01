import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState{
 pokemonId: number;
 pokemonName: string;
 pokemonType: string;
 showBackImage: boolean;
 isPokemonVisible:boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');