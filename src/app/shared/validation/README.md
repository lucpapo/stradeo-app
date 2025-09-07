# Sistema de Validação Elegante

Este sistema de validação foi criado para proporcionar uma experiência mais limpa e user-friendly, evitando que mensagens de erro movam os campos na tela.

## Características

- ✅ Borda vermelha à esquerda em campos inválidos
- ✅ Indicador visual fixo de erros de validação
- ✅ Toast com mensagens amigáveis ao clicar no indicador
- ✅ Configuração centralizada de mensagens
- ✅ Sem movimento de campos na tela

## Como usar

### 1. Configurar as validações no componente

```typescript
export class MeuFilterPage extends BaseFiltroDirective<MeuFilterValue> {
  
  // Configuração de validação com mensagens amigáveis
  validationConfig: ValidationConfig = {
    campo1: [
      { field: 'campo1', validatorType: 'required', message: 'Este campo é obrigatório.' },
      { field: 'campo1', validatorType: 'maxlength', message: 'Máximo 50 caracteres.' }
    ],
    campo2: [
      { field: 'campo2', validatorType: 'email', message: 'Email inválido.' }
    ]
  };

  // Labels dos campos para exibição nas mensagens
  fieldLabels = {
    campo1: 'Nome',
    campo2: 'Email'
  };

  constructor(public validationService: ValidationService) {
    super();
  }
}
```

### 2. Atualizar o HTML

```html
<form [formGroup]="gerenciador.form" (ngSubmit)="onApply()">
  
  <!-- Indicador de validação -->
  <app-validation-indicator 
    [form]="gerenciador.form"
    [validationConfig]="validationConfig"
    [fieldLabels]="fieldLabels">
  </app-validation-indicator>

  <!-- Campo com classe de erro dinâmica -->
  <input 
    formControlName="campo1"
    [class]="'form-control ' + validationService.getFieldErrorClass(gerenciador.form, 'campo1')"
    placeholder="Digite o nome...">

</form>
```

### 3. Importar os estilos

```typescript
@Component({
  // ...
  styleUrls: ['./meu-componente.scss', '../../../shared/styles/validation.scss'],
})
```

### 4. Importar os componentes necessários

```typescript
@Component({
  // ...
  imports: [CommonModule, ReactiveFormsModule, ValidationIndicatorComponent],
})
```

## Estrutura dos arquivos

- `validation-config.interface.ts` - Interfaces para configuração
- `validation.service.ts` - Serviço principal de validação
- `validation-indicator.component.ts` - Componente indicador visual
- `validation.scss` - Estilos para campos com erro
- `README.md` - Esta documentação

## Customização

### Estilos de erro
Você pode customizar a aparência dos campos com erro editando `validation.scss`:

```scss
.field-error {
  border-left: 4px solid #dc3545 !important;
  background-color: rgba(220, 53, 69, 0.05) !important;
}
```

### Posição do indicador
O indicador aparece fixo no canto superior direito. Para alterar, edite o CSS em `validation-indicator.component.ts`.

### Mensagens de toast
As mensagens usam o ToastService existente do projeto com tipo 'danger' e duração de 8 segundos.