# Correção: Log de Segurança - Único Item na Pilha com 50% de Largura

## Problema Identificado
O botão "Log de Segurança" estava permitindo múltiplos offcanvas na pilha e respeitando a configuração de backdrop do switch.

## Solução Implementada

### 1. Comportamento Específico para "Log de Segurança"
- **Fecha apenas offcanvas do mesmo tipo** (logs) antes de abrir um novo
- **Sempre abre sem backdrop** (independente do switch)
- **50% de largura no lado esquerdo**
- **Permite coexistir com "Dados do Item"** (tipos diferentes na pilha)

### 2. Código Modificado

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
  
  // Abre offcanvas de logs no lado esquerdo com 50% de largura, SEMPRE sem backdrop
  const offcanvasRef = this.offcanvasService.open(
    TableOffcanvasContentComponent,
    {
      idOrigem: `logs-${item.id}`,
      contextState: `logs-${item.name}`,
      title: `Logs de Segurança - ${item.name}`,
      content: this.generateSecurityLogsContent(item),
      offcanvasType: offcanvasType
    },
    undefined,
    {
      position: 'start',
      panelClass: 'offcanvas-class-50', // 50% de largura
      backdrop: false, // SEMPRE sem backdrop para logs
      nestingMode: 'no-backdrop'
    }
  );
}
```

### 3. Comportamento Atualizado

| Ação | Posição | Largura | Comportamento na Pilha |
|------|---------|---------|------------------------|
| **Log de Segurança** | Esquerda | 50% | Fecha apenas outros logs, permite coexistir com dados |
| **Dados do Item** | Esquerda | 40% | Fecha TODOS os offcanvas, único na pilha |

### 4. Cenários de Uso

#### Cenário 1: Abrir apenas logs
- Clique em "Log de Segurança" → Abre log único (50%)
- Clique em outro "Log de Segurança" → Fecha o anterior, abre o novo

#### Cenário 2: Abrir logs + dados
- Clique em "Log de Segurança" → Abre log (50%)
- Clique em "Dados do Item" → Fecha tudo, abre apenas dados (40%)

#### Cenário 3: Abrir dados + logs
- Clique em "Dados do Item" → Abre dados únicos (40%)
- Clique em "Log de Segurança" → Mantém dados, adiciona log (50%)

### 5. Indicações Visuais
- Tooltip no botão Log: "Abre único log na pilha, 50% largura, sempre sem backdrop"
- Tooltip no botão Dados: "Abre único item na pilha, sempre sem backdrop"
- Texto explicativo: "Ambos botões abrem único item na pilha, sempre sem backdrop"

## Resultado
- **Log de Segurança**: Comportamento único por tipo, 50% largura, sem backdrop
- **Dados do Item**: Comportamento único global, 40% largura, sem backdrop
- **Coexistência**: Logs e dados podem existir juntos na pilha
- **Interface limpa**: Sempre sem backdrop, larguras otimizadas