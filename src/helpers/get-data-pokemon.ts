import type { SmallPokemon, Pokemon } from "~/interfaces";

export const getPokemon = async(idPokemon: number = 1): Promise<SmallPokemon> => {

 const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${ idPokemon }`);
 const data = await resp.json() as Pokemon;

    return {
     id: data.id,
     name: data.name,
     type: data.types[0].type.name,
    }


}