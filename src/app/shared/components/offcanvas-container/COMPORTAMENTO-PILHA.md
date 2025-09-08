# 🎯 Comportamento da Pilha de Offcanvas

## 📋 Regras de Empilhamento

### 1. **Mesmo Tipo de Botão**
Quando você clica no **mesmo tipo** de botão de uma linha diferente:
- ❌ **Fecha** o offcanvas atual desse tipo
- ✅ **Abre** novo offcanvas com os dados da nova linha

**Exemplo:**
```
Estado inicial: [Dados Item #1]
Clica em "Dados do Item" da linha #3
Resultado: [Dados Item #3]  // Substituiu o anterior
```

### 2. **Tipo Diferente de Botão**
Quando você clica em um **tipo diferente** de botão:
- ✅ **Mantém** o offcanvas atual
- ✅ **Empilha** novo offcanvas por cima

**Exemplo:**
```
Estado inicial: [Dados Item #1]
Clica em "Log de Segurança" da linha #2
Resultado: [Dados Item #1] → [Logs #2]  // Empilhou
```

## 🎭 Controle de Backdrop

### Sem Backdrop (Padrão)
- Offcanvas ficam lado a lado
- Você pode interagir com a tabela
- Ideal para comparar dados

### Com Backdrop
- Offcanvas ficam em camadas
- Backdrop escurece o fundo
- Foco total no offcanvas atual

## 🔄 Cenários de Uso

### Cenário 1: Comparar Dados
```
1. Clique em "Dados do Item" linha #1 → Abre à esquerda
2. Clique em "Log de Segurança" linha #1 → Empilha à direita
3. Resultado: Dados e Logs do mesmo item lado a lado
```

### Cenário 2: Trocar Item
```
1. Clique em "Dados do Item" linha #1 → Abre à esquerda
2. Clique em "Dados do Item" linha #3 → Substitui por dados da linha #3
3. Resultado: Apenas dados da linha #3
```

### Cenário 3: Múltiplos Itens
```
1. Clique em "Dados do Item" linha #1 → Abre à esquerda
2. Clique em "Log de Segurança" linha #2 → Empilha à direita
3. Clique em "Log de Segurança" linha #4 → Substitui logs por linha #4
4. Resultado: [Dados #1] + [Logs #4]
```

## 🎮 Controles Disponíveis

### Na Tabela
- **🚫/🎭 Switch Backdrop**: Alterna modo de backdrop
- **📊 Pilha: X**: Mostra quantidade de offcanvas abertos
- **🗑️ Fechar Todos**: Fecha todos os offcanvas

### Nos Offcanvas
- **❌ Fechar**: Fecha apenas este offcanvas
- **📊 Pilha: X**: Mostra info detalhada da pilha
- **Tipo**: Indica se é Logs ou Dados

## 🔧 Implementação Técnica

### Rastreamento de Tipos
```typescript
private currentOffcanvasTypes: Set<string> = new Set();
// Rastreia: 'logs', 'item'
```

### Lógica de Fechamento
```typescript
// Mesmo tipo: fecha atual e abre novo
if (this.currentOffcanvasTypes.has(offcanvasType)) {
  this.closeOffcanvasByType(offcanvasType);
}

// Tipo diferente: apenas empilha
this.currentOffcanvasTypes.add(offcanvasType);
```

### Configuração de Backdrop
```typescript
{
  backdrop: this.useBackdrop,
  nestingMode: this.useBackdrop ? 'with-backdrop' : 'no-backdrop'
}
```

## 🎯 Benefícios

1. **Intuitivo**: Mesmo tipo substitui, tipo diferente empilha
2. **Flexível**: Controle de backdrop conforme necessidade
3. **Eficiente**: Não acumula offcanvas desnecessários
4. **Visual**: Indicadores claros do estado atual