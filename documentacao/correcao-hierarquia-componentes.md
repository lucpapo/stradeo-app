# Correção da Hierarquia de Componentes - TipoCategoria

## Problema Identificado
O `TipocategoriaContainer#main` estava sendo instanciado muito cedo, antes mesmo dos componentes de filtro e lista que dependem de rota. O container estava sendo carregado diretamente no shell, causando inicialização prematura.

## Mudanças Realizadas

### 1. Correção do TipocategoriaShellComponent
**Arquivo:** `src/app/features/configuracoes/tipocategoria/tipocategoria-shell.component.ts`

**Problema:** O shell estava instanciando o container diretamente no template
**Solução:** Voltou a usar `<router-outlet>` para lazy loading

**Antes:**
```typescript
template: `<app-tipocategoria-container></app-tipocategoria-container>`,
imports: [CommonModule, RouterModule, TipocategoriaContainer],
```

**Depois:**
```typescript
template: `<router-outlet></router-outlet>`,
imports: [CommonModule, RouterModule],
```

### 2. Remoção de Uso Incorreto do Container
**Arquivo:** `src/app/features/configuracoes/tipocategoria/crud/view/tipocategoria-detail.page.ts`

**Problema:** O componente de detalhe estava importando e usando o TipocategoriaContainer diretamente
**Solução:** Removida a importação e uso desnecessário do container

**Antes:**
```typescript
import { TipocategoriaContainer } from 'app/features/configuracoes/tipocategoriaSR/tipocategoria-container.component';

imports: [CommonModule, RouterModule, ReactiveFormsModule, ValidationIndicatorComponent,
  TipocategoriaContainer, FullScreenLoadingComponent, CompactErrorComponent, AuditComponent],
```

**Template antes:**
```html
<div class="row">
  <app-tipocategoria-container></app-tipocategoria-container>
</div>
```

**Depois:**
```typescript
imports: [CommonModule, RouterModule, ReactiveFormsModule, ValidationIndicatorComponent,
  FullScreenLoadingComponent, CompactErrorComponent, AuditComponent],
```

**Template depois:**
```html
<!-- Conteúdo adicional pode ser adicionado aqui se necessário -->
```

### 3. Ajuste do TipocategoriaContainer
**Arquivo:** `src/app/features/configuracoes/tipocategoriaSR/tipocategoria-container.component.ts`

#### Remoção de Providers Duplicados
- Removidos os providers `StateProvider`, `LOCAL_STORAGE_KEY` e `USE_BASE64_ENCODING` do container
- O container agora herda esses providers do componente pai (shell)

#### Correção da Hierarquia de Estado
**Antes:**
```typescript
// Criava seu próprio root
const masterKey = `TipocategoriaContainer#${this.containerKey}`;
this.stateProvider.ensureRoot(masterKey);
```

**Depois:**
```typescript
// Usa a chave do shell como pai
const shellKey = 'ui-TipocategoriaShellComponent';
const componentKey = `TipocategoriaContainer#${this.containerKey}`;
```

#### Correção de Imports
- Corrigidos os imports para usar caminhos relativos corretos:
  - `@pcode/ui/base-list/list-strategy.interface` → `../../../corepcode/ui/base-list/list-strategy.interface`
  - `@pcode/store/state-provider` → `../../../corepcode/store/state-provider`
  - `@pcode/store/state-ref` → `../../../corepcode/store/state-ref`
  - `@stradeo/domain/models/tipocategoria.model` → `../../../corestradeo/domain/models/tipocategoria.model`

### 4. Correção das Rotas para Componentes Específicos
**Arquivo:** `src/app/features/configuracoes/tipocategoria/routes.ts`

**Problema:** O container estava sendo carregado diretamente, pulando os componentes de list e filter
**Solução:** Implementadas rotas específicas para cada componente (list, detail) com lazy loading

**Antes:**
```typescript
export const TIPOCATEGORIA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../tipocategoriaSR/tipocategoria-container.component')
        .then(m => m.TipocategoriaContainer), // Carregava container diretamente
    data: {
      title: 'Tipo de Categoria',
      breadcrumb: 'Tipo de Categoria'
    }
  },
];
```

**Depois:**
```typescript
export const TIPOCATEGORIA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./crud/search/list/tipocategoria-list.page')
        .then(m => m.TipocategoriaListPage), // Carrega list component
    data: {
      title: 'Tipo de Categoria',
      breadcrumb: 'Tipo de Categoria'
    }
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./crud/view/tipocategoria-detail.page')
        .then(m => m.TipocategoriaDetailPage),
    data: {
      title: 'Novo Tipo de Categoria',
      breadcrumb: 'Novo'
    }
  },
  // ... outras rotas para editar e visualizar
];
```

## Estrutura Final

```
ui-TipocategoriaShellComponent (Root State Provider)
└── <router-outlet> (Lazy Loading)
    ├── TipocategoriaListPage (rota: '')
    │   └── TipocategoriaFilterPage (componente filho)
    ├── TipocategoriaDetailPage (rota: 'novo')
    ├── TipocategoriaDetailPage (rota: 'editar/:id')
    └── TipocategoriaDetailPage (rota: 'visualizar/:id')
```

## Benefícios da Correção

1. **Lazy Loading Correto**: Componentes específicos são carregados apenas quando suas rotas são acessadas
2. **Performance Melhorada**: Evita inicialização prematura do container
3. **Ordem de Carregamento Correta**: List e filter components são carregados diretamente, sem container intermediário
4. **Arquitetura Limpa**: Cada componente tem sua responsabilidade específica
5. **Gerenciamento de Estado Adequado**: StateProvider no shell permanece ativo para todos os componentes filhos
6. **Rotas Específicas**: Cada funcionalidade (list, novo, editar, visualizar) tem sua própria rota
7. **Estrutura de Chaves Organizada**: 
   - Shell: `ui-TipocategoriaShellComponent` (sempre ativo)
   - Componentes: Cada um gerencia seu próprio estado como filho do shell
8. **Eliminação do Container Desnecessário**: O container não é mais usado, componentes específicos são carregados diretamente

## Verificação
A aplicação compila com sucesso após as mudanças, confirmando que a estrutura está correta.