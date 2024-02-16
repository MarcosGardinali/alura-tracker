<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import BotaoGenerico from './BotaoGenerico.vue';
import Cronometro from './Cronometro.vue'
export default {
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        };
    },
    components: { Cronometro, BotaoGenerico },
    methods: {
        iniciar() {
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos++;
            }, 1000);
            this.cronometroRodando = true

        },
        finalizar() {
            clearInterval(this.cronometro);
            this.cronometroRodando = false
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    },
    emits: ['aoTemporizadorFinalizado'],
    props: {
        descricao: { type: String, required: true }
    }
}
</script>

<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempo-em-segundos="tempoEmSegundos" />
        <BotaoGenerico @clicado="iniciar" :icone="'fas fa-play'" :texto="'Play'" :cronometro-rodando="cronometroRodando" />
        <BotaoGenerico @clicado="finalizar" :icone="'fas fa-stop'" :texto="'Stop'"
            :cronometro-rodando="!cronometroRodando" />
    </div>
</template>