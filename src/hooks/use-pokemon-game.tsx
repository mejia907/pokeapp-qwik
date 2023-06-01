import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";
import { getPokemon } from "~/helpers/get-data-pokemon";


export const usePokemonGame = () => {

 const pokemonGame = useContext(PokemonGameContext);

 const changePokemonId = $((value: number) => {
  if((pokemonGame.pokemonId+value) <=0) return;
  pokemonGame.pokemonId+=value;
  const pokemon = getPokemon(pokemonGame.pokemonId);
  pokemon.then((data) => {
    pokemonGame.pokemonName = data.name;
    pokemonGame.pokemonType = data.type;
  });
 })

 const toogleFromBack = $(() => {
  pokemonGame.showBackImage = !pokemonGame.showBackImage;
 })

 const toogleVisible = $(() => {
  pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  if(pokemonGame.isPokemonVisible && pokemonGame.pokemonId == 1 ){
   const pokemon = getPokemon(pokemonGame.pokemonId);
   pokemon.then((data) => {
    pokemonGame.pokemonName = data.name;
  });
  }
 })

 

 return {
  nextPokemon: $(() => changePokemonId(+1)),
  prevPokemon: $(() => changePokemonId(-1)),
  pokemonId:  useComputed$(() => pokemonGame.pokemonId),
  pokemonName : useComputed$(() => pokemonGame.pokemonName),
  pokemonType : useComputed$(() => pokemonGame.pokemonType),
  showBackImage:  useComputed$(() => pokemonGame.showBackImage),
  isPokemonVisible:  useComputed$(() => pokemonGame.isPokemonVisible),
  toggleFromBack: toogleFromBack,
  toggleVisible: toogleVisible,
 }

}