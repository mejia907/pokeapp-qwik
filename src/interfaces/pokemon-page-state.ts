import type { SmallPokemon } from "./small-pokemon";

export interface PokemonPageState {
 currentPage: number;
 isLoading: boolean;
 pokemons: SmallPokemon[];
}