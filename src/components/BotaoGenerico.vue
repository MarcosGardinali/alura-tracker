<script lang="ts">
export default{
    emits: ['clicado'],
    props: {
        cronometroRodando: {type: Boolean},
        icone: {type: String, required:true},
        texto: {type: String, required: true}
    },
    methods: {
        clicado() : void{
            this.$emit('clicado')
        }
    }
}
</script>

<template>
    <button class="button" @click="$emit('clicado')" :disabled="cronometroRodando">
            <span class="icon">
                <i :class="icone"></i>
            </span>
            <span>{{texto}}</span>
        </button>
</template>