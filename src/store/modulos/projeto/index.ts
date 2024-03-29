import type IProjeto from "@/interfaces/IProjeto";
import type { Estado } from "@/store";
import type { Module } from "vuex";
import { v4 as uuidv4 } from 'uuid';
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipo-acoes";
import http from "@/http";


export interface EstadoDoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoDoProjeto, Estado> = {
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
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
}