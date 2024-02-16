import type IProjeto from "@/interfaces/IProjeto";
import type { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { v4 as uuidv4 } from 'uuid';
import { type INotificacao } from "@/interfaces/INotificacao";

export interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}//Aqui foi criado o estado projeto que recebe listas de IProjeto

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: uuidv4(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        }, //Mutação de estado que adiciona um novo projeto com base no nome do projeto que recebe na chamada da mutation e no date do momento de criação
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },//Mutação de estado que altera um projeto, criando uma constantante que recebe o estado do projeto filtrado pelo id do projeto recebido e depois subistitui esse projeto que está na lista pelo que foi recebido na chamada da mutation
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = uuidv4(),
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}