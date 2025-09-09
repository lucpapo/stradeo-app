# Como usar a nova funcionalidade de List Strategy

A List Strategy agora suporta duas formas de navegação configuradas diretamente no componente:

## 1. Navegação por Rota (Padrão - Compatível com código existente)

```typescript
export class TipocategoriaListPage extends BaseListPage<TipocategoriaFilterValue, any> {

  private readonly service = inject(TipoCategoriaService);
  private strategy = new TipocategoriaListStrategy(this.service, this.router);

  protected getStrategy(): ListStrategy<TipocategoriaFilterValue, any> {
    return this.strategy;
  }

  protected getInitialFilters(): TipocategoriaFilterValue {
    return TIPOCATEGORIA_FILTER_INITIAL_VALUE;
  }

  // Nova implementação obrigatória
  protected getNavigationConfig() {
    return {
      useRouteNavigation: true,
      baseRoute: '/configuracoes/tipocategoria'
    };
  }
}
```

## 2. Emissão de Eventos (Nova funcionalidade)

```typescript
export class TipocategoriaListPage extends BaseListPage<TipocategoriaFilterValue, any> {

  private readonly service = inject(TipoCategoriaService);
  private strategy = new TipocategoriaListStrategy(this.service, this.router);

  protected getStrategy(): ListStrategy<TipocategoriaFilterValue, any> {
    return this.strategy;
  }

  protected getInitialFilters(): TipocategoriaFilterValue {
    return TIPOCATEGORIA_FILTER_INITIAL_VALUE;
  }

  // Configuração para usar eventos em vez de rotas
  protected getNavigationConfig() {
    return {
      useRouteNavigation: false
    };
  }
}
```

## Como usar o componente com eventos

```typescript
// No template do componente pai
<app-tipocategoria-list (actionEvent)="onListAction($event)">
</app-tipocategoria-list>
```

```typescript
// No componente pai
export class ParentComponent {
  
  onListAction(event: ListActionEvent<TipoCategoria>) {
    switch (event.action) {
      case 'novo':
        // Lógica para criar novo item
        this.abrirModalNovo();
        break;
        
      case 'ver':
        // Lógica para visualizar item
        this.abrirModalVer(event.item);
        break;
        
      case 'editar':
        // Lógica para editar item
        this.abrirModalEditar(event.item);
        break;
    }
  }
  
  abrirModalNovo() {
    // Sua lógica aqui
  }
  
  abrirModalVer(item: TipoCategoria) {
    // Sua lógica aqui
  }
  
  abrirModalEditar(item: TipoCategoria) {
    // Sua lógica aqui
  }
}
```

## Interface do Evento

```typescript
export interface ListActionEvent<TEntity> {
  action: 'novo' | 'ver' | 'editar';
  item?: TEntity; // Presente apenas para ações 'ver' e 'editar'
}
```

## Método obrigatório

Todos os componentes que estendem `BaseListPage` agora devem implementar:

```typescript
protected getNavigationConfig(): {
  useRouteNavigation: boolean;
  baseRoute?: string; // obrigatório quando useRouteNavigation = true
}
```

## Compatibilidade

Para manter compatibilidade com código existente, basta adicionar o método `getNavigationConfig()` retornando `useRouteNavigation: true` e a `baseRoute` atual.