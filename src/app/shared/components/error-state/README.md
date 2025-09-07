# ErrorStateComponent

Componente reutilizável para exibir estados de erro com melhor usabilidade.

## Uso

```html
<app-error-state
  [message]="errorMessage"
  [showRetryButton]="true"
  [onRetryCallback]="retryFunction">
</app-error-state>
```

## Propriedades de Entrada (@Input)

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `iconClass` | `string` | `'fa fa-exclamation-triangle text-danger'` | Classe CSS do ícone |
| `title` | `string` | `'Ops! Algo deu errado'` | Título do erro |
| `message` | `string` | `''` | Mensagem de erro específica |
| `hint` | `string` | `'Tente novamente em alguns instantes...'` | Dica para o usuário |
| `showRetryButton` | `boolean` | `false` | Se deve mostrar o botão "Tentar novamente" |
| `retryButtonText` | `string` | `'Tentar novamente'` | Texto do botão de retry |
| `onRetryCallback` | `() => void` | `undefined` | Função callback para o botão de retry |

## Exemplos de Uso

### Erro Simples
```html
<app-error-state 
  *ngIf="error" 
  [message]="error">
</app-error-state>
```

### Erro com Botão de Retry
```html
<app-error-state 
  *ngIf="error" 
  [message]="error"
  [showRetryButton]="true"
  [onRetryCallback]="retryLoadData">
</app-error-state>
```

### Erro Customizado
```html
<app-error-state 
  *ngIf="error"
  iconClass="fa fa-wifi text-warning"
  title="Problema de Conexão"
  [message]="error"
  hint="Verifique sua conexão com a internet"
  [showRetryButton]="true"
  retryButtonText="Reconectar"
  [onRetryCallback]="reconnect">
</app-error-state>
```

## Exemplo Completo no TypeScript

```typescript
export class ExampleComponent {
  error: string | null = null;
  loading = false;

  loadData(): void {
    this.loading = true;
    this.error = null;
    
    this.service.getData().subscribe({
      next: (data) => {
        // Processar dados
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar dados: ' + error.message;
        this.loading = false;
      }
    });
  }

  // Método para retry (arrow function para manter o contexto)
  retryLoadData = (): void => {
    console.log('Tentando carregar dados novamente...');
    this.loadData();
  }
}
```

## Importação

```typescript
import { ErrorStateComponent } from '@pcodeshared/components/error-state/error-state.component';

@Component({
  // ...
  imports: [ErrorStateComponent],
  // ...
})
```

## Características

- **Visual consistente** com cores e estilos padronizados
- **Flexível** - permite customização de ícone, título, mensagem e dica
- **Botão de retry opcional** com callback customizável
- **Responsivo** e acessível
- **Quebra de linha automática** para mensagens longas
- **Estilo suave** com background e bordas sutis