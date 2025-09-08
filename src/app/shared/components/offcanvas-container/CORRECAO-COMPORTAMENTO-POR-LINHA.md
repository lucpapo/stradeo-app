# Correção: Comportamento Baseado na Linha da Tabela

## Regra Implementada
O comportamento dos offcanvas agora é baseado no **índice da linha da tabela**:

### 🎯 Lógica Principal
- **Mesma linha (mesmo item.id)**: Log e Dados podem coexistir
- **Linha diferente (item.id diferente)**: Limpa toda a pilha e abre só o novo

## 📋 Comportamento Detalhado

### Cenário 1: Cliques na Mesma Linha
```
Linha 1 - Log → Abre Log (50%)
Linha 1 - Dados → Mantém Log + Abre Dados (40%)
Linha 1 - Log → Substitui Log anterior
Linha 1 - Dados → Substitui Dados anterior
```
**Resultado**: Máximo 2 offcanvas (1 Log + 1 Dados) da mesma linha

### Cenário 2: Cliques em Linhas Diferentes
```
Linha 1 - Log → Abre Log da Linha 1
Linha 2 - Dados → LIMPA TUDO + Abre Dados da Linha 2
Linha 3 - Log → LIMPA TUDO + Abre Log da Linha 3
```
**Resultado**: Sempre apenas 1 offcanvas da linha atual

## 🔧 Implementação Técnica

### Controle de Estado
```typescript
private currentItemId: number | null = null; // Rastrear o ID do item atual na pilha
```

### Lógica nos Métodos
```typescript
// Se é uma linha diferente, limpa toda a pilha
if (this.currentItemId !== null && this.currentItemId !== item.id) {
  this.offcanvasService.closeAll();
  this.currentOffcanvasRefs.clear();
}

// Se já tem um offcanvas do mesmo tipo, fecha apenas esse
if (this.currentOffcanvasRefs.has(offcanvasType)) {
  const existingRef = this.currentOffcanvasRefs.get(offcanvasType);
  if (existingRef) {
    existingRef.close();
    this.currentOffcanvasRefs.delete(offcanvasType);
  }
}

// Define o item atual
this.currentItemId = item.id;
```

### Limpeza Automática
```typescript
// Remove a referência quando o offcanvas for fechado
offcanvasRef.result.catch(() => {
  this.currentOffcanvasRefs.delete(offcanvasType);
  // Se não há mais offcanvas, limpa o item atual
  if (this.currentOffcanvasRefs.size === 0) {
    this.currentItemId = null;
  }
});
```

## 📊 Tabela de Comportamentos

| Ação | Linha Atual | Resultado |
|------|-------------|-----------|
| **Log → Log** | Mesma | Substitui log anterior |
| **Dados → Dados** | Mesma | Substitui dados anterior |
| **Log → Dados** | Mesma | Mantém log + adiciona dados |
| **Dados → Log** | Mesma | Mantém dados + adiciona log |
| **Qualquer → Qualquer** | Diferente | Limpa tudo + abre novo |

## 🎨 Indicações Visuais
- **Tooltip**: "Mesma linha: coexiste | Linha diferente: limpa pilha"
- **Texto explicativo**: "Logs (esquerda 50%) e Dados (esquerda 40%) podem coexistir"
- **Contador de pilha**: Mostra quantos offcanvas estão abertos

## ✅ Resultado Final
- ✅ **Comportamento consistente** baseado na linha da tabela
- ✅ **Coexistência inteligente** dentro da mesma linha
- ✅ **Limpeza automática** ao mudar de linha
- ✅ **Interface previsível** e intuitiva