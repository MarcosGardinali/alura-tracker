<script lang="ts">
import BarraLateral from './components/BarraLateral.vue';

export default {
  components: { BarraLateral },
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  methods: {
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
      <RouterView>
        
      </RouterView>
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
