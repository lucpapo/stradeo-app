import { Routes } from '@angular/router';
import { CategoriaTarifaShellComponent } from './categoriatarifa-shell.component';
export const CATEGORIATARIFA_ROUTES: Routes = [
    {
        path: '',
        component: CategoriaTarifaShellComponent, // Componente shell que contém <router-outlet/>
    children: [
        {
            // Rota para a lista (ex: /configuracoes/categoriatarifa)
            path: '',
            title: 'CategoriaTarifa',
            loadComponent: () =>
                import('./crud/search/list/categoriatarifa-list.page')
                    .then(m => m.CategoriaTarifaListPage),
        data: {
            title: 'CategoriaTarifa',
            breadcrumb: 'CategoriaTarifa'
        }
},
        {
            // Rota para CRIAR um novo registo (ex: /configuracoes/categoriatarifa/novo)
            path: 'novo',
            title: 'Novo CategoriaTarifa',
            loadComponent: () =>
                import('./crud/view/categoriatarifa-detail.page')
                    .then(m => m.CategoriaTarifaDetailPage),
        data: {
            title: 'Novo CategoriaTarifa',
            breadcrumb: 'CategoriaTarifa'
        }
},
        {
            // Rota para VISUALIZAR um registo existente (ex: /configuracoes/categoriatarifa/:id/view)
            path: ':id/view',
            title: 'Visualizar CategoriaTarifa',
            loadComponent: () =>
                import('./crud/view/categoriatarifa-detail.page')
                    .then(m => m.CategoriaTarifaDetailPage),
        data: {
            title: 'Visualizar CategoriaTarifa',
            breadcrumb: 'CategoriaTarifa'
        }
},
        {
            // Rota para ATUALIZAR um registo existente (ex: /configuracoes/categoriatarifa/:id/edit)
            path: ':id/edit',
            title: 'Editar CategoriaTarifa',
            loadComponent: () =>
                import('./crud/view/categoriatarifa-detail.page')
                    .then(m => m.CategoriaTarifaDetailPage),
        data: {
            title: 'Editar CategoriaTarifa',
            breadcrumb: 'CategoriaTarifa'
        }
},
    ],
},
];