import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

   ///Se crea un estado incial en una señal
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    pokemonName: '',
    pokemonType: 'grass',
    isPokemonVisible: false,
    showBackImage: false,
  });

  ///Se crea un estado incial en una señal
  const pokemonListClient = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  //se asigna un espacio para guardar datos a nivel global
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonListClient);

  useVisibleTask$(() => {
    //Leer localStorage
    if(localStorage.getItem('pokemon-game')){
      const { isPokemonVisible = true, pokemonId = 1, pokemonName = '', pokemonType = 'grass', showBackImage = false } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;

      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.pokemonName = pokemonName;
      pokemonGame.pokemonType = pokemonType;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    //determinar las variables para que detecte algun cambio en ellas ye jecutar la tarea
    track(() => [pokemonGame.pokemonId, pokemonGame.pokemonName, pokemonGame.pokemonType, pokemonGame.isPokemonVisible, pokemonGame.showBackImage]);
    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  })

  return <Slot />
});