# Correção: Dados do Item - Único Item na Pilha Sem Backdrop

## Problema Identificado
O botão "Dados do Item" na simulação da tabela estava permitindo múltiplos offcanvas na pilha e respeitando a configuração de backdrop do switch.

## Solução Implementada

### 1. Comportamento Específico para "Dados do Item"
- **Sempre fecha todos os offcanvas existentes** antes de abrir um novo
- **Sempre abre sem backdrop** (independente do switch)
- **Garante que só existe um item na pilha**

### 2. Código Modificado

```typescript
openItemData(item: SimulationItem) {
  // Fecha todos os offcanvas existentes para garantir que só tenha um na pilha
  this.offcanvasService.closeAll();
  this.currentOffcanvasRefs.clear();
  
  // Abre offcanvas de dados no lado esquerdo SEMPRE sem backdrop
  const offcanvasRef = this.offcanvasService.open(
    TableOffcanvasContentComponent,
    {
      idOrigem: `item-${item.id}`,
      contextState: `item-${item.name}`,
      title: `Dados do Item - ${item.name}`,
      content: this.generateItemDataContent(item),
      offcanvasType: 'item'
    },
    undefined,
    {
      position: 'start',
      panelClass: 'offcanvas-class-40',
      backdrop: false, // SEMPRE sem backdrop para dados do item
      nestingMode: 'no-backdrop'
    }
  );
}
```

### 3. Diferenças de Comportamento

| Ação | Comportamento |
|------|---------------|
| **Log de Segurança** | Respeita o switch de backdrop, permite múltiplos do mesmo tipo |
| **Dados do Item** | **SEMPRE sem backdrop, SEMPRE único na pilha** |

### 4. Indicações Visuais
- Tooltip no botão: "Abre único item na pilha, sempre sem backdrop"
- Texto explicativo abaixo do switch: "* 'Dados do Item' sempre abre único item sem backdrop"

## Resultado
- Qualquer clique em "Dados do Item" fecha todos os offcanvas existentes
- Abre apenas um novo offcanvas sem backdrop
- Comportamento consistente e previsível
- Interface mais limpa e focada