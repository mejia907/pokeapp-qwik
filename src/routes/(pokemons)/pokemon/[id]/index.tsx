import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemos/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

//Permite cargar antes de que se renderice al componente
export const usePokemonId = routeLoader$<number>(({params, redirect}) => {
  const idPokemon = Number(params.id);
  if(isNaN(idPokemon)){
    redirect(301,'/');
  }
  if(idPokemon <=0 || idPokemon >=1010) redirect(301,'/');

  return idPokemon;
});

export default component$(() => {
  //Obtener los parametros de la URL
  // const location = useLocation();
  const pokemonId = usePokemonId();

  //Utilizar el contexto global
  // const pokemonGame = useContext(PokemonGameContext);
  const { isPokemonVisible, showBackImage, toggleVisible, toggleFromBack } = usePokemonGame();
  
  return (
   <>
    <span class="text-5xl">
      Pokemon: 
    </span>
    <span class="text-5xl mb-5"> 
      {/* N°{location.params.id} */}
      #{ pokemonId }
    </span>

    <PokemonImage
      // id={location.params.id}
      id = { pokemonId.value } 
      isVisible = { isPokemonVisible.value }
      backImage = { showBackImage.value }
      size={130}
    />
    <div class="mt-6">
      <button onClick$={ toggleFromBack } class="btn btn-primary  mr-2">
        Rotate
      </button>
      <button onClick$={ toggleVisible } class="btn btn-primary">
      { (!isPokemonVisible.value) ? 'Show' : 'Hidden' } 
      </button>
    </div>
   </>
  );
});