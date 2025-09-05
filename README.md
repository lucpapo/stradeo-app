# Kabul

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# contexto
  - Precisamos organizar o projeto em termos das paginas assim 
  - para isso tenho uma pasta chamada features
    - dentro desta pasta posso ter modulos para facilitar o carregamento e a velocidade
    - cada modulo pode ter suas paginas e componentes e componentes compartilhados
    - cada modulo pode ter suas rotas
    - exemplo da estrutura
      - features
        - routes.ts 
        - configuracoes
           - routes.ts
           - configuracoes.module.ts
           - tipocategoria
             - tipocategoria.componente.ts -> aqui fica a routeoutlet para as paginas de tipocategoria ( comeca com lista e dentro de lista o filtro ) Pensar em como fazer a rota preservando o filtro e paginacao quando vai para o detalhe e volta
             - seach (pasta para organizar)
                 - list (pasta para organizar)   -> tera botoes de acoes para os crud
                   - tipocategoria-list.page.ts
                   - tipocategoria-list.page.html
                   - tipocategoria-list.page.scss
                 - filter (pasta para organizar)  -> servira para filtrar a lista
                   - tipocategoria-filter.component.ts
                   - tipocategoria-filter.component.html
                   - tipocategoria-filter.component.scss
               - view (pasta para organizar)
                  - detail (pasta para organizar)  -> servira para CRUD
                    - tipocategoria-detail.page.ts
                    - tipocategoria-detail.page.html
                    - tipocategoria-detail.page.scss
                 - componentes (pasta para organizar) -> Não é obrigatoria - usa caso tenha necessidade
                    - usuariolog (pasta para organizar) -> componente que mostra o usuario que criou e atualizou 
                      - usuariolog.component.ts
                      - usuariolog.component.html
                      - usuariolog.component.scss
                 - subview  (pasta para organizar) -> Não é obrigatoria - usa caso tenha necessidade
                    - tipocategoria-subview.component.ts
                    - tipocategoria-subview.component.html
                    - tipocategoria-subview.component.scss
     