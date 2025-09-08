# Correção: Comportamento Consistente - Coexistência de Logs e Dados

## Problema Identificado
O comportamento estava inconsistente:
- **Log de Segurança**: Fechava apenas logs do mesmo tipo
- **Dados do Item**: Fechava TODOS os offcanvas

Isso causava comportamento estranho onde na mesma linha podiam coexistir, mas em linhas diferentes um fechava o outro.

## Solução Implementada

### 1. Comportamento Consistente para Ambos
Ambos os botões agora seguem a mesma lógica:
- **Fecham apenas offcanvas do mesmo tipo**
- **Permitem coexistência de tipos diferentes**
- **Sempre sem backdrop**

### 2. Posicionamento Diferenciado

| Tipo | Posição | Largura | Comportamento |
|------|---------|---------|---------------|
| **Log de Segurança** | Esquerda | 50% | Fecha apenas outros logs |
| **Dados do Item** | Direita | 40% | Fecha apenas outros dados |

### 3. Código Atualizado

#### Log de Segurança (mantido)
```typescript
openSecurityLogs(item: SimulationItem) {
  const offcanvasType = 'logs';
  
  // Se já tem um offcanvas do mesmo tipo (logs), fecha apenas esse
  if (this.currentOffcanvasRefs.has(offcanvasType)) {
    const existingRef = this.currentOffcanvasRefs.get(offcanvasType);
    if (existingRef) {
      existingRef.close();
      this.currentOffcanvasRefs.delete(offcanvasType);
    }
  }
  
  // Abre no lado esquerdo com 50%
  // position: 'start', panelClass: 'offcanvas-class-50'
}
```

#### Dados do Item (corrigido)
```typescript
openItemData(item: SimulationItem) {
  const offcanvasType = 'item';
  
  // Se já tem um offcanvas do mesmo tipo (item), fecha apenas esse
  if (this.currentOffcanvasRefs.has(offcanvasType)) {
    const existingRef = this.currentOffcanvasRefs.get(offcanvasType);
    if (existingRef) {
      existingRef.close();
      this.currentOffcanvasRefs.delete(offcanvasType);
    }
  }
  
  // Abre no lado direito com 40%
  // position: 'end', panelClass: 'offcanvas-class-40'
}
```

### 4. Cenários de Teste Consistentes

#### ✅ Cenário 1: Mesmo tipo
- Log → Log: Substitui o log anterior
- Dados → Dados: Substitui os dados anteriores

#### ✅ Cenário 2: Tipos diferentes (qualquer linha)
- Log → Dados: Mantém log, adiciona dados (coexistem)
- Dados → Log: Mantém dados, adiciona log (coexistem)

#### ✅ Cenário 3: Coexistência máxima
- Pode ter 1 Log (esquerda 50%) + 1 Dados (direita 40%) simultaneamente
- Total máximo: 2 offcanvas na pilha

### 5. Indicações Visuais Atualizadas
- **Log**: "Abre único log por tipo, 50% esquerda, sempre sem backdrop"
- **Dados**: "Abre único item por tipo, 40% direita, sempre sem backdrop"
- **Texto explicativo**: "Logs (esquerda 50%) e Dados (direita 40%) podem coexistir"

## Resultado
- ✅ **Comportamento consistente** independente da linha
- ✅ **Coexistência inteligente** de tipos diferentes
- ✅ **Posicionamento otimizado** (esquerda vs direita)
- ✅ **Interface previsível** e intuitiva