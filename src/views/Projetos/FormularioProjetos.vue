<script lang="ts">
import notificador from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: {
        id: {
            type: String
        }
    },
    setup(props) {

        const router = useRouter()

        const store = useStore()
        const { notificar } = notificador()

        const nomeDoProjeto = ref("")

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || ''
        }

        const lidarComSucesso = () => {
            notificar(TipoNotificacao.SUCESSO, 'Tudo certo!', `O projeto ${nomeDoProjeto.value} foi adicionado com sucesso!`)
            nomeDoProjeto.value = ''
            router.push('/projetos')
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => lidarComSucesso());
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso())
            }
        }

        return {
            nomeDoProjeto,
            salvar
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


