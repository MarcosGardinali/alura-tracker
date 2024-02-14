<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { key } from '@/store';
import Temporizador from './Temporizador.vue';
import { computed } from 'vue';
import { useStore } from "vuex";

export default {
    components: { Temporizador },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            this.$emit('aoSalvarFormulario', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.descricao = ''
        }
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    emits: ['aoSalvarFormulario'],
    setup() { 
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
}
</script>

<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de novas tarefas">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
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