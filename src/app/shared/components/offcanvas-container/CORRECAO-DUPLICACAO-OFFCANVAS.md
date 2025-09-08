# Correção: Prevenção de Duplicação de Offcanvas

## Problema Identificado
Ao clicar múltiplas vezes no mesmo botão (Log de Segurança ou Dados do Item), estavam sendo criados múltiplos offcanvas na pilha em vez de apenas um.

## Causa do Problema
A lógica de verificação e fechamento do offcanvas existente não estava funcionando de forma síncrona, permitindo que múltiplos offcanvas fossem criados antes do anterior ser fechado.

## Solução Implementada

### 1. Separação em Métodos Internos
Criamos métodos internos para a abertura real do offcanvas:
- `openSecurityLogsInternal(item)`
- `openItemDataInternal(item)`

### 2. Verificação com Timeout
```typescript
// Se já tem um offcanvas do mesmo tipo, fecha e aguarda
if (this.currentOffcanvasRefs.has(offcanvasType)) {
  const existingRef = this.currentOffcanvasRefs.get(offcanvasType);
  if (existingRef) {
    existingRef.close();
    this.currentOffcanvasRefs.delete(offcanvasType);
  }
  // Aguarda um pouco para garantir que fechou antes de abrir novo
  setTimeout(() => {
    this.openSecurityLogsInternal(item);
  }, 100);
  return;
}
```

### 3. Fluxo de Execução Corrigido

#### Método Principal (openSecurityLogs/openItemData)
1. Verifica se é linha diferente → limpa pilha
2. Verifica se já existe do mesmo tipo → fecha e agenda abertura
3. Se não existe → abre diretamente

#### Método Interno (openSecurityLogsInternal/openItemDataInternal)
1. Define o item atual
2. Abre o offcanvas
3. Armazena a referência
4. Configura limpeza automática

## 📊 Comportamento Corrigido

### Antes (Problema)
```
Clique 1: Abre Log 1
Clique 2: Abre Log 2 (duplicação)
Clique 3: Abre Log 3 (triplicação)
Pilha: [Log 1, Log 2, Log 3] ❌
```

### Depois (Corrigido)
```
Clique 1: Abre Log 1
Clique 2: Fecha Log 1 → Abre Log 1 (substitui)
Clique 3: Fecha Log 1 → Abre Log 1 (substitui)
Pilha: [Log 1] ✅
```

## 🔧 Detalhes Técnicos

### Timeout de 100ms
- Garante que o offcanvas anterior seja completamente fechado
- Evita condições de corrida (race conditions)
- Tempo suficiente para animações de fechamento

### Limpeza Automática
```typescript
offcanvasRef.result.catch(() => {
  this.currentOffcanvasRefs.delete(offcanvasType);
  // Se não há mais offcanvas, limpa o item atual
  if (this.currentOffcanvasRefs.size === 0) {
    this.currentItemId = null;
  }
});
```

## ✅ Resultado Final
- ✅ **Cliques múltiplos no mesmo botão**: Apenas 1 offcanvas
- ✅ **Substituição correta**: Fecha anterior, abre novo
- ✅ **Coexistência mantida**: Log + Dados da mesma linha
- ✅ **Limpeza por linha**: Linha diferente limpa tudo
- ✅ **Sem duplicação**: Máximo 2 offcanvas (1 Log + 1 Dados)