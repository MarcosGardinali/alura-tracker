<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import Temporizador from './Temporizador.vue';


export default {
    components: { Temporizador },
    methods: {
        finalizarTarefa (tempoDecorrido: number) : void{
            this.$emit('aoSalvarFormulario', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = ''
        }
    }, 
    data (){
     return{
        descricao: ''
     }   
    },
    emits: ['aoSalvarFormulario']
}
</script>

<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de novas tarefas">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" :descricao="descricao"/>
            </div>
        </div>
    </div>
</template>

<style>
.formulario{
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>