# Componentes de Auditoria

Componentes reutilizáveis para exibir informações de auditoria em formulários de detalhes.

## Componentes

### AuditTriggerComponent
Exibe o ícone e informações de última atualização que dispara o canvas de auditoria.

**Uso:**
```html
<app-audit-trigger 
  [lastUpdateDate]="form.get('data_atualizacao')?.value"
  (openAudit)="openAuditOffcanvas()">
</app-audit-trigger>
```

**Inputs:**
- `lastUpdateDate?: string | Date` - Data da última atualização

**Outputs:**
- `openAudit: EventEmitter<void>` - Evento disparado ao clicar no ícone

### AuditCanvasComponent
Canvas lateral que exibe os dados completos de auditoria.

**Uso:**
```html
<app-audit-canvas 
  [isOpen]="auditOffcanvasOpen()"
  [auditData]="auditData"
  (closeCanvas)="closeAuditOffcanvas()">
</app-audit-canvas>
```

**Inputs:**
- `auditData: AuditData | null` - Dados de auditoria
- `isOpen: boolean` - Controla se o canvas está aberto

**Outputs:**
- `closeCanvas: EventEmitter<void>` - Evento para fechar o canvas

## Interface AuditData

```typescript
export interface AuditData {
  dataCadastro?: string | Date;
  usuarioCadastro?: string;
  dataAtualizacao?: string | Date;
  usuarioAtualizacao?: string;
}
```

## Exemplo de Implementação Completa

```typescript
// No componente
import { AuditCanvasComponent, AuditTriggerComponent, AuditData } from '../../../shared/components/audit';

@Component({
  imports: [AuditCanvasComponent, AuditTriggerComponent],
  // ...
})
export class MeuDetailPage {
  public readonly auditOffcanvasOpen = signal(false);

  public openAuditOffcanvas(): void {
    this.auditOffcanvasOpen.set(true);
  }

  public closeAuditOffcanvas(): void {
    this.auditOffcanvasOpen.set(false);
  }

  public get auditData(): AuditData {
    return {
      dataCadastro: this.form.get('data_cadastro')?.value,
      usuarioCadastro: this.form.get('usuario_cadastro')?.value,
      dataAtualizacao: this.form.get('data_atualizacao')?.value,
      usuarioAtualizacao: this.form.get('usuario_atualizacao')?.value
    };
  }
}
```

```html
<!-- No template -->
<app-audit-trigger 
  [lastUpdateDate]="form.get('data_atualizacao')?.value"
  (openAudit)="openAuditOffcanvas()">
</app-audit-trigger>

<app-audit-canvas 
  [isOpen]="auditOffcanvasOpen()"
  [auditData]="auditData"
  (closeCanvas)="closeAuditOffcanvas()">
</app-audit-canvas>
```