import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-table-offcanvas-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-content">
      <div class="mb-3" *ngIf="title">
        <h5 class="text-primary">{{ title }}</h5>
      </div>
      
      <div [innerHTML]="content" class="content-area"></div>
      
      <div class="mt-4 pt-3 border-top">
        <div class="mb-2" *ngIf="offcanvasType">
          <small class="text-muted">
            <strong>Tipo:</strong> {{ offcanvasType === 'logs' ? '🛡️ Logs de Segurança' : '📋 Dados do Item' }}
          </small>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-secondary btn-sm" (click)="closeOffcanvas()">
            ❌ Fechar
          </button>
          <button class="btn btn-outline-info btn-sm" (click)="showStackInfo()">
            📊 Pilha: {{ getStackSize() }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table-content {
      padding: 0.5rem 0;
      background-color: white !important;
      color: #212529 !important;
    }
    
    .content-area {
      color: #212529 !important;
    }
    
    .content-area table {
      color: #212529 !important;
    }
    
    .content-area .card {
      background-color: white !important;
      color: #212529 !important;
    }
    
    .content-area .list-group-item {
      background-color: white !important;
      color: #212529 !important;
    }
    
    h5, h6 {
      color: #212529 !important;
    }
    
    .text-primary {
      color: #0d6efd !important;
    }
    
    .text-muted {
      color: #6c757d !important;
    }
  `]
})
export class TableOffcanvasContentComponent {
  @Input() idOrigem?: string;
  @Input() contextState?: string;
  @Input() title?: string;
  @Input() content?: string;
  @Input() offcanvasType?: string;
  
  private offcanvasRef?: NgbOffcanvasRef;
  private offcanvasService?: OffcanvasService;

  // Método chamado pelo container quando o componente é inicializado
  onOffcanvasInit(offcanvasRef: NgbOffcanvasRef, offcanvasService: OffcanvasService) {
    console.log('🔧 onOffcanvasInit chamado no TableOffcanvasContentComponent');
    console.log('📋 offcanvasRef recebido:', !!offcanvasRef);
    console.log('🔧 offcanvasService recebido:', !!offcanvasService);
    this.offcanvasRef = offcanvasRef;
    this.offcanvasService = offcanvasService;
    console.log('✅ Referências definidas. offcanvasRef:', !!this.offcanvasRef);
  }

  closeOffcanvas() {
    console.log('🔴 Botão "❌ Fechar" clicado');
    console.log('🔍 this.offcanvasRef existe?', !!this.offcanvasRef);
    if (this.offcanvasRef) {
      console.log('✅ Chamando this.offcanvasRef.close()');
      this.offcanvasRef.close();
    } else {
      console.log('❌ this.offcanvasRef não está definido!');
    }
  }

  getStackSize(): number {
    return this.offcanvasService?.getStackSize() || 0;
  }

  showStackInfo() {
    if (this.offcanvasService) {
      const stackInfo = this.offcanvasService.getStackInfo();
      const stackSize = this.offcanvasService.getStackSize();
      alert(`Pilha de Offcanvas:\nTotal: ${stackSize}\n\nDetalhes:\n${stackInfo.map(info => `Nível ${info.level}: ${info.position}`).join('\n')}`);
    }
  }
}