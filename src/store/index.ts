import type IProjeto from "@/interfaces/IProjeto";
import type { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from "vuex";

export interface Estado{
    projetos: IProjeto[]
}//Aqui foi criado o estado projeto que recebe listas de IProjeto

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state:{
        projetos: []
    },
    mutations:{
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            }as IProjeto
            state.projetos.push(projeto)
        }
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}