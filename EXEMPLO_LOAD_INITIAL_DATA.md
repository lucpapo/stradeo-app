# Controle de Carregamento Inicial de Dados

## Novo Input: `loadInitialData`

O input `loadInitialData` controla se o filtro deve carregar dados automaticamente na inicialização.

### Valores Possíveis

- `true` (padrão): Carrega dados automaticamente se o formulário for válido
- `false`: Não carrega dados automaticamente, espera interação do usuário

## Exemplos de Uso

### 1. Carregar Dados Automaticamente (Comportamento Padrão)

```html
<app-tipocategoria-filter 
  [value]="getFilterManager('lista-principal').filterValue()"
  [masterKey]="'ui-TipocategoriaShellComponent'" 
  [componentKey]="'filter-lista-principal'"
  [loadInitialData]="true"
  (apply)="applyFilterToTargets($event, ['lista-principal'])"
  (clear)="clearFilterFromTargets(['lista-principal'])">
</app-tipocategoria-filter>
```

**Comportamento:**
- ✅ Carrega filtro do state se existir
- ✅ Força validação dos campos
- ✅ Se válido: carrega dados automaticamente
- ✅ Se inválido: mostra erros, não carrega dados

### 2. Esperar Interação do Usuário

```html
<app-tipocategoria-filter 
  [value]="getFilterManager('lista-principal').filterValue()"
  [masterKey]="'ui-TipocategoriaShellComponent'" 
  [componentKey]="'filter-lista-principal'"
  [loadInitialData]="false"
  (apply)="applyFilterToTargets($event, ['lista-principal'])"
  (clear)="clearFilterFromTargets(['lista-principal'])">
</app-tipocategoria-filter>
```

**Comportamento:**
- ✅ Carrega filtro do state se existir
- ❌ NÃO força validação inicial
- ❌ NÃO carrega dados automaticamente
- ✅ Aguarda usuário clicar em "Aplicar"

### 3. Cenários de Uso

#### Cenário A: Formulário com Campos Obrigatórios
```html
<!-- Quer mostrar erros imediatamente se filtro do state for inválido -->
<app-meu-filtro [loadInitialData]="true">
```

#### Cenário B: Formulário Opcional
```html
<!-- Quer que usuário preencha antes de carregar -->
<app-meu-filtro [loadInitialData]="false">
```

#### Cenário C: Condicional Baseado em Lógica
```typescript
// No componente
get shouldLoadInitialData(): boolean {
  // Só carrega automaticamente se usuário já usou o filtro antes
  return this.hasUsedFilterBefore();
}
```

```html
<app-meu-filtro [loadInitialData]="shouldLoadInitialData">
```

## Novos Métodos Disponíveis

### `forceValidation()`
Força a validação de todos os campos (marca como touched e dirty):

```typescript
// No componente pai
@ViewChild(TipocategoriaFilterPage) filtroComponent!: TipocategoriaFilterPage;

ngAfterViewInit() {
  // Força validação após carregar
  this.filtroComponent.forceValidation();
}
```

### `isFormValidWithValidation()`
Verifica se o formulário é válido após forçar validação:

```typescript
// No componente pai
checkAndApplyFilter() {
  if (this.filtroComponent.isFormValidWithValidation()) {
    // Aplica filtro apenas se válido
    this.filtroComponent.onApply();
  }
}
```

## Fluxo de Funcionamento

### Com `loadInitialData="true"`
1. Componente inicializa
2. Carrega filtro do state (se existir)
3. **Força validação** de todos os campos
4. Se válido: emite evento `apply` → carrega dados
5. Se inválido: mostra erros, não carrega dados

### Com `loadInitialData="false"`
1. Componente inicializa
2. Carrega filtro do state (se existir)
3. **NÃO força validação**
4. **NÃO carrega dados**
5. Aguarda interação do usuário

## Benefícios

- ✅ Controle fino sobre quando carregar dados
- ✅ Validação imediata quando necessário
- ✅ Melhor UX para diferentes cenários
- ✅ Compatibilidade com filtros salvos no state
- ✅ Flexibilidade para diferentes tipos de formulário