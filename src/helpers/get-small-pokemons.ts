import type { SmallPokemon, PokemonListResponse } from "~/interfaces";
import { getPokemon } from "./get-data-pokemon";

export const getSmallPokemons = async(offset: number = 0, limit: number = 12): Promise<SmallPokemon[]> => {

 const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ limit }&offset=${ offset }`);
 const data = await resp.json() as PokemonListResponse;

return await Promise.all(

  data.results.map(async ({url, name}) => {
  const segments = url.split('/');
  const idPokemon = segments.at(-2)!;
  let type = '';

  const pokemon = await getPokemon(Number(idPokemon));
  if(Number(pokemon.id) === Number(idPokemon)){
   type = pokemon.type;
  }
  return {
   id: idPokemon,
   name: name,
   type: type
  }
 }))
}