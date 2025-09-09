# Base Detail Architecture

Arquitetura baseada no padrão Strategy para páginas de detalhes (CRUD), similar ao que existe para filtros e listas.

## Estrutura

### Classes Base
- **BaseDetailPage** - Classe abstrata para componentes de detalhes
- **DetailStrategy** - Interface para estratégias de detalhes
- **AbstractDetailStrategy** - Implementação base das estratégias

### Funcionalidades Principais

- **Gerenciamento de Estado** - Persistência automática via StateProvider
- **Modos Automáticos** - Detecção de create/view/edit baseado na URL
- **Formulários Reativos** - Criação e validação automática
- **Navegação** - Métodos padronizados para navegação
- **Carregamento de Dados** - Loading states e tratamento de erros
- **Salvamento** - Lógica de create/update com feedback

## Como Usar

### 1. Criar a Estratégia

```typescript
// tipocategoria-detail.strategy.ts
export class TipocategoriaDetailStrategy extends AbstractDetailStrategy<TipoCategoria, number> {

  constructor(
    readonly service: TipoCategoriaService,
    readonly router: Router,
    readonly datePipe: DatePipe
  ) {
    super();
  }

  createFormControls(entity?: TipoCategoria): { [key: string]: any } {
    return {
      id: [{ value: entity?.id || null, disabled: true }],
      descricao: [entity?.descricao || '', [Validators.required, Validators.maxLength(100)]],
      status_delecao: [entity?.status_delecao ?? 0, Validators.required],
      // ... outros campos
    };
  }

  getStateKeys() {
    return {
      shellKey: 'ui-TipocategoriaShellComponent',
      detailKey: 'TipocategoriaDetailPage#main'
    };
  }

  getBaseRoute(): string {
    return '/configuracoes/tipocategoria';
  }

  // Métodos opcionais para customização
  override processLoadedData(data: TipoCategoria): TipoCategoria {
    // Formatar datas, transformar dados, etc.
  }

  override preparePayload(payload: any): Partial<TipoCategoria> {
    // Limpar campos de auditoria, transformar dados, etc.
  }
}
```

### 2. Criar o Componente

```typescript
// tipocategoria-detail.page.ts
@Component({
  standalone: true,
  selector: 'app-tipocategoria-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './tipocategoria-detail.page.html',
  providers: [DatePipe]
})
export class TipocategoriaDetailPage extends BaseDetailPage<TipoCategoria, number> {
  
  private readonly service = inject(TipoCategoriaService);
  private readonly datePipe = inject(DatePipe);

  // Funcionalidades específicas desta página
  public readonly auditOpen = signal(false);

  private strategy = new TipocategoriaDetailStrategy(
    this.service,
    this.router,
    this.datePipe
  );

  protected getStrategy(): DetailStrategy<TipoCategoria, number> {
    return this.strategy;
  }

  // Métodos específicos da página
  public openAuditOffcanvas(): void {
    this.auditOpen.set(true);
  }
}
```

### 3. Template HTML

```html
<!-- tipocategoria-detail.page.html -->
<div *ngIf="loading()" class="alert alert-info">Carregando...</div>
<div *ngIf="error()" class="alert alert-danger">{{ error() }}</div>

<div class="card" *ngIf="!loading()">
  <form [formGroup]="form" (ngSubmit)="save()">
    
    <!-- Campos do formulário -->
    <div class="form-group">
      <label for="descricao">Descrição</label>
      <input id="descricao" formControlName="descricao" class="form-control">
    </div>

    <!-- Botões de ação -->
    <div class="d-flex gap-2">
      <button type="button" (click)="goBack()">Cancelar</button>
      <button type="submit" [disabled]="form.invalid || loading()">
        Salvar e fechar
      </button>
      <button type="button" (click)="saveAndContinue()" [disabled]="form.invalid || loading()">
        Salvar
      </button>
    </div>

  </form>
</div>
```

## Propriedades Disponíveis no Template

### Sinais de Estado
- `loading()` - Indica se está carregando
- `error()` - Mensagem de erro (se houver)
- `id()` - ID da entidade atual
- `mode()` - Modo atual ('create' | 'view' | 'edit')
- `entity()` - Entidade carregada

### Sinais Computados
- `isViewMode()` - Se está em modo de visualização
- `isCreateMode()` - Se está em modo de criação
- `isEditMode()` - Se está em modo de edição

### Formulário
- `form` - FormGroup reativo

### Métodos de Ação
- `save()` - Salva e volta para lista
- `saveAndContinue()` - Salva e continua editando
- `goBack()` - Volta para lista
- `switchToEditMode()` - Muda para modo de edição

## Customizações Disponíveis

### Na Estratégia

```typescript
// Validação customizada
override validateForm(form: FormGroup): boolean {
  // Lógica de validação específica
  return form.valid && minhaValidacaoCustomizada(form);
}

// Processamento pós-carregamento
override processLoadedData(data: TEntity): TEntity {
  // Formatar datas, calcular campos derivados, etc.
  return transformedData;
}

// Preparação do payload
override preparePayload(payload: any): Partial<TEntity> {
  // Remover campos, transformar dados, etc.
  return cleanPayload;
}

// Ações pós-salvamento
override afterSave(savedEntity: TEntity, mode: 'create' | 'edit'): void {
  // Invalidar cache, enviar eventos, etc.
}

// Detecção de modo customizada
override determineModeFromUrl(urlSegments: any[], idParam: string | null): 'create' | 'view' | 'edit' {
  // Lógica customizada para determinar o modo
}
```

## Vantagens da Arquitetura

1. **Reutilização** - Lógica comum centralizada na classe base
2. **Consistência** - Padrões uniformes entre diferentes entidades
3. **Flexibilidade** - Strategies permitem customização específica
4. **Manutenibilidade** - Separação clara de responsabilidades
5. **Estado Persistente** - Dados mantidos entre navegações
6. **Testabilidade** - Strategies podem ser testadas independentemente

## Comparação com Abordagem Anterior

### Antes (Código Duplicado)
```typescript
// Cada página implementava tudo do zero
export class TipocategoriaDetailPage implements OnInit {
  // 200+ linhas de código repetitivo
  // Lógica de carregamento manual
  // Tratamento de erros manual
  // Navegação manual
  // etc.
}
```

### Agora (Strategy Pattern)
```typescript
// Página focada apenas no específico
export class TipocategoriaDetailPage extends BaseDetailPage<TipoCategoria, number> {
  // ~50 linhas focadas no específico
  // Lógica comum herdada da base
  // Customizações via strategy
}
```

A nova arquitetura reduz significativamente a duplicação de código e facilita a manutenção e evolução do sistema.