# Base Filter Architecture

## 📋 Visão Geral

Esta arquitetura implementa o padrão **Strategy + Herança** para eliminar duplicação de código entre componentes de filtro, separando claramente:

- **UI comum** (BaseFilterPage) - Herança
- **Lógica de negócio específica** (FilterStrategy) - Strategy Pattern

## 🏗️ Estrutura

```
/shared/components/base-filter/
├── base-filter.component.ts     # Classe base abstrata
├── filter-strategy.interface.ts # Interface da strategy
├── index.ts                     # Exports
└── README.md                    # Esta documentação

/features/[entidade]/filter/
├── [entidade]-filter.strategy.ts  # Strategy específica
├── [entidade]-filter.page.ts      # Componente (herda da base)
├── [entidade]-filter.page.html    # Template específico
└── [entidade]-filter.page.scss    # Estilos específicos
```

## 🎯 Como Usar

### 1. Criar a Strategy

```typescript
export class MinhaEntidadeFilterStrategy implements FilterStrategy<MinhaEntidadeFilterValue> {
  
  createFormControls(savedData?: MinhaEntidadeFilterValue) {
    const data = savedData || INITIAL_VALUE;
    return {
      campo1: [data.campo1, [Validators.required]],
      campo2: [data.campo2]
    };
  }

  getFieldLabels() {
    return {
      campo1: 'Campo 1',
      campo2: 'Campo 2'
    };
  }

  getInitialValue() {
    return INITIAL_VALUE;
  }

  isInitialValue(value: MinhaEntidadeFilterValue) {
    return value.campo1 === INITIAL_VALUE.campo1;
  }

  hasValidSearchData(formValue: any) {
    return formValue.campo1?.trim() !== '';
  }
}
```

### 2. Criar o Componente

```typescript
@Component({
  selector: 'app-minha-entidade-filter',
  templateUrl: './minha-entidade-filter.page.html',
  styleUrls: ['./minha-entidade-filter.page.scss']
})
export class MinhaEntidadeFilterPage extends BaseFilterPage<MinhaEntidadeFilterValue> {

  private strategy = new MinhaEntidadeFilterStrategy();

  protected initializeStateRef(): void {
    this.filterStateRef = new StateRef<MinhaEntidadeFilterValue>(
      this.stateProvider,
      'ui-MinhaEntidadeShellComponent',
      'MinhaEntidadeFilterPage#main'
    );
  }

  protected getStrategy(): FilterStrategy<MinhaEntidadeFilterValue> {
    return this.strategy;
  }
}
```

### 3. Template HTML

Use o **getter genérico** `getControl()` ao invés de getters específicos:

```html
<!-- ❌ Forma antiga -->
<input formControlName="descricao" 
       [style.border-left]="descricaoControl?.invalid ? '3px solid #dc3545' : ''">

<!-- ✅ Forma nova -->
<input formControlName="descricao" 
       [style.border-left]="getControl('descricao')?.invalid ? '3px solid #dc3545' : ''">
```

## 🔄 Migração do Código Existente

### Antes (tipocategoria-filter.page.ts - 150+ linhas)
```typescript
export class TipocategoriaFilterPage implements OnInit, OnChanges {
  // 150+ linhas de código duplicado
  private createForm() { /* lógica específica */ }
  private loadSavedFilters() { /* lógica específica */ }
  onApply() { /* lógica específica */ }
  onClear() { /* lógica específica */ }
  get descricaoControl() { /* getter específico */ }
  get statusControl() { /* getter específico */ }
}
```

### Depois (tipocategoria-filter.page.ts - 30 linhas)
```typescript
export class TipocategoriaFilterPage extends BaseFilterPage<TipocategoriaFilterValue> {
  private strategy = new TipocategoriaFilterStrategy();
  
  protected initializeStateRef() { /* 3 linhas */ }
  protected getStrategy() { /* 1 linha */ }
  
  // Getters de compatibilidade (remover após migrar template)
  get descricaoControl() { return this.getControl('descricao'); }
  get statusControl() { return this.getControl('status_delecao'); }
}
```

## ✅ Vantagens

1. **Redução de código**: 150+ linhas → 30 linhas
2. **Getter genérico**: `getControl('campo')` elimina getters específicos
3. **Separação de responsabilidades**: UI na base, negócio na strategy
4. **Reutilização**: Base serve para todos os CRUDs
5. **Testabilidade**: Strategy isolada é mais fácil de testar
6. **Manutenibilidade**: Mudanças de UI em um lugar só

## 🚀 Próximos Passos

1. ✅ Implementar base + strategy para tipocategoria
2. 🔄 Migrar template para usar `getControl()`
3. 📋 Aplicar padrão para outros filtros
4. 🧹 Remover getters específicos após migração completa

## 📝 Métodos Herdados da Base

- `onApply()` - Aplica o filtro
- `onClear()` - Limpa o filtro  
- `getControl(name)` - Acessa controle do form
- `hasValidSearchData` - Verifica se há dados válidos
- `form` - FormGroup
- `fieldLabels` - Labels para ValidationIndicator