# Exemplos de Uso do ErrorStateComponent

## 1. Erro de Carregamento de Dados (Mais Comum)

```html
<!-- No template -->
<app-error-state 
  *ngIf="error" 
  [message]="error"
  [showRetryButton]="true"
  [onRetryCallback]="retryLoadData">
</app-error-state>
```

```typescript
// No componente
export class ListComponent {
  error: string | null = null;
  
  loadData(): void {
    this.error = null;
    this.service.getData().subscribe({
      error: (error) => {
        this.error = 'Erro ao carregar dados: ' + error.message;
      }
    });
  }

  retryLoadData = (): void => {
    this.loadData();
  }
}
```

## 2. Erro de Conexão

```html
<app-error-state 
  *ngIf="connectionError"
  iconClass="fa fa-wifi text-warning"
  title="Problema de Conexão"
  message="Não foi possível conectar ao servidor"
  hint="Verifique sua conexão com a internet e tente novamente"
  [showRetryButton]="true"
  retryButtonText="Reconectar"
  [onRetryCallback]="checkConnection">
</app-error-state>
```

## 3. Erro de Validação/Formulário

```html
<app-error-state 
  *ngIf="validationError"
  iconClass="fa fa-exclamation-circle text-warning"
  title="Dados Inválidos"
  [message]="validationError"
  hint="Corrija os campos destacados e tente novamente"
  [showRetryButton]="false">
</app-error-state>
```

## 4. Erro de Permissão

```html
<app-error-state 
  *ngIf="permissionError"
  iconClass="fa fa-lock text-secondary"
  title="Acesso Negado"
  message="Você não tem permissão para acessar este recurso"
  hint="Entre em contato com o administrador do sistema"
  [showRetryButton]="false">
</app-error-state>
```

## 5. Erro de Timeout

```html
<app-error-state 
  *ngIf="timeoutError"
  iconClass="fa fa-clock-o text-info"
  title="Tempo Esgotado"
  message="A operação demorou mais que o esperado"
  hint="O servidor pode estar sobrecarregado. Tente novamente em alguns minutos"
  [showRetryButton]="true"
  retryButtonText="Tentar Novamente"
  [onRetryCallback]="retryOperation">
</app-error-state>
```

## 6. Erro Genérico do Sistema

```html
<app-error-state 
  *ngIf="systemError"
  iconClass="fa fa-cogs text-danger"
  title="Erro do Sistema"
  message="Ocorreu um erro interno no sistema"
  hint="Nossa equipe foi notificada. Tente novamente mais tarde"
  [showRetryButton]="true"
  [onRetryCallback]="retryAction">
</app-error-state>
```

## 7. Uso em Tabelas (Recomendado - Integrado com Empty State)

```html
<!-- Dentro de uma tabela -->
<tbody>
  <!-- Dados da tabela -->
  <tr *ngFor="let item of data">
    <!-- colunas dos dados -->
  </tr>

  <!-- Estado de erro - Erro ao carregar dados -->
  <tr *ngIf="!loading && error">
    <td colspan="100%" class="p-0">
      <app-error-state 
        [message]="error"
        [showRetryButton]="true"
        [onRetryCallback]="retryLoadData">
      </app-error-state>
    </td>
  </tr>

  <!-- Estado vazio - Nenhum dado encontrado -->
  <tr *ngIf="!loading && !error && !data.length">
    <td colspan="100%" class="p-0">
      <app-empty-state></app-empty-state>
    </td>
  </tr>
</tbody>
```

### Lógica dos Estados na Tabela:
1. **Loading**: Mostra loading (fora da tabela)
2. **Error**: Mostra error-state (dentro da tabela)
3. **Empty**: Mostra empty-state (dentro da tabela)
4. **Data**: Mostra os dados normalmente

## 8. Erro em Modal/Dialog

```html
<div class="modal-body">
  <app-error-state 
    *ngIf="modalError"
    [message]="modalError"
    hint="Feche este modal e tente novamente"
    [showRetryButton]="false">
  </app-error-state>
</div>
```

## 9. Múltiplos Tipos de Erro

```typescript
export class ComponentWithMultipleErrors {
  errorType: 'connection' | 'permission' | 'validation' | null = null;
  errorMessage = '';

  get isConnectionError() { return this.errorType === 'connection'; }
  get isPermissionError() { return this.errorType === 'permission'; }
  get isValidationError() { return this.errorType === 'validation'; }
}
```

```html
<!-- Erro de conexão -->
<app-error-state 
  *ngIf="isConnectionError"
  iconClass="fa fa-wifi text-warning"
  title="Problema de Conexão"
  [message]="errorMessage"
  [showRetryButton]="true"
  [onRetryCallback]="retryConnection">
</app-error-state>

<!-- Erro de permissão -->
<app-error-state 
  *ngIf="isPermissionError"
  iconClass="fa fa-lock text-secondary"
  title="Acesso Negado"
  [message]="errorMessage"
  [showRetryButton]="false">
</app-error-state>

<!-- Erro de validação -->
<app-error-state 
  *ngIf="isValidationError"
  iconClass="fa fa-exclamation-circle text-warning"
  title="Dados Inválidos"
  [message]="errorMessage"
  [showRetryButton]="false">
</app-error-state>
```

## 10. Integração Completa com Loading, Error e Empty States (Padrão Recomendado)

```html
<div class="container-fluid">
  <!-- Filtros -->
  <div class="row mb-3">
    <div class="col-12">
      <app-filter-component></app-filter-component>
    </div>
  </div>

  <!-- Loading de tela cheia -->
  <app-full-screen-loading [show]="loading" message="Carregando dados...">
  </app-full-screen-loading>

  <!-- Tabela de dados -->
  <div class="card shadow-sm">
    <div class="table-responsive">
      <table class="table table-hover table-sm align-middle mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <!-- Dados da tabela -->
          <tr *ngFor="let item of data">
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.status }}</td>
            <td>
              <!-- botões de ação -->
            </td>
          </tr>

          <!-- Estado de erro -->
          <tr *ngIf="!loading && error">
            <td colspan="100%" class="p-0">
              <app-error-state 
                [message]="error"
                [showRetryButton]="true"
                [onRetryCallback]="retryLoadData">
              </app-error-state>
            </td>
          </tr>

          <!-- Estado vazio -->
          <tr *ngIf="!loading && !error && !data.length">
            <td colspan="100%" class="p-0">
              <app-empty-state></app-empty-state>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginação -->
    <app-pagination-footer 
      [currentPage]="currentPage"
      [pageSize]="pageSize"
      [total]="total"
      [showingRange]="showingRange"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)">
    </app-pagination-footer>
  </div>
</div>
```

```typescript
export class ListComponent {
  loading = false;
  error: string | null = null;
  data: any[] = [];
  currentPage = 1;
  pageSize = 10;
  total = 0;

  loadData(): void {
    this.loading = true;
    this.error = null;
    
    this.service.getData().subscribe({
      next: (response) => {
        this.data = response.data;
        this.total = response.total;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar dados: ' + error.message;
        this.loading = false;
        this.data = [];
      }
    });
  }

  retryLoadData = (): void => {
    this.loadData();
  }

  get showingRange(): string {
    if (this.total === 0) return 'Nenhum registro encontrado';
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.total);
    return `Mostrando ${start} a ${end} de ${this.total} registros`;
  }
}
```