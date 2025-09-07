# BaseListPage - Componente Base para Listagens

## Visão Geral

O `BaseListPage` é uma classe abstrata que centraliza toda a lógica comum de componentes de listagem, incluindo:

- Gerenciamento de estado (filtros, paginação, dados)
- Controle de carregamento e erro
- Integração com StateProvider
- Lógica de paginação
- Validação de filtros

## Arquitetura

### Separação de Responsabilidades

1. **BaseListPage**: Lógica comum de listagem
2. **ListStrategy**: Interface para regras específicas de cada entidade
3. **[Entity]ListStrategy**: Implementação específica para cada entidade

### Fluxo de Funcionamento

```
User Action → BaseListPage → ListStrategy → Service → API
     ↓              ↓             ↓           ↓        ↓
  Template ← State Management ← Validation ← Response ← Data
```

## Como Usar

### 1. Criar a Estratégia

```typescript
export class MinhaEntidadeListStrategy implements ListStrategy<MeuFiltro, MinhaEntidade> {
  
  hasValidFilters(filters: MeuFiltro): boolean {
    // Implementar validação específica
    return filters.campo.trim() !== '';
  }

  getDefaultPagination() {
    return { page: 1, pageSize: 10, total: 0 };
  }

  getStateKeys() {
    return {
      shellKey: 'ui-MinhaEntidadeShellComponent',
      paginationKey: 'MinhaEntidadeListPage#main',
      filterKey: 'MinhaEntidadeFilterPage#main'
    };
  }

  // Métodos opcionais
  transformQueryParams?(params: any) { /* ... */ }
  processResponse?(response: any) { /* ... */ }
}
```

### 2. Implementar o Componente

```typescript
@Component({
  // configuração do componente
})
export class MinhaEntidadeListPage extends BaseListPage<MeuFiltro, MinhaEntidade> {

  private readonly service = inject(MinhaEntidadeService);
  private strategy = new MinhaEntidadeListStrategy();

  constructor() {
    super();
  }

  protected getStrategy(): ListStrategy<MeuFiltro, MinhaEntidade> {
    return this.strategy;
  }

  protected getInitialFilters(): MeuFiltro {
    return MEU_FILTRO_INITIAL_VALUE;
  }

  protected loadDataFromService(queryParams: any): Observable<any> {
    return this.service.list(queryParams);
  }

  // Métodos específicos da entidade (navegação, etc.)
}
```

### 3. Template

O template pode usar todos os getters da classe base:

```html
<!-- Filtro -->
<app-minha-entidade-filter 
  [value]="filters" 
  (apply)="onFilterApply($event)" 
  (clear)="onFilterClear()">
</app-minha-entidade-filter>

<!-- Loading -->
<app-full-screen-loading [show]="loading"></app-full-screen-loading>

<!-- Dados -->
<div *ngFor="let item of data">
  {{ item.nome }}
</div>

<!-- Paginação -->
<app-pagination-footer 
  [currentPage]="currentPage" 
  [pageSize]="pageSize" 
  [total]="total"
  [showingRange]="showingRange" 
  (pageChange)="onPageChange($event)" 
  (pageSizeChange)="onPageSizeChange($event)">
</app-pagination-footer>

<!-- Estados de erro e vazio -->
<app-error-state 
  *ngIf="error" 
  [message]="error"
  [onRetryCallback]="retryLoadData">
</app-error-state>

<app-empty-state *ngIf="!loading && !error && !data.length"></app-empty-state>
```

## Benefícios

### ✅ Vantagens

- **Reutilização**: Lógica comum centralizada
- **Consistência**: Comportamento padronizado entre listagens
- **Manutenibilidade**: Mudanças em um local afetam todas as listagens
- **Testabilidade**: Lógica separada facilita testes unitários
- **Flexibilidade**: Estratégias permitem customização específica

### 🔧 Customização

- **Validação de Filtros**: Implementar `hasValidFilters()`
- **Transformação de Parâmetros**: Implementar `transformQueryParams()`
- **Processamento de Resposta**: Implementar `processResponse()`
- **Paginação Padrão**: Configurar em `getDefaultPagination()`

## Exemplo Completo

Veja a implementação em:
- `TipocategoriaListStrategy`
- `TipocategoriaListPage`

## Migração

Para migrar uma listagem existente:

1. Criar a estratégia específica
2. Estender `BaseListPage` em vez de implementar `OnInit`
3. Implementar os métodos abstratos
4. Remover código duplicado (paginação, estado, etc.)
5. Manter apenas lógica específica da entidade