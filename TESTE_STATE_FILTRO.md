# Teste: Carregamento do State no Filtro

## Problema Identificado
A alteração perdeu o carregamento do filtro do state.

## Correção Aplicada

### 1. Removido Dependência Circular
**Antes:**
```html
<app-tipocategoria-filter [value]="getFilterManager('lista-principal').filterValue()">
```

**Depois:**
```html
<app-tipocategoria-filter 
  [masterKey]="'ui-TipocategoriaShellComponent'" 
  [componentKey]="'filter-lista-principal'">
```

### 2. Lógica de Carregamento do State
```typescript
ngOnInit(): void {
  const shouldLoadInitialData = this.loadInitialData();
  
  // Carrega estado salvo se StateRef estiver configurado
  if (this.stateRef) {
    const savedState = this.stateRef.get();
    if (savedState?.filter) {
      // CORREÇÃO: Carrega filtro do state
      this.gerenciador.patchValue(savedState.filter);
      
      if (shouldLoadInitialData) {
        // Força validação para mostrar erros se houver
        const isValid = this.isFormValidWithValidation();
        if (isValid) {
          this.onApply();
        }
      }
    }
  }
}
```

## Como Testar

### 1. Teste Manual
1. Abra a página de tipo categoria
2. Preencha o filtro com dados válidos
3. Clique em "Aplicar"
4. Navegue para outra página
5. Volte para tipo categoria
6. **Resultado esperado**: Filtro deve estar preenchido com os dados anteriores

### 2. Teste com Dados Inválidos
1. Abra a página de tipo categoria
2. Preencha o filtro com dados inválidos (ex: descrição vazia se obrigatória)
3. Clique em "Aplicar"
4. Navegue para outra página
5. Volte para tipo categoria
6. **Resultado esperado**: 
   - Filtro preenchido com dados inválidos
   - Erros de validação visíveis
   - Lista vazia (não carregou dados)

### 3. Teste com loadInitialData=false
```html
<app-tipocategoria-filter [loadInitialData]="false">
```
1. Configure o filtro com `loadInitialData="false"`
2. Preencha filtro válido e aplique
3. Navegue e volte
4. **Resultado esperado**:
   - Filtro preenchido
   - Lista vazia (não carregou automaticamente)
   - Precisa clicar "Aplicar" para carregar

## Fluxo Correto

### Inicialização
1. `ngOnInit()` é chamado
2. Verifica se há `StateRef` configurado
3. Se há state salvo: carrega no formulário
4. Se `loadInitialData=true` e formulário válido: chama API
5. Se `loadInitialData=false`: não chama API

### Aplicação de Filtro
1. Usuário clica "Aplicar"
2. Valida formulário
3. Se válido: salva no state e emite evento
4. Se inválido: mostra erros, não emite evento

### Navegação
1. Ao sair da página: state é mantido
2. Ao voltar: state é carregado automaticamente
3. Comportamento depende de `loadInitialData`

## Verificação de Funcionamento

Para verificar se está funcionando:

```typescript
// No console do navegador, após aplicar um filtro:
console.log('State atual:', 
  JSON.parse(localStorage.getItem('ui-TipocategoriaShellComponent#filter-lista-principal') || '{}')
);
```

O state deve conter o filtro aplicado.