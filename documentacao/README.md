# Documentação - Sistema de Filtros e Listagem TipoCategoria

Este documento explica como utilizar e customizar o sistema de filtros e listagem para a entidade TipoCategoria, incluindo exemplos de override para personalização.

## Arquitetura do Sistema

O sistema é composto por 4 componentes principais:

### 1. TipocategoriaFilterPage
**Arquivo:** `src/app/features/configuracoes/tipocategoria/crud/search/filter/tipocategoria-filter.page.ts`

Componente responsável pela interface de filtros. Herda de `BaseFilterPage` e utiliza uma estratégia específica.

**Características:**
- Gerencia o formulário de filtros
- Integra com o StateProvider para persistência
- Utiliza `TipocategoriaFilterStrategy` para lógica específica

### 2. TipocategoriaFilterStrategy
**Arquivo:** `src/app/features/configuracoes/tipocategoria/crud/search/filter/tipocategoria-filter.strategy.ts`

Estratégia que define a lógica específica dos filtros para TipoCategoria.

**Responsabilidades:**
- Define os controles do formulário
- Configura validações
- Define labels dos campos

### 3. TipocategoriaListPage
**Arquivo:** `src/app/features/configuracoes/tipocategoria/crud/search/list/tipocategoria-list.page.ts`

Componente principal da listagem. Herda de `BaseListPage` e coordena filtros e resultados.

**Características:**
- Gerencia estado da listagem
- Integra filtros com resultados
- Utiliza `TipocategoriaListStrategy` para operações específicas

### 4. TipocategoriaListStrategy
**Arquivo:** `src/app/features/configuracoes/tipocategoria/crud/search/list/tipocategoria-list.strategy.ts`

Estratégia que define comportamentos específicos da listagem.

**Responsabilidades:**
- Define rotas base
- Configura chaves do StateProvider
- Personaliza operações de listagem

## Tipos e Configurações

### TipocategoriaFilterValue
```typescript
export type TipocategoriaFilterValue = {
    descricao: string;
    status_delecao: '' | '0' | '1';
};
```

### Valor Inicial
```typescript
export const TIPOCATEGORIA_FILTER_INITIAL_VALUE: TipocategoriaFilterValue = {
    descricao: '',
    status_delecao: '1'
};
```

## Como Fazer Override

### 1. Modificar Payload Antes do Envio

Para modificar o payload antes de enviar para o backend, você pode fazer override na estratégia de lista:

```typescript
export class TipocategoriaListStrategy extends AbstractListStrategy<TipocategoriaFilterValue, any> {
  
  // Override do método que prepara o payload
  protected prepareSearchPayload(filters: TipocategoriaFilterValue): any {
    const payload = super.prepareSearchPayload(filters);
    
    // Exemplo: Adicionar campos extras
    payload.empresa_id = this.getCurrentCompanyId();
    
    // Exemplo: Transformar campos
    if (payload.status_delecao === '1') {
      payload.ativo = true;
      delete payload.status_delecao;
    }
    
    // Exemplo: Adicionar filtros padrão
    payload.ordenacao = 'descricao ASC';
    
    return payload;
  }
  
  private getCurrentCompanyId(): number {
    // Lógica para obter ID da empresa atual
    return 1;
  }
}
```

### 2. Mudar Campo ID para Outro

Para usar um campo diferente como identificador:

```typescript
export class TipocategoriaListStrategy extends AbstractListStrategy<TipocategoriaFilterValue, any> {
  
  // Override do método que retorna o ID do item
  protected getItemId(item: any): string | number {
    // Em vez de usar 'id', usar outro campo
    return item.codigo || item.uuid || item.custom_id;
  }
  
  // Override das operações que dependem do ID
  protected buildEditRoute(item: any): string {
    const customId = this.getItemId(item);
    return `${this.baseRoute}/edit/${customId}`;
  }
  
  protected buildViewRoute(item: any): string {
    const customId = this.getItemId(item);
    return `${this.baseRoute}/view/${customId}`;
  }
}
```

### 3. Customizar Validações do Filtro

Para modificar as validações dos filtros:

```typescript
export class TipocategoriaFilterStrategy extends AbstractFilterStrategy<TipocategoriaFilterValue> {
  
  // Override das validações
  createFormControls(savedData?: TipocategoriaFilterValue): { [key: string]: any } {
    const data = savedData || this.initialValue;

    return {
      descricao: [
        data.descricao, 
        [
          Validators.required, 
          Validators.minLength(3), // Mínimo 3 caracteres
          Validators.maxLength(50), // Máximo 50 em vez de 100
          Validators.pattern(/^[a-zA-Z\s]+$/) // Apenas letras e espaços
        ]
      ],
      status_delecao: [data.status_delecao, [Validators.required]], // Tornar obrigatório
      // Adicionar novos campos
      categoria_pai: [data.categoria_pai || '', [Validators.required]],
      data_criacao: [data.data_criacao || null]
    };
  }
  
  // Override dos labels
  getFieldLabels(): { [key: string]: string } {
    return {
      descricao: 'Nome da Categoria',
      status_delecao: 'Situação',
      categoria_pai: 'Categoria Superior',
      data_criacao: 'Data de Criação'
    };
  }
}
```

