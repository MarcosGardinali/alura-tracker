import type { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { v4 as uuidv4 } from 'uuid';
import { type INotificacao } from "@/interfaces/INotificacao";
import { projeto, type EstadoDoProjeto } from './modulos/projeto';
import { tarefa, type EstadoDaTarefa } from './modulos/tarefa';

export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoDoProjeto,
    tarefa: EstadoDaTarefa
}//Aqui foi criado o estado projeto que recebe listas de IProjeto

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefa: {
            tarefas: []
        },
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = uuidv4(),
                state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },
    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}