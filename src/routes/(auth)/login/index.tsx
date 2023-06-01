import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$((data, { cookie, redirect }) => {
    const { email, password } = data;
    
    if( email === 'andres@gmail.com' && password === '123456') {
        cookie.set('jwt','mi_jwt_pokemon', { secure: true, path: '/' });
        redirect(302, '/');
        return {
            success: true,
            jwt: 'mi_jwt_pokemon',
        }
    }

    return {
        success: false,
    }
}, zod$({
    email: z.string().email('Invalid format'),
    password: z.string().min(6,'Minimum 6 letters')
}));
//https://zod.dev/

export default component$(() => {

    useStylesScoped$(styles);

    const actionForm = useLoginUserAction();

    return (
        <Form action={ actionForm } class="login-form mt-5">
            <div class="relative">
                <input 
                    name="email" 
                    type="text" 
                    placeholder="Email address" 
                />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type="submit">Sing in</button>
            </div>


            <code>
                { JSON.stringify( actionForm.value, undefined , 2 ) }
            </code>
        </Form>
    )
});