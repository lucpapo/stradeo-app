import { Routes } from '@angular/router';
import { Invoice6Component } from '../../component/main-ecommerce/invoice/invoice6/invoice6.component';

export const content: Routes = [
    {
        path: 'dashboard',
        data: {
            breadcrumb: "Dashboard",
        },
        loadChildren: () => import('../../component/dashboard/dashboard.routes'),
    },
    {
        path: 'widgets',
        data: {
            breadcrumb: "Widgets",
        },
        loadChildren: () => import('../../component/widgets/wigtes.routes'),
    },
    {
        path: 'page-layout',
        data: {
            breadcrumb: "Page Layout",
        },
        loadChildren: () => import('../../component/page-layout/page-layout.routes'),
    },
    {
        path: 'project',
        data: {
            breadcrumb: "Project",
        },
        loadChildren: () => import('../../component/main-project/main-project.routes'),
    },
    {
        path: 'file-manager',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/file-manager/file-manager.routes'),
    },
    {
        path: 'ecommerce',
        data: {
            breadcrumb: "ECommerce",
        },
        loadChildren: () => import('../../component/main-ecommerce/main-ecommerce.routes'),
    },
    {
        path: 'ecommerce/invoice/invoice-6',
        data: {
            breadcrumb: "ECommerce",
        },
        loadChildren: () => import('../../component/main-ecommerce/invoice/invoice.routes'),
    },
    {
        path: 'letter-box',
        data: {
            breadcrumb: "Email",
        },
        loadChildren: () => import('../../component/letter-box/letter-box.routes'),
    },
    {
        path: 'chat',
        data: {
            breadcrumb: "Chat",
        },
        loadChildren: () => import('../../component/chat/chat.routes'),
    },
    {
        path: 'user',
        data: {
            breadcrumb: "Users",
        },
        loadChildren: () => import('../../component/user/user.routes'),
    },
    {
        path: 'bookmarks',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/main-bookmark/main-bookmark.routes'),
    },
    {
        path: 'contact',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/contacts/contacts.routes'),
    },
    {
        path: 'tasks',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/tasks/tasks.routes'),
    },
    {
        path: 'calender',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/calendar/calendar.routes'),
    },
    {
        path: 'social-app',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/social-app/social-app.routes'),
    },
    {
        path: 'todo',
        data: {
            breadcrumb: "Apps", 
        },
        loadChildren: () => import('../../component/to-do/to-do.routes'),
    },
    {
        path: 'search-result',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/search-result/search-result.routes'),
    },
    {
        path: 'form-controls',
        data: {
            breadcrumb: "Form Controls",
        },
        loadChildren: () => import('../../component/forms/form-controls/form-controls.routes'),
    },
    {
        path: 'form-widgets',
        data: {
            breadcrumb: "Form Widgets",
        },
        loadChildren: () => import('../../component/forms/form-widgets/form-widgets.routes'),
    },
    {
        path: 'table/bootstrap-tables',
        data: {
            breadcrumb: 'Table'
        },
        loadChildren: () => import('../../component/table/bootstrap-tables/bootstrap.routes')
    },
    {
        path: 'table/datatable',
        data: {
            title: "Data Table",
            breadcrumb: "Data Table",
        },
        loadChildren: () => import('../../component/table/data-table/data-table.routes')
    },
    {
        path: 'ui-kits',
        data: {
            breadcrumb: "Ui Kits",
        },
        loadChildren: () => import('../../component/ui-kits/ui-kits.routes'),
    },
    {
        path: 'bonus-ui',
        data: {
            breadcrumb: "Bonus Ui",
        },
        loadChildren: () => import('../../component/bonus-ui/bonus-ui.routes'),
    },
    {
        path: 'icons',
        data: {
            breadcrumb: "Icons",
        },
        loadChildren: () => import('../../component/icons/icons.routes'),
    },
    {
        path: 'buttons',
        data: {
            breadcrumb: "Buttons",
        },
        loadChildren: () => import('../../component/buttons/buttons.routes')
    },
    {
        path: 'chart',
        data: {
            breadcrumb: "Charts",
        },
        loadChildren: () => import('../../component/charts/charts.routes')
    },
    {
        path: 'sample-page',
        data: {
            breadcrumb: "Pages",
        },
        loadChildren: () => import('../../component/sample-page/sample-page.routes')
    },
    {
        path: 'gallary',
        data: {
            breadcrumb: "Gallery",
        },
        loadChildren: () => import('../../component/gallery/gallery.routes'),
    },
    {
        path: 'blog',
        data: {
            breadcrumb: "Blog",
        },
        loadChildren: () => import('../../component/blog/blog.routes'),
    },
    {
        path: 'faq',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/faq/faq.routes'),
    },
    {
        path: 'job-search',
        data: {
            breadcrumb: "Job Search",
        },
        loadChildren: () => import('../../component/job-search/job-search.routes'),
    },
    {
        path: 'learning',
        data: {
            breadcrumb: "Learning",
        },
        loadChildren: () => import('../../component//learning/learning.routes'),
    },
    {
        path: 'maps',
        data: {
            breadcrumb: "Maps",
        },
        loadChildren: () => import('../../component/maps/maps.routes'),
    },
    {
        path: 'editors',
        data: {
            breadcrumb: "Editors",
        },
        loadChildren: () => import('../../component/editors/editors.routes'),
    },
    {
        path: 'knowledgebase',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/knowledgebase/knowledgebase.routes'),
    },
    {
        path: 'support-ticket',
        data: {
            breadcrumb: "Apps",
        },
        loadChildren: () => import('../../component/support-ticket/support-ticket.routes'),
    },
]