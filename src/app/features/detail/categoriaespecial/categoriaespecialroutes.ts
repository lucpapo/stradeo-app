import { Routes } from '@angular/router';
import { CategoriaEspecialShellComponent } from './categoriaespecial-shell.component';
export const CATEGORIAESPECIAL_ROUTES: Routes = [
    {
        path: '',
        component: CategoriaEspecialShellComponent, // Componente shell que contém <router-outlet/>
    children: [
        {
            // Rota para a lista (ex: /configuracoes/categoriaespecial)
            path: '',
            title: 'CategoriaEspecial',
            loadComponent: () =>
                import('./crud/search/list/categoriaespecial-list.page')
                    .then(m => m.CategoriaEspecialListPage),
        data: {
            title: 'CategoriaEspecial',
            breadcrumb: 'CategoriaEspecial'
        }
},
        {
            // Rota para CRIAR um novo registo (ex: /configuracoes/categoriaespecial/novo)
            path: 'novo',
            title: 'Novo CategoriaEspecial',
            loadComponent: () =>
                import('./crud/view/categoriaespecial-detail.page')
                    .then(m => m.CategoriaEspecialDetailPage),
        data: {
            title: 'Novo CategoriaEspecial',
            breadcrumb: 'CategoriaEspecial'
        }
},
        {
            // Rota para VISUALIZAR um registo existente (ex: /configuracoes/categoriaespecial/:id/view)
            path: ':id/view',
            title: 'Visualizar CategoriaEspecial',
            loadComponent: () =>
                import('./crud/view/categoriaespecial-detail.page')
                    .then(m => m.CategoriaEspecialDetailPage),
        data: {
            title: 'Visualizar CategoriaEspecial',
            breadcrumb: 'CategoriaEspecial'
        }
},
        {
            // Rota para ATUALIZAR um registo existente (ex: /configuracoes/categoriaespecial/:id/edit)
            path: ':id/edit',
            title: 'Editar CategoriaEspecial',
            loadComponent: () =>
                import('./crud/view/categoriaespecial-detail.page')
                    .then(m => m.CategoriaEspecialDetailPage),
        data: {
            title: 'Editar CategoriaEspecial',
            breadcrumb: 'CategoriaEspecial'
        }
},
    ],
},
];