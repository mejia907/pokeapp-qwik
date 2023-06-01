import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemos/pokemon-image';
import { Modal } from '~/components/shared';
import { getOpenAiAboutPokemon } from '~/helpers/get-chat-openai-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

//Permite cargar antes de que se renderice al componente
export const usePokemonList = routeLoader$<SmallPokemon[]>(async({query, redirect, pathname})=>{

  const offset = Number(query.get('offset') || '0');
  if(isNaN(offset)) redirect(301, pathname);
  if(offset < 0) redirect(301, pathname);

  return await getSmallPokemons(offset);

});

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();
  const modalVisible = useSignal(false);
  const modalDataPokemon = useStore({
    id: '',
    name: '',
  });
  const openAiResponsePokemon = useSignal('');
  

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get('offset');
    const offsetString = new URLSearchParams(location.url.search).get('offset') || 0;
    return Number(offsetString);

  });

  const showModal = $(( id:string, name:string ) => {
    modalDataPokemon.id = id;
    modalDataPokemon.name = name;
    modalVisible.value = true;
  })

  const closeModal = $(() => {
    modalVisible.value = false;
  })

  //Detectar un cambio en el modal para realizar peticiond de OpenAI
  useVisibleTask$(( { track }) => {
    track(() => modalDataPokemon.name);
    openAiResponsePokemon.value = '';
    if(modalDataPokemon.name.length > 0) {
      getOpenAiAboutPokemon(modalDataPokemon.name).then((response) =>  openAiResponsePokemon.value = response);
    }
  })

  return (
  <>
    <div class="flex flex-col">
      <span class="my-5 text-5xl"> Status</span>
      <span>Current page: {currentOffset}</span>
      <span class="mt-2">Is loading page: {location.isNavigating ? 'Si' : 'No'}</span>
    </div>
    <div class="mt-10">
      <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 12}`} class="btn btn-primary mr-2">
        Previous
      </Link>
      <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 12}`} class="btn btn-primary mr-2">
        Next
      </Link>
    </div>
    <div class="grid sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 mt-5">
      {
        pokemons.value.map(({id, name, type})=>(
          <div key={id} onClick$={ () => showModal(id, name) } class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id}  size={150} isVisible/>
            <span class={`inline-flex items-center rounded-md bg-${type} px-2 py-1 font-medium ring-1 ring-inset capitalize text-sm`}>
              {id}. {name}
            </span>
          </div>
        ))
      }
    </div>

     
    <Modal showModal={ modalVisible.value } closeModal={ closeModal } size='md'>
      <div q:slot='title'> { modalDataPokemon.name } </div>
      <div q:slot='content' class="flex flex-col justify-center items-center">
        <PokemonImage id={ modalDataPokemon.id } isVisible />
        { openAiResponsePokemon.value === '' 
          ? <>
              <span>Preguntandole a OpenAI</span> <img src='/images/loading.gif' height={40} width={40}/> 
            </>
          : <span> { openAiResponsePokemon } </span>
        }
      </div>
    </Modal>
  </>
  )
});

export const head: DocumentHead={
  title: 'List - SSR'
}