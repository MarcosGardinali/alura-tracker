<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import type { PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import type ITarefa from '@/interfaces/ITarefa';
import Box from './Box.vue';

export default {
    components: { Cronometro, Box },
    props: {
        tarefa: { type: Object as PropType<ITarefa>, required: true },
    }
}
</script>

<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                {{ tarefa.projeto?.nome  || 'Nenhum projeto vinculado!'}}
            </div>
            <div class="column">
                <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>