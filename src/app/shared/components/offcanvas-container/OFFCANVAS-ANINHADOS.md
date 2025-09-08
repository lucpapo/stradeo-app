# 🔗 Sistema de Offcanvas Aninhados

## 🎯 Funcionalidades Implementadas

### ✅ Backdrop do Anterior Permanece
- O primeiro offcanvas mantém seu backdrop visível
- Offcanvas aninhados não criam backdrop próprio
- Backdrop escuro permanece como fundo para toda a pilha

### ✅ Escolha de Posição
- **Direita (end)**: Offcanvas aparece do lado direito
- **Esquerda (start)**: Offcanvas aparece do lado esquerdo  
- **Lado Oposto**: Automaticamente escolhe o lado oposto ao último offcanvas
- **Top/Bottom**: Suporte para posições superior e inferior

### ✅ Gerenciamento de Pilha Inteligente
- Z-index automático baseado no nível (10000, 10010, 10020, etc.)
- Indicadores visuais de nível nos offcanvas
- Informações da pilha em tempo real
- Controle de fechamento individual ou em massa

## 🚀 Como Usar

### Métodos Principais do OffcanvasService

```typescript
// Abrir em posição específica
openAtPosition(component, position, data?, panelClass?)

// Abrir no lado oposto ao último
openOpposite(component, data?, panelClass?)

// Abrir com opções avançadas
open(component, data?, injector?, options: OffcanvasOptions)
```

### Opções Disponíveis (OffcanvasOptions)

```typescript
interface OffcanvasOptions {
  panelClass?: string;           // Classe CSS para largura
  position?: 'start' | 'end' | 'top' | 'bottom';
  backdrop?: boolean | 'static'; // Controle do backdrop
  closePrevious?: boolean;       // Fechar anterior ao abrir
  keepPreviousBackdrop?: boolean; // Manter backdrop do anterior
}
```

## 🎨 Estilos e Classes CSS

### Classes de Nível
- `.offcanvas-level-1` - Primeiro nível (z-index: 10000)
- `.offcanvas-level-2` - Segundo nível (z-index: 10010)
- `.offcanvas-level-3` - Terceiro nível (z-index: 10020)
- E assim por diante...

### Classes de Largura
- `.offcanvas-class-50` - 50% da tela
- `.offcanvas-class-60` - 60% da tela
- `.offcanvas-class-70` - 70% da tela
- `.offcanvas-class-80` - 80% da tela
- `.offcanvas-class-85` - 85% da tela (padrão)
- `.offcanvas-class-90` - 90% da tela
- `.offcanvas-class-95` - 95% da tela
- `.offcanvas-class-full` - 100% da tela

### Sombras Diferenciadas
- Cada nível tem sombra progressivamente mais intensa
- Posições diferentes (start/end) têm sombras apropriadas

## 📋 Exemplo de Uso

```typescript
// No seu componente
constructor(private offcanvasService: OffcanvasService) {}

// Abrir primeiro offcanvas
openFirst() {
  this.offcanvasService.openAtPosition(
    MyComponent,
    'end',
    { data: 'primeiro' },
    'offcanvas-class-80'
  );
}

// Abrir aninhado do lado oposto
openNested() {
  this.offcanvasService.openOpposite(
    MyComponent,
    { data: 'aninhado' },
    'offcanvas-class-70'
  );
}

// Abrir com opções avançadas
openAdvanced() {
  this.offcanvasService.open(MyComponent, { data: 'avançado' }, undefined, {
    position: 'start',
    panelClass: 'offcanvas-class-60',
    keepPreviousBackdrop: true
  });
}
```

## 🧪 Testando o Sistema

1. Acesse `/offcanvas-test`
2. Use a seção "Demo de Offcanvas Aninhados"
3. Clique em "Começar pela Direita" ou "Começar pela Esquerda"
4. No offcanvas aberto, teste os botões:
   - ➡️ Direita
   - ⬅️ Esquerda  
   - 🔄 Lado Oposto
5. Observe que o backdrop do primeiro permanece
6. Use "Info da Pilha" para ver detalhes
7. Teste diferentes tamanhos e posições

## 🎯 Benefícios

- **UX Melhorada**: Backdrop consistente e visível
- **Flexibilidade**: Escolha livre de posição e tamanho
- **Organização**: Sistema de pilha bem estruturado
- **Performance**: Z-index otimizado e gerenciamento eficiente
- **Responsivo**: Adaptação automática para dispositivos móveis
- **Acessibilidade**: Indicadores visuais claros de nível e contexto