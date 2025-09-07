# Como Usar as Classes Base Refatoradas

## Estrutura Simplificada

Agora tanto os filtros quanto as listas ficaram muito mais simples! As classes base cuidam de toda a lógica de persistência automaticamente.

## Para Filtros COM Persistência de Estado

### 1. Classe TypeScript (Mínima)
```typescript
@Component({
  standalone: true,
  selector: 'app-meu-filtro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './meu-filtro.page.html'
})
export class MeuFiltroPage extends BaseFiltroDirective<MeuFilterValue> {
  
  protected criarConfiguracaoFormulario(): ConfiguracaoFormulario<MeuFilterValue> {
    return {
      nome: ['', [Validators.required]],
      status: '0'
    };
  }

  protected obterValorInicial(): MeuFilterValue {
    return {
      nome: '',
      status: '0'
    };
  }
}
```

### 2. Template HTML (Com Inputs de Configuração)
```html
<app-meu-filtro
  [value]="gerenciador.filterValue()"
  [masterKey]="'ui-MeuShellComponent'"
  [componentKey]="'MeuFilterPage#main'"
  (apply)="gerenciador.aplicarFiltro($event)"
  (clear)="gerenciador.limparFiltro()">
</app-meu-filtro>
```

## Para Filtros SEM Persistência de Estado

### 1. Classe TypeScript (Igual)
```typescript
// Mesma implementação - não muda nada
```

### 2. Template HTML (Sem Inputs de Configuração)
```html
<app-meu-filtro
  [value]="gerenciador.filterValue()"
  (apply)="gerenciador.aplicarFiltro($event)"
  (clear)="gerenciador.limparFiltro()">
</app-meu-filtro>
```

## Benefícios da Refatoração

✅ **Código Eliminado por Filtro:**
- Não precisa mais injetar `StateProvider`
- Não precisa mais criar `_stateRef` privado
- Não precisa mais implementar `stateRef` getter
- Não precisa mais sobrescrever `onApply()` e `onClear()`
- Não precisa mais sobrescrever `ngOnInit()`

✅ **Flexibilidade:**
- Filtros podem escolher ter persistência ou não
- Configuração via inputs no template
- Reutilização total da lógica de persistência

✅ **Consistência:**
- Todos os filtros se comportam igual
- Padrão único para toda a aplicação
- Fácil manutenção e evolução

## Padrão de Nomenclatura Sugerido

- **masterKey**: Nome do shell component (ex: `'ui-ProdutoShellComponent'`)
- **componentKey**: Nome do filtro + sufixo (ex: `'ProdutoFilterPage#main'`)

Isso garante que cada filtro tenha seu próprio espaço de persistência no StateProvider.
--
-

# Como Usar o BaseListaPage Refatorado

## Para Listas COM Persistência de Estado

### 1. Classe TypeScript (Mínima)
```typescript
@Component({
  standalone: true,
  selector: 'app-minha-lista',
  imports: [CommonModule, RouterModule, MeuFiltroPage],
  templateUrl: './minha-lista.page.html'
})
export class MinhaListaPage extends BaseListaPage<
  MeuItem,
  MeuFilterValue,
  number
> {
  private readonly service = inject(MeuService);
  protected override readonly router = inject(Router);

  constructor() {
    super();
  }

  protected obterServico(): IServiceBase<MeuItem, MeuFilterValue, number> {
    return this.service;
  }

  protected obterEstadoInicialQuery(): { page: number; pageSize: number; filters: MeuFilterValue } {
    return {
      page: 1,
      pageSize: 10,
      filters: { nome: '', status: '0' }
    };
  }

  // Métodos de navegação...
}
```

### 2. Template HTML (Com Inputs de Configuração)
```html
<!-- Lista com persistência de estado e filtro do state -->
<app-minha-lista
  [masterKey]="'ui-MeuShellComponent'"
  [componentKey]="'MinhaListaPage#main'"
  [filtro]="'MeuFilterPage#main'">
</app-minha-lista>

<!-- Filtro separado -->
<app-meu-filtro
  [value]="gerenciador.filterValue()"
  [masterKey]="'ui-MeuShellComponent'"
  [componentKey]="'MeuFilterPage#main'"
  (apply)="gerenciador.aplicarFiltro($event)"
  (clear)="gerenciador.limparFiltro()">
</app-meu-filtro>

<!-- resto do template da lista -->
```

### 3. Configuração via Routing (Para Lazy Loading)
```typescript
// Para componentes carregados via lazy loading, configure via inputs no template
// ou use a configuração programática no constructor se necessário

export class MinhaListaPage extends BaseListaPage<...> {
  constructor() {
    super();
    // Se precisar configurar programaticamente:
    // this.masterKey.set('ui-MeuShellComponent');
    // this.componentKey.set('MinhaListaPage#main');
  }
}
```

