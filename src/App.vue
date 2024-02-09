<script lang="ts">
import BarraLateral from './components/BarraLateral.vue';
import Box from './components/Box.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import type ITarefa from './interfaces/ITarefa';

export default {
  components: { BarraLateral, Formulario, Tarefa, Box },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },
    trocarTema(modoEscuroAtivo : boolean){
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
}

</script>

<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @ao-tema-alterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @ao-salvar-formulario="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="tarefas.length === 0">
          Nenhuma tarefa realizada!
        </Box>
      </div>
    </div>
  </main>
</template>

<style>
main {
  --bg-primario: #FFF;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo{
  background-color: var(--bg-primario);
}
.lista {
  padding: 1.25rem;
}
</style>
