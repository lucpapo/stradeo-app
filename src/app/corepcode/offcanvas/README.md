# Serviço de Offcanvas

Este serviço permite abrir qualquer componente dentro de um offcanvas de forma dinâmica, similar ao serviço de toast existente.

## Como Funciona

O serviço é composto por 3 partes principais:

### 1. OffcanvasService
- Gerencia a abertura/fechamento dos offcanvas
- Controla quantos podem estar abertos simultaneamente
- Retorna uma referência (`OffcanvasRef`) para controlar o offcanvas

### 2. OffcanvasContainerComponent
- Renderiza os offcanvas na tela
- Cria dinamicamente os componentes dentro do offcanvas
- Gerencia backdrop, teclado (ESC), etc.

### 3. Modelos (OffcanvasItem, OffcanvasConfig, OffcanvasRef)
- Define as interfaces e tipos usados pelo serviço

## Como Usar

### 1. Primeiro, adicione o container no seu app.component.html:
```html
<app-offcanvas-container></app-offcanvas-container>
```

### 2. Importe o OffcanvasContainerComponent no app.component.ts:
```typescript
import { OffcanvasContainerComponent } from './corepcode/offcanvas/offcanvas-container.component';

@Component({
  imports: [..., OffcanvasContainerComponent],
  // ...
})
```

### 3. Use o serviço em qualquer componente:

```typescript
import { Component, inject } from '@angular/core';
import { OffcanvasService } from '@pcode/offcanvas';
import { MeuComponenteComponent } from './meu-componente.component';

@Component({
  template: `
    <button (click)="abrirOffcanvas()">Abrir Offcanvas</button>
  `
})
export class ExemploComponent {
  private offcanvasService = inject(OffcanvasService);

  abrirOffcanvas() {
    const ref = this.offcanvasService.open(MeuComponenteComponent, {
      title: 'Meu Título',
      position: 'end', // 'start', 'end', 'top', 'bottom'
      size: 'md',      // 'sm', 'md', 'lg', 'xl'
      data: { 
        usuario: 'João',
        configuracao: { tema: 'dark' }
      }
    });

    // Escutar quando fechar
    ref.onClose.then(resultado => {
      console.log('Fechou com:', resultado);
    });

    // Escutar quando cancelar
    ref.onDismiss.then(motivo => {
      console.log('Cancelou por:', motivo);
    });
  }
}
```

## Configurações Disponíveis

```typescript
interface OffcanvasConfig {
  position?: 'start' | 'end' | 'top' | 'bottom';  // Posição do offcanvas
  size?: 'sm' | 'md' | 'lg' | 'xl';               // Tamanho
  backdrop?: boolean | 'static';                   // Backdrop (true, false, 'static')
  keyboard?: boolean;                              // Fechar com ESC
  scroll?: boolean;                                // Permitir scroll no body
  title?: string;                                  // Título no header
  showCloseButton?: boolean;                       // Mostrar botão X
  customClass?: string;                            // Classes CSS customizadas
  data?: any;                                      // Dados para injetar no componente
}
```

## Métodos do Serviço

```typescript
// Abrir offcanvas
open<T>(component: Type<any>, config?: OffcanvasConfig): OffcanvasRef<T>

// Fechar específico
close(id: string): void

// Fechar todos
closeAll(): void

// Fechar o último
closeLast(): void

// Configurar limite máximo
setMaxOffcanvases(n: number): void
```

## Exemplo de Componente para usar no Offcanvas

```typescript
@Component({
  template: `
    <div class="p-3">
      <h4>Meu Componente</h4>
      <p>Dados recebidos: {{ dadosRecebidos | json }}</p>
      
      <button (click)="fecharComResultado()">Salvar</button>
      <button (click)="cancelar()">Cancelar</button>
    </div>
  `
})
export class MeuComponenteComponent {
  @Input() dadosRecebidos: any;
  
  // Para fechar o offcanvas, você precisa ter acesso ao OffcanvasRef
  // Isso pode ser feito injetando o serviço ou passando callbacks via data
  
  fecharComResultado() {
    // Lógica para fechar com resultado
  }
  
  cancelar() {
    // Lógica para cancelar
  }
}
```

## Vantagens

1. **Reutilizável**: Qualquer componente pode ser usado dentro do offcanvas
2. **Flexível**: Múltiplas configurações de posição, tamanho, comportamento
3. **Controlável**: Promises para saber quando fecha/cancela
4. **Limitado**: Controla quantos offcanvas podem estar abertos
5. **Injeção de Dados**: Passa dados diretamente para o componente
6. **Tipado**: Totalmente tipado com TypeScript

## Integração com Bootstrap

O CSS está preparado para funcionar com Bootstrap 5, mas pode ser customizado conforme necessário.