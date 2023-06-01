import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Navbar } from '~/components/shared';

export const ueCheckAuthCookie = routeLoader$(( { cookie, redirect } ) =>{
  const jwtCookie = cookie.get('jwt');
  if(jwtCookie){
    return;
  }
  redirect(302,'/login');
})

export default component$(() => {
  return (
   <>
    <Navbar/>
    <div class="flex flex-col justify-center items-center mt-7">
      <span class="text-5xl"> Dashboard</span>
    </div>
    <Slot/>
   </>

  )
});