import Projetos from "@/views/Projetos.vue"
import Tarefas from "@/views/Tarefas.vue"
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"

const rotas: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefas',
    component: Tarefas
},
{
    path: '/projetos',
    name: 'Projetos',
    component: Projetos
}
]//Array de rotas presentes na aplicação

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador