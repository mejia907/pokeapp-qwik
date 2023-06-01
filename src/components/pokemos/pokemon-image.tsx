﻿import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props{
 id: number | string;
 size?: number;
 backImage?: boolean;
 isVisible?: boolean;
}

export const PokemonImage = component$(({
 id,
 size = 200, 
 backImage, 
 isVisible,
}: Props) => {
const imageLoaded = useSignal(false);
///Permite detectar un cambio
useTask$(({track}) => {
 track(() => id);
 imageLoaded.value=false;
});

const urlImage = useComputed$(() => {
 if(id === '') return '';
 return (backImage) ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
})

 return (
  <div class="flex items-center justify-center" style={{ height:`${size}px` }}> 

   { !imageLoaded.value && (<span>Cargando...</span>) }

   <img src={ urlImage.value } width={ size } height={ size } onLoad$={ () => imageLoaded.value = true } class={[{ 'hidden': !imageLoaded.value, 'brightness-0': !isVisible }, 'transition-all', 'zoom']} />
   
  </div>
 );
});