## Para Listas SEM Persistência de Estado

### 1. Classe TypeScript (Igual)
```typescript
// Mesma implementação - não muda nada
// Apenas não configure os inputs masterKey e componentKey
```

### 2. Template HTML (Sem Inputs de Configuração)
```html
<app-meu-filtro
  [value]="gerenciador.filterValue()"
  (apply)="gerenciador.aplicarFiltro($event)"
  (clear)="gerenciador.limparFiltro()">
</app-meu-filtro>
```

## Benefícios da Refatoração para Listas

✅ **Código Eliminado por Lista:**
- Não precisa mais injetar `StateProvider`
- Não precisa mais criar `_stateRef` privado
- Não precisa mais implementar lógica de inicialização do StateRef
- Não precisa mais gerenciar estado de paginação manualmente

✅ **Flexibilidade:**
- Listas podem escolher ter persistência ou não
- Configuração via inputs no template
- Valor inicial de paginação customizável

✅ **Consistência:**
- Todas as listas se comportam igual
- Padrão único para toda a aplicação
- Fácil manutenção e evolução

## Customização do Valor Inicial de Paginação

```typescript
export class MinhaListaPage extends BaseListaPage<...> {
  // Sobrescreve o valor padrão de paginação
  protected override get valorInicialPaginacao(): { page: number; qtdPage: number } {
    return { page: 0, qtdPage: 20 }; // 20 itens por página
  }
}
```

## Novo Input: Filtro do State

### Funcionalidade
O `BaseListaPage` agora possui um input `filtro` que permite buscar o valor do filtro diretamente do state, ao invés de usar apenas o valor inicial hardcoded.

### Como Usar

#### 1. Template HTML com Filtro do State
```html
<app-tipocategoria-list
  [masterKey]="'ui-TipocategoriaShellComponent'"
  [componentKey]="'TipocategoriaListPage#main'"
  [filtro]="'TipocategoriaFilterPage#main'">
</app-tipocategoria-list>
```

#### 2. Comportamento
- **Com `filtro` configurado**: A lista busca o filtro salvo no state usando a chave fornecida
- **Sem `filtro` configurado**: A lista usa o filtro inicial definido em `obterEstadoInicialQuery()`
- **State não encontrado**: Fallback para o filtro inicial

#### 3. Exemplo Prático - TipoCategoria

**Antes (sem filtro do state):**
```html
<!-- tipocategoria-list.page.html -->
<app-tipocategoria-filter 
  [value]="gerenciador.filterValue()" 
  [masterKey]="'ui-TipocategoriaShellComponent'"
  [componentKey]="'TipocategoriaFilterPage#main'" 
  (apply)="gerenciador.aplicarFiltro($event)"
  (clear)="gerenciador.limparFiltro()">
</app-tipocategoria-filter>

<!-- Lista usa apenas filtro inicial hardcoded -->
```

**Depois (com filtro do state):**
```html
<!-- No shell component ou página que contém ambos -->
<app-tipocategoria-filter
  [masterKey]="'ui-TipocategoriaShellComponent'"
  [componentKey]="'TipocategoriaFilterPage#main'">
</app-tipocategoria-filter>

<app-tipocategoria-list
  [masterKey]="'ui-TipocategoriaShellComponent'"
  [componentKey]="'TipocategoriaListPage#main'"
  [filtro]="'TipocategoriaFilterPage#main'">
</app-tipocategoria-list>
```

**Ou se usar na mesma página:**
```html
<!-- tipocategoria-list.page.html -->
<div class="tipocategoria-list-page"
     [masterKey]="'ui-TipocategoriaShellComponent'"
     [componentKey]="'TipocategoriaListPage#main'"
     [filtro]="'TipocategoriaFilterPage#main'">
  
  <app-tipocategoria-filter 
    [value]="gerenciador.filterValue()" 
    [masterKey]="'ui-TipocategoriaShellComponent'"
    [componentKey]="'TipocategoriaFilterPage#main'" 
    (apply)="gerenciador.aplicarFiltro($event)"
    (clear)="gerenciador.limparFiltro()">
  </app-tipocategoria-filter>
  
  <!-- resto da lista -->
</div>
```

#### 4. Fluxo de Dados
1. Usuário aplica filtro → Salvo no state com chave `TipocategoriaFilterPage#main`
2. Lista inicializa → Busca filtro do state usando a mesma chave
3. Se encontrado → Usa o filtro do state
4. Se não encontrado → Usa o filtro inicial padrão

### Vantagens
- **Sincronização automática**: Lista sempre reflete o último filtro aplicado
- **Persistência**: Filtros são mantidos entre navegações
- **Flexibilidade**: Pode usar filtro do state ou valor inicial conforme necessário