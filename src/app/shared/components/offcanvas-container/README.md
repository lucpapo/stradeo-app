# Sistema de Offcanvas Dinâmico

Este sistema permite criar offcanvas dinâmicos que podem carregar qualquer componente Angular, seguindo o padrão implementado no projeto original.

## Arquivos

- `offcanvas.service.ts` - Serviço principal para gerenciar offcanvas
- `offcanvas-container.component.ts` - Componente container que carrega dinamicamente outros componentes
- `example-offcanvas-content.component.ts` - Exemplo de componente que pode ser carregado no offcanvas
- `offcanvas-example.service.ts` - Serviço de exemplo mostrando como usar o sistema

## Como Usar

### 1. Injetar o serviço no seu componente

```typescript
import { inject } from '@angular/core';
import { OffcanvasService } from './shared/services/offcanvas.service';

export class MeuComponent {
  private offcanvasService = inject(OffcanvasService);
  private injector = inject(Injector);

  // Seu código aqui
}
```

### 2. Abrir um offcanvas

```typescript
openOffcanvas(ativo_id: string) {
  // Inicializar contexto se necessário
  // this.stateProvider.initializeContext(ativo_id);
  
  this.offcanvasService.open(
    MeuComponenteContent, // Componente que será carregado
    {
      title: 'Título do Offcanvas',
      idOrigem: ativo_id,
      contextState: ativo_id, // ou contextState + '-child'
      // outros dados que o componente precisa
    },
    this.injector,
    'offcanvas-class-90' // Largura (90% da tela)
  );
}
```

### 3. Criar um componente para ser usado no offcanvas

```typescript
import { Component, Input } from '@angular/core';
import { NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-meu-componente-content',
  standalone: true,
  template: `
    <div>
      <h4>{{ title }}</h4>
      <p>ID: {{ idOrigem }}</p>
      <p>Context: {{ contextState }}</p>
      <!-- Seu conteúdo aqui -->
    </div>
  `
})
export class MeuComponenteContentComponent {
  @Input() title?: string;
  @Input() idOrigem?: string;
  @Input() contextState?: string;
  
  private offcanvasRef?: NgbOffcanvasRef;
  private offcanvasService?: OffcanvasService;

  // Método chamado automaticamente pelo container
  onOffcanvasInit(offcanvasRef: NgbOffcanvasRef, offcanvasService: OffcanvasService) {
    this.offcanvasRef = offcanvasRef;
    this.offcanvasService = offcanvasService;
  }

  fecharOffcanvas() {
    this.offcanvasRef?.close();
  }
}
```

## Configurações Disponíveis

### Larguras (panelClass)
- `offcanvas-class-50` - 50% da largura
- `offcanvas-class-60` - 60% da largura
- `offcanvas-class-70` - 70% da largura
- `offcanvas-class-80` - 80% da largura
- `offcanvas-class-85` - 85% da largura (padrão)
- `offcanvas-class-90` - 90% da largura
- `offcanvas-class-95` - 95% da largura
- `offcanvas-class-full` - 100% da largura

### Posições
- `start` - Esquerda
- `end` - Direita (padrão)
- `top` - Topo
- `bottom` - Rodapé

### Outras opções
- `backdrop: boolean` - Mostrar/ocultar backdrop (padrão: true)
- `closePrevious: boolean` - Fechar offcanvas anterior ao abrir novo (padrão: false)

## Funcionalidades

### Pilha de Offcanvas
O sistema mantém uma pilha de offcanvas abertos, permitindo:
- Abrir múltiplos offcanvas
- Navegar entre eles
- Fechar o atual e voltar ao anterior

### Injeção de Dependências
O injector é passado para o componente raiz, permitindo que componentes filhos tenham acesso a todos os serviços necessários.

### Dados Dinâmicos
Qualquer dado pode ser passado para o componente através do parâmetro `data`, incluindo:
- `idOrigem` - ID do item sendo visualizado
- `contextState` - Estado do contexto
- `title` - Título personalizado
- Qualquer outro dado necessário

## Exemplo Completo

```typescript
// No seu componente
export class ListaAtivosComponent {
  private offcanvasService = inject(OffcanvasService);
  private injector = inject(Injector);

  visualizarAtivo(ativo_id: string) {
    // Inicializar contexto
    this.stateProvider.initializeContext(ativo_id);
    
    // Abrir offcanvas
    this.offcanvasService.open(
      ViewAtivoComponent,
      {
        title: 'Visualizar Ativo',
        idOrigem: ativo_id,
        contextState: ativo_id,
        // dados adicionais
        readonly: true,
        showActions: false
      },
      this.injector,
      'offcanvas-class-90'
    );
  }
}
```

## Pontos Importantes

1. **Injector**: O injector injeta no componente raiz, garantindo acesso a todos os serviços
2. **Nome**: Sempre dar um título/nome ao que está sendo aberto
3. **ContextState**: Definir qual o contextState (child) do contextState pai
4. **IdOrigem**: Valor usado para alimentar o componente com dados específicos
5. **Standalone**: Todos os componentes devem ser standalone para funcionar corretamente