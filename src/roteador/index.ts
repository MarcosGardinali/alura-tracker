import Projetos from "@/views/Projetos.vue"
import FormularioProjetos from "@/views/Projetos/FormularioProjetos.vue"
import Lista from "@/views/Projetos/Lista.vue"
import Tarefas from "@/views/Tarefas.vue"
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"

const rotas: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefas',
    component: Tarefas
},
{
    path: '/projetos',
    component: Projetos,
    children:[
        {
            path: '',
            name: 'Projetos',
            component: Lista
        },
        {
            path: 'novo',
            name: 'Novo Projeto',
            component: FormularioProjetos 
        },
        {
            path: ':id',
            name: 'Editar Projeto',
            component: FormularioProjetos, 
            props: true
        }
    ]
}
]//Array de rotas presentes na aplicação

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador