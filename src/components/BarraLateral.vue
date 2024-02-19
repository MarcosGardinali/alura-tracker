<script lang="ts">
import { RouterLink } from 'vue-router'

export default {
    name: 'BarraLateral',
    methods: {
        alterarTema() {
            this.modoEscuroAtivo = !this.modoEscuroAtivo
            this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
        },
    },
    emits: ['aoTemaAlterado'],
    data() {
        return {
            modoEscuroAtivo: false
        }
    },
    computed: {
        textoBotao() {
            if (this.modoEscuroAtivo) {
                return 'Desativar Modo Escuro'
            } return 'Ativar Modo Escuro'
        }
    }
}
</script>

<template>
    <header>
        <h1>
            <router-link to="/">
                <img src="../assets/logo.png" alt="Logo do Alura-Tracker" @click="">
            </router-link>
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoBotao }}
        </button>
        <nav class="panel mt-5">
            <ul>
                <router-link to="/" class="link">
                    <li>
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </li>
                </router-link>
                <router-link to="/projetos" class="link">
                    <li>
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </li>
                </router-link>

            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

.panel li {
    margin: 1rem 0.5rem;
    text-align: start;
    font-size: 1.2rem;
}

.link {
    color: #fff;
}

.link:hover {
    color: #FAF0CA;
}

.link.router-link-active {
    color: #FAF0CA;
}
</style>