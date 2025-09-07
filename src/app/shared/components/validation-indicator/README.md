# ValidationIndicator Component

Componente para centralizar a validação visual de formulários, removendo mensagens de erro individuais e fornecendo uma experiência mais limpa.

## Funcionalidades

- ✅ Remove mensagens de erro individuais dos campos
- ✅ Adiciona borda vermelha à esquerda do container quando há erros
- ✅ Mostra ícone flutuante com contador de erros
- ✅ Exibe toast com lista de erros ao clicar no ícone
- ✅ Suporte a labels personalizados para os campos

## Como usar

### 1. No template do formulário:

```html
<form [formGroup]="form" 
      [class.has-validation-errors]="form.invalid && form.touched">
  
  <!-- Validation Indicator -->
  <app-validation-indicator 
    [form]="form" 
    [fieldLabels]="fieldLabels">
  </app-validation-indicator>
  
  <!-- Campos do formulário sem mensagens de erro -->
  <input formControlName="nome" 
         class="form-control"
         [class.is-invalid]="form.get('nome')?.invalid && form.get('nome')?.touched">
         
  <!-- Não precisa mais das divs de invalid-feedback -->
</form>
```

### 2. No componente TypeScript:

```typescript
import { ValidationIndicatorComponent } from 'path/to/validation-indicator.component';

@Component({
  imports: [ValidationIndicatorComponent, ...],
  // ...
})
export class MeuFormComponent {
  // Labels dos campos para exibição amigável nos erros
  fieldLabels = {
    nome: 'Nome completo',
    email: 'E-mail',
    telefone: 'Telefone'
  };
  
  // Resto da implementação...
}
```

### 3. Adicionar ToastContainer no app principal:

```html
<!-- No app.component.html ou layout principal -->
<app-toast-container></app-toast-container>
```

## Tipos de erro suportados

- `required` - Campo obrigatório
- `maxlength` - Tamanho máximo excedido
- `minlength` - Tamanho mínimo não atingido
- `email` - Email inválido
- `pattern` - Padrão inválido
- Outros erros personalizados

## Estilos CSS necessários

```scss
.has-validation-errors {
  border-left: 4px solid #dc3545 !important;
  transition: border-left 0.3s ease;
}

.form-control.is-invalid,
.form-select.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
```

## Exemplo completo

Veja o arquivo `tipocategoria-filter-simple.page.ts` e `tipocategoria-filter-simple.page.html` para um exemplo completo de implementação.