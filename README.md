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
     




     # Contexto
- Voltou a ter as duas chamadas a api no voltar.

# Sugestao
- Recomecar
- ler o prompr todo antes de comecar
- Esquecer por enquanto o BaseFiltro e BaseList e suas estrategias
- Implementar tudo na clase TipocategoriaListPage e TipocategoriaFilterPage 
- depois refatoramos 

# Como deve ser o Funcionamento
  - Componente TipocategoriaListPage
    - Contem o componente TipocategoriaFilterPage
      - verifica se tem valor no state 
        - se nao tem carrega com o valor inicial do filtro
      - pega o valor do state e preenche o formulario do filtro
      - verifica se esta autoloadingdata
        -  se estiver simula um click
     - sugiro separa o Click() da funcao que setaria o stateprovider e dispararia o evento
        - na funcao click() 
           - this.isPesquisar = true
        - na funcao que realmente ativa o evento da api 
           - se  this.isPesquisar
           - limpa a paginacao e seta os dados do filtro no state provider
           - this.pesquisar = false
           - pega a paginacao do state e o filtro do state
           - faz o evento de chamar a api
    - na paginacao 
      - seta a paginacao 
        - o this.pesquisar == false
        - pega a paginacao do state e o filtro do state
        - faz o evento de chamar a api
    - no refresh/voltar
        - o this.pesquisar == false
        - pega a paginacao do state e o filtro do state
        - faz o evento de chamar a api
  - Componente lista esta dizendo que o objeto que filtra ele 
    ele recupera o state e faz a requisicao da api       

 

# Premissa
- o State quero usar ainda o state provider. 
- usar o TipoCategoriaService para a api desta tela
- nao fazer mock de dados.
 

# observacao 
- a tela esta funcionando so esta com problema
- entao a sugestao é fazer uma reengenharia deixando a tela independente da base e das strategy
  - TipocategoriaFilterPage
  - TipocategoriaListPage
- simplificar, corrigir  e depois iremos para outros passos.  

# sugestao 
- simplificar o processo deixando um filtro por componente como no inicio 
- tirar os target 
- dizer nos componentes que precisam do filtro qual seria o filtro 
- criar um checklist do que vai fazer 
- ler todo o contexto antes de comecar.
- Zerar o pensamento para poder achar outras alternativas
- verificar as pastas 
  - corepcode
  - corestradeo
  - features
  - shared\components
    

