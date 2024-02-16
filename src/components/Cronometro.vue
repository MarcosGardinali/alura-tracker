<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
export default {
    props:{
        tempoEmSegundos: {type: Number, default: 0}
    },
    computed: {
        tempoDecorrido(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);
        }
    } //Aqui eu criei o tempoDecorrido que retorna um date, porém recortado apenas em hh:mm:ss e dentro do Date eu estou passando o tempo em segundos como construtor, vezes 1000 pois ele conta em milésimos
    ,
}
</script>

<template>
    <section>
        <strong class="display">{{ tempoDecorrido }}</strong>
    </section>
</template>

<style scoped>
.display{
    color: var(--texto-primario);
}
</style>


