import { type PropFunction, Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props{
 showModal: boolean;
 size: 'sm' | 'md' | 'lg';
 closeModal: PropFunction<() => void>;
}

export const Modal = component$( ({ showModal, closeModal, size = 'md' }: Props) => {

    useStylesScoped$(ModalStyles);

    return (
        // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
        <div onClick$={ closeModal }  class={ showModal ? "modal-background": "hidden" }>
            <div class={["modal-content", `modal-${size}`]} onClick$={ e => e.stopPropagation() }>
                
                <div class="mt-3 text-center">
                    
                    <h3 class="modal-title">
                     <Slot name='title' />
                    </h3>

                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                        <Slot name='content' />
                        </div>
                    </div>


                    {/* Botton */}
                    <div class="items-center px-4 py-3">
                        <button
                        onClick$={ closeModal }
                            id="ok-btn"
                            class="modal-button"
                        >
                            Cerrar
                        </button>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
});