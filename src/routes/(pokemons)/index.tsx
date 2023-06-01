import { $, component$ } from '@builder.io/qwik';
import { type DocumentHead,  useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemos/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';


export default component$(() => {

  // const pokemonId = useSignal(1);
  // const showBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(true);

  //Utilizar el contexto global
  // const pokemonGame = useContext(PokemonGameContext);


  const nav = useNavigate();
  const {
    pokemonId,
    pokemonName,
    pokemonType,
    isPokemonVisible,
    showBackImage,
    nextPokemon,
    prevPokemon,
    toggleVisible,
    toggleFromBack,
  } = usePokemonGame();
 
  // const changePokemonId = $((value: number) => {
  //   if((pokemonGame.pokemonId+value) <=0) return;
  //   pokemonGame.pokemonId+=value;
  // })

  const goToPokemon =  $(() =>  {
    nav(`/pokemon/${ pokemonId.value }`);
  });

  return (
    <>
      <span class="text-2xl"> 
        Search Simple 
      </span>


      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      {/* <div onClick$={ () =>  goToPokemon() } class={'cursor-pointer'}>
        <PokemonImage 
          id={ pokemonId.value }  
          backImage={ showBackImage.value } 
          isVisible={ isPokemonVisible.value } 
        />
      </div> */}

      <div class={`w-full max-w-sm bg-${ pokemonType.value } border border-gray-200 rounded-lg shadow  mt-4 text-center`} >
        <div class="text-5xl mt-5 text-white pb-5"> 
          #{ pokemonId.value }
        </div>
    
        <div class="flex flex-wrap justify-center">
          <div class="w-6/12 sm:w-4/12 px-2 rounded-full bg-white cursor-pointer"  onClick$={ () =>  goToPokemon() }>
            <PokemonImage 
              id={ pokemonId.value }  
              backImage={ showBackImage.value } 
              isVisible={ isPokemonVisible.value } 
              size={130}
            />
          </div>
        </div>    
        <div class="mt-4 mb-5">
        {(isPokemonVisible.value) 
          ?
            <h5 class="text-2xl font-semibold tracking-tight text-white capitalize" >
              { pokemonName.value} 
            </h5>
          :
            <span></span>
        }
        </div>
      </div>

      <div class="mt-6">
        <button onClick$={ prevPokemon } class="btn btn-primary mr-2">
          Previou
        </button>
        <button onClick$={ nextPokemon } class="btn btn-primary mr-2">
          Next
        </button>
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

export const head: DocumentHead = {
  title: 'Poke - Qwik',
  meta: [
    {
      name: 'description',
      content: 'Primera aplicacion en Qwik',
    },
  ],
};
