import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-example-offcanvas-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="example-content">
      <div class="alert alert-success mb-3">
        <h5 class="alert-heading">✅ Transparência Corrigida!</h5>
        <p class="mb-0">Este offcanvas agora tem fundo branco sólido, não mais transparente.</p>
      </div>
      
      <h4>📋 Conteúdo Dinâmico</h4>
      
      <div class="card mb-3">
        <div class="card-body">
          <div class="mb-2" *ngIf="idOrigem">
            <strong>🆔 ID Origem:</strong> 
            <span class="badge bg-primary ms-2">{{ idOrigem }}</span>
          </div>
          
          <div class="mb-2" *ngIf="contextState">
            <strong>🔄 Context State:</strong> 
            <span class="badge bg-info ms-2">{{ contextState }}</span>
          </div>
          
          <div class="mb-2">
            <strong>⏰ Timestamp:</strong> 
            <span class="text-muted">{{ currentTime }}</span>
          </div>
        </div>
      </div>
      
      <div class="bg-light p-3 rounded mb-3">
        <h6>🎨 Teste Visual</h6>
        <p class="mb-2">Esta área tem fundo cinza claro para demonstrar que não há transparência.</p>
        <div class="bg-white p-2 border rounded">
          <small>E esta área tem fundo branco com borda para contraste.</small>
        </div>
      </div>
      
      <div class="row mb-3">
        <div class="col-12">
          <h6>🔗 Offcanvas Aninhados</h6>
          <div class="d-flex gap-2 flex-wrap mb-2">
            <button class="btn btn-primary btn-sm" (click)="openNestedRight()">
              ➡️ Direita
            </button>
            <button class="btn btn-info btn-sm" (click)="openNestedLeft()">
              ⬅️ Esquerda
            </button>
            <button class="btn btn-warning btn-sm" (click)="openNestedOpposite()">
              🔄 Lado Oposto
            </button>
          </div>
        </div>
      </div>
      
      <div class="row mb-3">
        <div class="col-12">
          <h6>📏 Diferentes Tamanhos</h6>
          <div class="d-flex gap-2 flex-wrap mb-2">
            <button class="btn btn-success btn-sm" (click)="openSmall()">
              📱 Pequeno (50%)
            </button>
            <button class="btn btn-success btn-sm" (click)="openMedium()">
              💻 Médio (70%)
            </button>
            <button class="btn btn-success btn-sm" (click)="openLarge()">
              🖥️ Grande (90%)
            </button>
          </div>
        </div>
      </div>
      
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-secondary" (click)="closeOffcanvas()">
          ❌ Fechar Este
        </button>
        <button class="btn btn-danger" (click)="closeAll()">
          🗑️ Fechar Todos
        </button>
        <button class="btn btn-outline-info" (click)="showStackInfo()">
          📊 Info da Pilha
        </button>
      </div>
    </div>
  `,
  styles: [`
    .example-content {
      padding: 1rem 0;
      background-color: white !important;
      color: #212529 !important;
    }
    
    .card {
      background-color: white !important;
      border: 1px solid #dee2e6;
      color: #212529 !important;
    }
    
    .card-body {
      color: #212529 !important;
    }
    
    .alert {
      background-color: #d1edff !important;
      border-color: #bee5eb !important;
      color: #0c5460 !important;
    }
    
    .alert-heading {
      color: #0c5460 !important;
    }
    
    .bg-light {
      background-color: #f8f9fa !important;
      color: #495057 !important;
    }
    
    .bg-white {
      background-color: white !important;
      color: #212529 !important;
    }
    
    h4, h5, h6 {
      color: #212529 !important;
    }
    
    p {
      color: #212529 !important;
    }
    
    small {
      color: #6c757d !important;
    }
    
    .text-muted {
      color: #6c757d !important;
    }
    
    .d-flex {
      display: flex;
    }
    
    .gap-2 {
      gap: 0.5rem;
    }
    
    .flex-wrap {
      flex-wrap: wrap;
    }
    
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    
    .mb-3 {
      margin-bottom: 1rem;
    }
    
    .ms-2 {
      margin-left: 0.5rem;
    }
    
    .badge {
      font-size: 0.75em;
    }
    
    /* Garantir que todos os textos sejam visíveis */
    * {
      color: inherit;
    }
    
    /* Forçar visibilidade de elementos específicos */
    .bg-light p,
    .bg-light small,
    .bg-white p,
    .bg-white small {
      color: inherit !important;
    }
  `]
})
export class ExampleOffcanvasContentComponent {
  @Input() idOrigem?: string;
  @Input() contextState?: string;
  
  currentTime = new Date().toLocaleString();
  
  private offcanvasRef?: NgbOffcanvasRef;
  private offcanvasService?: OffcanvasService;

  // Método chamado pelo container quando o componente é inicializado
  onOffcanvasInit(offcanvasRef: NgbOffcanvasRef, offcanvasService: OffcanvasService) {
    this.offcanvasRef = offcanvasRef;
    this.offcanvasService = offcanvasService;
  }

  openNestedRight() {
    if (this.offcanvasService) {
      this.offcanvasService.openAtPosition(
        ExampleOffcanvasContentComponent,
        'end',
        {
          idOrigem: 'nested-right-' + Date.now(),
          contextState: (this.contextState || 'root') + '-right'
        },
        'offcanvas-class-70'
      );
    }
  }

  openNestedLeft() {
    if (this.offcanvasService) {
      this.offcanvasService.openAtPosition(
        ExampleOffcanvasContentComponent,
        'start',
        {
          idOrigem: 'nested-left-' + Date.now(),
          contextState: (this.contextState || 'root') + '-left'
        },
        'offcanvas-class-70'
      );
    }
  }

  openNestedOpposite() {
    if (this.offcanvasService) {
      this.offcanvasService.openOpposite(
        ExampleOffcanvasContentComponent,
        {
          idOrigem: 'nested-opposite-' + Date.now(),
          contextState: (this.contextState || 'root') + '-opposite'
        },
        'offcanvas-class-70'
      );
    }
  }

  openSmall() {
    if (this.offcanvasService) {
      this.offcanvasService.open(
        ExampleOffcanvasContentComponent,
        {
          idOrigem: 'small-' + Date.now(),
          contextState: 'small-size'
        },
        undefined,
        { panelClass: 'offcanvas-class-50' }
      );
    }
  }

  openMedium() {
    if (this.offcanvasService) {
      this.offcanvasService.open(
        ExampleOffcanvasContentComponent,
        {
          idOrigem: 'medium-' + Date.now(),
          contextState: 'medium-size'
        },
        undefined,
        { panelClass: 'offcanvas-class-70' }
      );
    }
  }

  openLarge() {
    if (this.offcanvasService) {
      this.offcanvasService.open(
        ExampleOffcanvasContentComponent,
        {
          idOrigem: 'large-' + Date.now(),
          contextState: 'large-size'
        },
        undefined,
        { panelClass: 'offcanvas-class-90' }
      );
    }
  }

  closeOffcanvas() {
    if (this.offcanvasRef) {
      this.offcanvasRef.close();
    }
  }

  closeAll() {
    if (this.offcanvasService) {
      this.offcanvasService.closeAll();
    }
  }

  showStackInfo() {
    if (this.offcanvasService) {
      const stackInfo = this.offcanvasService.getStackInfo();
      const stackSize = this.offcanvasService.getStackSize();
      alert(`Pilha de Offcanvas:\nTotal: ${stackSize}\n\nDetalhes:\n${stackInfo.map(info => `Nível ${info.level}: ${info.position}`).join('\n')}`);
    }
  }
}