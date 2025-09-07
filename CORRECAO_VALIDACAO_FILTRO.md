# Correção: Validação de Filtro e Chamada da API

## Problema Identificado

1. **Formulário inválido**: A API estava sendo chamada mesmo quando o formulário de filtro estava inválido
2. **Filtro do StateProvider**: O filtro era carregado do state e a API era chamada automaticamente, sem respeitar a validação

## Soluções Implementadas

### 1. BaseFiltroDirective - Validação no onApply()

**Antes:**
```typescript
onApply(): void {
  if (this.gerenciador.form.invalid) {
    this.markAllFieldsAsTouched();
    return; // Parava aqui mas não impedia a emissão
  }
  // ... resto do código
  this.apply.emit(currentValue); // Era chamado mesmo com form inválido
}
```

**Depois:**
```typescript
onApply(): void {
  if (this.gerenciador.form.invalid) {
    this.markAllFieldsAsTouched();
    // CORREÇÃO: Não emite o evento apply se o formulário estiver inválido
    return;
  }
  // ... resto do código
  this.apply.emit(currentValue); // Só emite se form válido
}
```

### 2. BaseFiltroDirective - ngOnInit com validação

**Antes:**
```typescript
ngOnInit(): void {
  // ... carrega state
  this.onApply(); // Sempre chamava onApply
}
```

**Depois:**
```typescript
ngOnInit(): void {
  if (this.stateRef) {
    const savedState = this.stateRef.get();
    if (savedState?.filter) {
      this.gerenciador.patchValue(savedState.filter);
      // CORREÇÃO: Só aplica o filtro se o formulário estiver válido
      if (this.gerenciador.form.valid) {
        this.onApply();
      }
    }
  } else {
    // CORREÇÃO: Só aplica o filtro inicial se o formulário estiver válido
    if (this.gerenciador.form.valid) {
      this.onApply();
    }
  }
}
```

### 3. BaseListaPage - Não carrega automaticamente com filtro do state

**Antes:**
```typescript
ngOnInit(): void {
  // ... inicialização
  this.gerenciador.load(); // Sempre carregava
}
```

**Depois:**
```typescript
ngOnInit(): void {
  // ... inicialização
  // CORREÇÃO: Só carrega automaticamente se não há filtro do state
  if (!filtroDoState) {
    this.gerenciador.load();
  }
}
```

### 4. Método público para verificar validação

Adicionado na `BaseFiltroDirective`:
```typescript
public isFormValid(): boolean {
  return this.gerenciador.form.valid;
}
```

## Como Funciona Agora

### Cenário 1: Formulário Inválido
1. Usuário preenche filtro com dados inválidos
2. Clica em "Aplicar"
3. Sistema marca campos como touched (mostra erros)
4. **NÃO** emite evento `apply`
5. **NÃO** chama a API
6. Lista permanece vazia ou com dados anteriores

### Cenário 2: Filtro do StateProvider Inválido
1. Sistema carrega filtro salvo do state
2. Verifica se o formulário resultante é válido
3. Se **inválido**: não chama `onApply()`, não carrega dados
4. Se **válido**: chama `onApply()`, carrega dados com filtro

### Cenário 3: Filtro Válido
1. Usuário preenche filtro com dados válidos
2. Clica em "Aplicar"
3. Sistema valida formulário
4. Emite evento `apply` com dados do filtro
5. Chama a API com os filtros aplicados
6. Atualiza a lista com os resultados

## Novas Funcionalidades Adicionadas

### 1. Input `loadInitialData`
Controla se deve carregar dados automaticamente na inicialização:

```html
<!-- Carrega automaticamente se válido (padrão) -->
<app-filtro [loadInitialData]="true">

<!-- Espera interação do usuário -->
<app-filtro [loadInitialData]="false">
```

### 2. Validação Forçada
Novos métodos para forçar validação dos campos:

```typescript
// Força validação de todos os campos
forceValidation(): void

// Verifica se é válido após forçar validação
isFormValidWithValidation(): boolean
```

### 3. Comportamento Melhorado
- **Com filtro do state**: Força validação para mostrar erros imediatamente
- **Sem interação prévia**: Validadores só atuam após `forceValidation()`
- **Controle granular**: Decide quando carregar dados via `loadInitialData`

## Benefícios

- ✅ API só é chamada com formulários válidos
- ✅ Filtros do state são respeitados apenas se válidos
- ✅ Validação imediata quando necessário (resolve problema dos validadores)
- ✅ Controle fino sobre carregamento inicial de dados
- ✅ Melhor experiência do usuário com validação clara
- ✅ Performance melhorada (menos chamadas desnecessárias)
- ✅ Consistência entre validação e chamadas da API
- ✅ Flexibilidade para diferentes cenários de uso