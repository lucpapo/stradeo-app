# 🎭 Dois Tipos de Offcanvas Aninhados

## 🎯 Visão Geral

Implementamos dois tipos distintos de offcanvas aninhados para atender diferentes necessidades de UX:

### 1. 🔗 Modo Sem Backdrop (Lado a Lado)
- Offcanvas abrem lado a lado
- Apenas o primeiro tem backdrop
- Ideal para comparações e visualizações múltiplas

### 2. 🏗️ Modo Com Backdrop (Camadas)
- Cada offcanvas tem seu próprio backdrop
- Criam camadas sobrepostas
- Ideal para workflows e navegação hierárquica

## 🚀 Como Usar

### Métodos do OffcanvasService

#### Modo Sem Backdrop
```typescript
// Abrir offcanvas aninhado sem backdrop
openNestedNoBackdrop(component, data?, options?)

// Abrir lado a lado em posição específica
openSideBySide(component, position, data?, panelClass?)
```

#### Modo Com Backdrop
```typescript
// Abrir offcanvas aninhado com backdrop
openNestedWithBackdrop(component, data?, options?)

// Abrir em camadas
openLayered(component, data?, panelClass?)
```

#### Configuração Manual
```typescript
// Usando o método open com nestingMode
this.offcanvasService.open(component, data, injector, {
  nestingMode: 'no-backdrop', // ou 'with-backdrop'
  position: 'end',
  panelClass: 'offcanvas-class-80'
});
```

## 🎨 Características Visuais

### Modo Sem Backdrop
- **Backdrop**: Apenas o primeiro offcanvas
- **Posicionamento**: Lado a lado
- **Z-index**: Sequencial (10000, 10010, 10020...)
- **Uso**: Comparações, dashboards, visualizações múltiplas

### Modo Com Backdrop
- **Backdrop**: Cada offcanvas tem o seu
- **Posicionamento**: Camadas sobrepostas
- **Z-index**: Intercalado (offcanvas + backdrop)
- **Uso**: Workflows, formulários em etapas, navegação hierárquica

## 🎛️ Opções de Configuração

### Interface OffcanvasOptions
```typescript
interface OffcanvasOptions {
  panelClass?: string;                    // Classe de largura
  position?: 'start' | 'end' | 'top' | 'bottom'; // Posição
  backdrop?: boolean | 'static';         // Controle do backdrop
  closePrevious?: boolean;               // Fechar anterior
  keepPreviousBackdrop?: boolean;        // Manter backdrop anterior
  nestingMode?: 'no-backdrop' | 'with-backdrop'; // Tipo de aninhamento
}
```

## 📋 Exemplos Práticos

### Exemplo 1: Comparação de Produtos (Sem Backdrop)
```typescript
// Abrir primeiro produto à direita
this.offcanvasService.openSideBySide(
  ProductComponent, 
  'end', 
  { productId: 1 }, 
  'offcanvas-class-50'
);

// Abrir segundo produto à esquerda para comparar
this.offcanvasService.openSideBySide(
  ProductComponent, 
  'start', 
  { productId: 2 }, 
  'offcanvas-class-50'
);
```

### Exemplo 2: Workflow de Cadastro (Com Backdrop)
```typescript
// Etapa 1: Dados básicos
this.offcanvasService.openLayered(
  BasicDataComponent, 
  { step: 1 }, 
  'offcanvas-class-80'
);

// Etapa 2: Detalhes (será aberto de dentro da etapa 1)
this.offcanvasService.openLayered(
  DetailsComponent, 
  { step: 2 }, 
  'offcanvas-class-70'
);

// Etapa 3: Confirmação (será aberto de dentro da etapa 2)
this.offcanvasService.openLayered(
  ConfirmationComponent, 
  { step: 3 }, 
  'offcanvas-class-60'
);
```

## 🎨 CSS Classes Automáticas

### Classes de Modo
- `.offcanvas-no-backdrop-mode` - Aplicada ao body no modo sem backdrop
- `.offcanvas-with-backdrop-mode` - Aplicada ao body no modo com backdrop

### Classes de Nível
- `.offcanvas-level-1` - Primeiro nível
- `.offcanvas-level-2` - Segundo nível
- `.offcanvas-level-3` - Terceiro nível
- E assim por diante...

### Classes de Largura
- `.offcanvas-class-50` - 50% da tela
- `.offcanvas-class-60` - 60% da tela
- `.offcanvas-class-70` - 70% da tela
- `.offcanvas-class-80` - 80% da tela
- `.offcanvas-class-85` - 85% da tela
- `.offcanvas-class-90` - 90% da tela

## 🧪 Como Testar

### 1. Acesse a Página de Teste
```
http://localhost:4200/offcanvas-test
```

### 2. Use a Seção "Demo dos Dois Tipos de Aninhamento"

#### Modo Sem Backdrop:
1. Clique em "Iniciar pela Direita" ou "Iniciar pela Esquerda"
2. No offcanvas aberto, use os botões para abrir mais offcanvas
3. Observe que ficam lado a lado com um único backdrop

#### Modo Com Backdrop:
1. Clique em "Iniciar Camadas"
2. No offcanvas aberto, use os botões para criar novas camadas
3. Observe que cada um tem seu próprio backdrop

#### Demo Mista:
1. Clique em "Demo Mista"
2. Escolha entre os dois tipos de aninhamento
3. Teste a combinação de ambos os modos

## 🎯 Casos de Uso Recomendados

### Sem Backdrop (Lado a Lado)
- ✅ Comparação de itens
- ✅ Dashboards múltiplos
- ✅ Visualização de dados relacionados
- ✅ Edição simultânea
- ✅ Referência cruzada

### Com Backdrop (Camadas)
- ✅ Workflows em etapas
- ✅ Formulários complexos
- ✅ Navegação hierárquica
- ✅ Detalhamento progressivo
- ✅ Assistentes (wizards)

## 🎉 Benefícios

### Flexibilidade Total
- Escolha o modo ideal para cada situação
- Combine ambos os modos conforme necessário
- Controle completo sobre posicionamento e tamanho

### UX Otimizada
- Backdrop apropriado para cada contexto
- Navegação intuitiva
- Feedback visual claro

### Desenvolvimento Simplificado
- API consistente e intuitiva
- Métodos de conveniência
- Configuração flexível