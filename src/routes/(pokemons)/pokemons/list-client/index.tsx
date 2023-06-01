import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import { type DocumentHead, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemos/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';

export default component$(() => {
 
//  const pokemonState = useStore<PokemonPageState>({
//   currentPage: 0,
//   isLoading: true,
//   pokemons: [],
//  });
const pokemonList = useContext(PokemonListContext);
const location = useLocation();
 //Colocar una tarea que sea visible, solo del lado del cliente
 // useVisibleTask$(async ({track}) => {

 //  //Informar que cada vez q cambie el currentPage se actualice la funcion
 //  track(() => pokemonState.currentPage);
 //  const pokemons = await getSmallPokemons(pokemonState.currentPage *10);
 //  pokemonState.pokemons = pokemons;

 // });

 //se ejecuta del lado del cliente y del servidor
 useTask$(async ({track}) => {

  //Informar que cada vez q cambie el currentPage se actualice la funcion
  track(() => pokemonList.currentPage);

  // pokemonList.isLoading = true;

  const pokemons = await getSmallPokemons(pokemonList.currentPage * 20, 20);
  // pokemonState.pokemons = pokemons;

  pokemonList.pokemons = [...pokemonList.pokemons, ...pokemons];
  
  pokemonList.isLoading = false;

 });

 useOnDocument('scroll', $(()=>{
  const maxScroll = document.body.scrollHeight;
  const currentScroll = window.scrollY + window.innerHeight;
  
  if((currentScroll + 200) >= maxScroll && !pokemonList.isLoading){
    pokemonList.isLoading = true;
    pokemonList.currentPage++;
  }
 }))

 return ( 
 <>
  <div class="flex flex-col">
    <span class="my-5 text-5xl"> 
      Status
    </span>
    <span>
      Current page: {pokemonList.currentPage}
    </span>
    <span class="mt-2">
      Is loading page: {location.isNavigating ? 'Si' : 'No'}
    </span>
  </div>
  <div class="mt-10">
    {/* <button onClick$={ () => pokemonState.currentPage-- } class="btn btn-primary mr-2">
      Previous
    </button> */}
    <button onClick$={ () => pokemonList.currentPage++ } class="btn btn-primary mr-2">
      Next
    </button>
  </div>
  <div class="grid sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 mt-5">
    {
      pokemonList.pokemons.map(({id, name, type})=>(
        <div key={id} class="m-5 flex flex-col justify-center items-center">
          <PokemonImage id={id}  size={150} isVisible/>
          <span class={`inline-flex items-center rounded-md bg-${type} px-2 py-1 font-medium ring-1 ring-inset capitalize text-sm`}>
            {id}. {name}
          </span>
        </div>
      ))
    }
  </div>
 </>
 )
});

export const head: DocumentHead={
 title: 'List - Client'
}