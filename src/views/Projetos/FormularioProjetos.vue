<script lang="ts">
import notificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';

export default {
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeDoProjeto: "",
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then (() => this.lidarComSucesso());
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(() => this.lidarComSucesso())
        }
    },
    lidarComSucesso() {
        this.notificar(TipoNotificacao.SUCESSO, 'Tudo certo!', `O projeto ${this.nomeDoProjeto} foi adicionado com sucesso!`)
        this.nomeDoProjeto = ''
        this.$router.push('/projetos')
        }
},
setup() {
    const store = useStore()
    const { notificar } = notificador()
    return {
        store,
        notificar
    }
}
}
</script>

<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>


