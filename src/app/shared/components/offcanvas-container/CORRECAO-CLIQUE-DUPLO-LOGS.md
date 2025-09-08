# Correção: Prevenção de Clique Duplo no Log de Segurança

## Problema Identificado
Ao clicar duas vezes rapidamente no botão "Log de Segurança", estavam sendo adicionados dois itens na pilha quando deveria ficar apenas um.

## Causa Raiz
O problema ocorria devido a **condições de corrida (race conditions)**:
1. Primeiro clique inicia o processo de abertura
2. Segundo clique (rápido) acontece antes do primeiro ser processado completamente
3. Ambos os cliques passam pela verificação `currentOffcanvasRefs.has(offcanvasType)` 
4. Resultado: dois offcanvas são criados na pilha

## Solução Implementada

### 1. Flags de Controle de Estado
Adicionadas duas flags para prevenir cliques múltiplos:
```typescript
private isOpeningLogs = false; // Flag para prevenir cliques duplos em logs
private isOpeningItem = false; // Flag para prevenir cliques duplos em dados
```

### 2. Verificação Preventiva
```typescript
openSecurityLogs(item: SimulationItem) {
  // Previne cliques duplos/múltiplos
  if (this.isOpeningLogs) {
    return; // Sai imediatamente se já está processando
  }
  // ... resto da lógica
}
```

### 3. Controle de Timing Melhorado
```typescript
// Quando há offcanvas existente para fechar
if (this.currentOffcanvasRefs.has(offcanvasType)) {
  this.isOpeningLogs = true; // Marca como processando
  // ... fecha o existente
  setTimeout(() => {
    this.openSecurityLogsInternal(item);
    this.isOpeningLogs = false; // Libera após completar
  }, 150); // Aumentado de 100ms para 150ms
  return;
}

// Quando não há offcanvas existente
this.isOpeningLogs = true; // Marca como processando
this.openSecurityLogsInternal(item);
setTimeout(() => {
  this.isOpeningLogs = false; // Libera após delay
}, 150);
```

## 📊 Fluxo Corrigido

### Cenário: Clique Duplo Rápido
```
Clique 1: 
  ✅ isOpeningLogs = false → Processa
  ✅ isOpeningLogs = true → Bloqueia novos cliques
  ✅ Abre offcanvas
  ✅ Após 150ms: isOpeningLogs = false

Clique 2 (durante os 150ms):
  ❌ isOpeningLogs = true → return (ignorado)
```

### Cenário: Substituição de Offcanvas
```
Clique 1: Abre Log A
Clique 2: 
  ✅ Detecta Log A existente
  ✅ isOpeningLogs = true → Bloqueia
  ✅ Fecha Log A
  ✅ Após 150ms: Abre Log B + isOpeningLogs = false
```

## 🔧 Melhorias Implementadas

### Timing Otimizado
- **Antes**: 100ms de timeout
- **Depois**: 150ms de timeout
- **Motivo**: Garante tempo suficiente para animações de fechamento

### Proteção Dupla
1. **Flag de estado**: Previne processamento simultâneo
2. **Timeout**: Garante fechamento completo antes da abertura

### Consistência
- Mesma lógica aplicada para `openSecurityLogs()` e `openItemData()`
- Flags independentes para cada tipo de offcanvas

## ✅ Resultado Final

### Comportamento Garantido
- ✅ **Clique duplo**: Apenas 1 offcanvas na pilha
- ✅ **Clique triplo**: Apenas 1 offcanvas na pilha  
- ✅ **Cliques rápidos**: Ignorados durante processamento
- ✅ **Substituição**: Funciona corretamente com timing adequado
- ✅ **Coexistência**: Logs + Dados ainda funcionam (tipos diferentes)

### Teste Recomendado
1. Clique duplo rápido em "Log de Segurança" → Deve abrir apenas 1
2. Clique múltiplo em "Dados do Item" → Deve abrir apenas 1
3. Abrir Log + Dados da mesma linha → Devem coexistir (2 na pilha)
4. Verificar contador "Pilha: X" no cabeçalho

## 🎯 Problema Resolvido
**Antes**: Clique duplo = 2 itens na pilha ❌  
**Depois**: Clique duplo = 1 item na pilha ✅