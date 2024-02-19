<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { key } from '@/store';
import Temporizador from './Temporizador.vue';
import { computed, ref } from 'vue';
import { useStore } from "vuex";
import { TipoNotificacao } from '@/interfaces/INotificacao';
import notificador from '@/hooks/notificador';

export default {
    components: { Temporizador },
    emits: ['aoSalvarFormulario'],
    setup(props, { emit }) {

        const store = useStore(key)

        const descricao = ref("")
        const idProjeto = ref("")

        const projetos = computed(() => store.state.projeto.projetos)

        const { notificar } = notificador()

        const finalizarTarefa = (tempoDecorrido: number): void => {
            emit('aoSalvarFormulario', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value),
            })
            notificar(TipoNotificacao.SUCESSO, 'Tudo certo!', `A tarefa ${descricao.value} foi adicionado com sucesso!`)
            if (!descricao.value) {
                notificar(TipoNotificacao.ATENCAO, 'Tarefa sem nome!', `Ops, parece que você adicionou uma tarefa sem nome!`)
            }
            const projeto = projetos.value.find((projeto) => projeto.id == idProjeto.value)
            if (!projeto) {
                notificar(TipoNotificacao.FALHA, 'Tarefa não adicionada', 'Selecione um projeto para vincular a essa tarefa!')
                return
            }
            descricao.value = ''
            idProjeto.value = ''
        }

        return {
            projetos,
            descricao,
            idProjeto,
            finalizarTarefa
        }
    }
}
</script>

<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de novas tarefas">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao"
                    required>
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" :descricao="descricao" />
            </div>
        </div>
    </div>
</template>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>