### 4. Adicionar Novos Campos ao Filtro

Para adicionar novos campos, primeiro atualize os tipos:

```typescript
// Atualizar tipocategoria-filter.types.ts
export type TipocategoriaFilterValue = {
    descricao: string;
    status_delecao: '' | '0' | '1';
    categoria_pai?: number; // Novo campo
    data_inicio?: Date; // Novo campo
    data_fim?: Date; // Novo campo
};

export const TIPOCATEGORIA_FILTER_INITIAL_VALUE: TipocategoriaFilterValue = {
    descricao: '',
    status_delecao: '1',
    categoria_pai: undefined,
    data_inicio: undefined,
    data_fim: undefined
};
```

Depois atualize a estratégia conforme mostrado no exemplo anterior.

### 5. Customizar Comportamento da Listagem

Para personalizar comportamentos da listagem:

```typescript
export class TipocategoriaListStrategy extends AbstractListStrategy<TipocategoriaFilterValue, any> {
  
  // Override do método de busca
  protected async performSearch(filters: TipocategoriaFilterValue, page: number, pageSize: number): Promise<any> {
    // Lógica customizada antes da busca
    console.log('Iniciando busca com filtros:', filters);
    
    const result = await super.performSearch(filters, page, pageSize);
    
    // Lógica customizada após a busca
    result.items = result.items.map(item => ({
      ...item,
      descricao_formatada: item.descricao.toUpperCase()
    }));
    
    return result;
  }
  
  // Override das ações de item
  protected onItemEdit(item: any): void {
    // Lógica customizada antes de editar
    if (!this.canEditItem(item)) {
      alert('Você não tem permissão para editar este item');
      return;
    }
    
    super.onItemEdit(item);
  }
  
  private canEditItem(item: any): boolean {
    // Lógica de permissão customizada
    return item.status_delecao === '1' && item.created_by === this.getCurrentUserId();
  }
}
```

### 6. Customizar StateProvider Keys

Para usar chaves diferentes no StateProvider:

```typescript
export class TipocategoriaListStrategy extends AbstractListStrategy<TipocategoriaFilterValue, any> {
  
  getStateKeys() {
    return {
      shellKey: 'custom-TipocategoriaShell', // Chave customizada
      paginationKey: 'CustomTipocategoriaList#pagination', // Chave customizada
      filterKey: 'CustomTipocategoriaFilter#filters' // Chave customizada
    };
  }
}
```

## Exemplos Práticos de Uso

### Exemplo 1: Filtro com Busca por Código
```typescript
// Adicionar campo codigo ao tipo
export type TipocategoriaFilterValue = {
    descricao: string;
    codigo?: string; // Novo campo
    status_delecao: '' | '0' | '1';
};

// Atualizar estratégia
export class TipocategoriaFilterStrategy extends AbstractFilterStrategy<TipocategoriaFilterValue> {
  createFormControls(savedData?: TipocategoriaFilterValue): { [key: string]: any } {
    const data = savedData || this.initialValue;
    return {
      descricao: [data.descricao, [Validators.maxLength(100)]],
      codigo: [data.codigo || '', [Validators.pattern(/^\d+$/)]], // Apenas números
      status_delecao: [data.status_delecao]
    };
  }
}
```

### Exemplo 2: Listagem com Ordenação Customizada
```typescript
export class TipocategoriaListStrategy extends AbstractListStrategy<TipocategoriaFilterValue, any> {
  
  protected prepareSearchPayload(filters: TipocategoriaFilterValue): any {
    const payload = super.prepareSearchPayload(filters);
    
    // Sempre ordenar por descrição
    payload.order_by = 'descricao';
    payload.order_direction = 'ASC';
    
    return payload;
  }
}
```

## Considerações Importantes

1. **Herança**: Sempre herde das classes base (`BaseFilterPage`, `AbstractFilterStrategy`, etc.) para manter consistência
2. **StateProvider**: Use chaves únicas para evitar conflitos entre diferentes módulos
3. **Validações**: Mantenha validações consistentes entre frontend e backend
4. **Performance**: Evite operações pesadas nos métodos de override que são chamados frequentemente
5. **Tipagem**: Use TypeScript adequadamente para manter type safety

## Estrutura de Arquivos Recomendada

```
src/app/features/configuracoes/tipocategoria/crud/search/
├── filter/
│   ├── tipocategoria-filter.page.ts
│   ├── tipocategoria-filter.page.html
│   ├── tipocategoria-filter.page.scss
│   └── tipocategoria-filter.strategy.ts
├── list/
│   ├── tipocategoria-list.page.ts
│   ├── tipocategoria-list.page.html
│   ├── tipocategoria-list.page.scss
│   └── tipocategoria-list.strategy.ts
└── types/
    └── tipocategoria-filter.types.ts
```

Esta arquitetura garante separação de responsabilidades e facilita manutenção e extensibilidade do código.