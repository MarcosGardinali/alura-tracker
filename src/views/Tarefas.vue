<script lang="ts">
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import type ITarefa from '../interfaces/ITarefa';

export default {
    components: { Formulario, Tarefa, Box },
    data() {
        return {
            tarefas: [] as ITarefa[]
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa)
        }
    }
}

</script>

<template>
    <Formulario @ao-salvar-formulario="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="tarefas.length === 0">
            Nenhuma tarefa realizada!
        </Box>
    </div>
</template>
