# Correção: Chamadas Duplas da API

## Problema Identificado
A aplicação estava fazendo duas chamadas GET:
1. Uma com valores iniciais: `page=1&pageSize=5&status_delecao=0`
2. Outra com valores do state após aplicar filtro

## Causa do Problema

### 1. BaseListaPage.ngOnInit()
```typescript
// ANTES - Carregava dados automaticamente
const filtroDoState = this.obterFiltroDoState();
const queryFinal = filtroDoState ? { ...estadoInicialQuery, filters: filtroDoState } : estadoInicialQuery;
this.gerenciador = new GerenciadorListaSignal(this.obterServico(), queryFinal);

if (!filtroDoState) {
  this.gerenciador.load(); // PRIMEIRA CHAMADA
}
```

### 2. BaseFiltroDirective.ngOnInit()
```typescript
// ANTES - Emitia apply automaticamente
if (savedState?.filter) {
  this.gerenciador.patchValue(savedState.filter);
  if (shouldLoadInitialData && isValid) {
    this.onApply(); // SEGUNDA CHAMADA
  }
}
```

## Solução Implementada

### 1. BaseListaPage - Não Carrega Automaticamente
```typescript
// DEPOIS - Só inicializa, não carrega
const estadoInicialQuery = this.obterEstadoInicialQuery();
this.gerenciador = new GerenciadorListaSignal(this.obterServico(), estadoInicialQuery);
// NÃO chama load() automaticamente
```

### 2. BaseFiltroDirective - Simula Clique do Usuário
```typescript
// DEPOIS - Usa setTimeout para simular interação
if (this.stateRef) {
  const savedState = this.stateRef.get();
  if (savedState?.filter) {
    this.gerenciador.patchValue(savedState.filter);
    if (shouldLoadInitialData && this.isFormValidWithValidation()) {
      // Simula clique após inicialização completa
      setTimeout(() => this.onApply(), 0);
    }
  }
}
```

### 3. Fluxo Corrigido

#### Inicialização
1. **BaseListaPage.ngOnInit()**: Cria gerenciador vazio, não carrega dados
2. **BaseFiltroDirective.ngOnInit()**: Carrega filtro do state
3. **setTimeout()**: Simula clique do usuário após inicialização
4. **onApply()**: Emite evento apply se formulário válido
5. **applyFilterToTargets()**: Aplica filtro e carrega dados

#### Resultado
- ✅ **Uma única chamada** da API
- ✅ **Respeita validação** do formulário
- ✅ **Carrega state** corretamente
- ✅ **Simula interação** do usuário

## Benefícios

### Performance
- Reduz chamadas desnecessárias da API
- Evita carregamento duplo de dados
- Melhora tempo de resposta da aplicação

### UX
- Comportamento consistente
- Validação funciona corretamente
- State é preservado entre navegações

### Manutenibilidade
- Lógica mais clara e simples
- Menos logs de debug
- Fluxo mais previsível

## Teste da Correção

### Cenário 1: Primeira Visita (Sem State)
1. Usuário acessa página
2. Filtro inicializa com valores padrão
3. Se válido: faz uma chamada da API
4. Se inválido: não faz chamada

### Cenário 2: Retorno à Página (Com State)
1. Usuário retorna à página
2. Filtro carrega valores do state
3. Se válido: faz uma chamada da API com filtro
4. Se inválido: não faz chamada, mostra erros

### Cenário 3: loadInitialData=false
1. Usuário acessa página
2. Filtro carrega do state mas não aplica
3. Nenhuma chamada da API
4. Usuário deve clicar "Aplicar" manualmente

## Verificação

Para verificar se está funcionando:

1. **Abra Network tab** no DevTools
2. **Navegue para a página**
3. **Deve haver apenas 1 chamada** da API
4. **Filtro deve estar preenchido** se há state salvo