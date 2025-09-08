import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbOffcanvas, NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-direct-offcanvas-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h3>Teste Direto do ng-bootstrap</h3>
      <p>Este teste usa diretamente o ng-bootstrap sem nossa camada de abstração.</p>
      
      <button class="btn btn-primary me-2" (click)="openDirectOffcanvas()">
        Teste Direto ng-bootstrap
      </button>
      
      <button class="btn btn-success" (click)="openWithCustomClass()">
        Teste com Classe Personalizada
      </button>
    </div>
  `
})
export class DirectOffcanvasTestComponent {
  private offcanvas = inject(NgbOffcanvas);

  openDirectOffcanvas() {
    console.log('Abrindo offcanvas direto...');
    const offcanvasRef = this.offcanvas.open(DirectOffcanvasContentComponent, {
      position: 'end',
      backdrop: true
    });
    
    offcanvasRef.result.then(
      (result) => console.log('Offcanvas fechado com resultado:', result),
      (dismissed) => console.log('Offcanvas dispensado:', dismissed)
    );
  }

  openWithCustomClass() {
    console.log('Abrindo offcanvas com classe personalizada...');
    const offcanvasRef = this.offcanvas.open(DirectOffcanvasContentComponent, {
      position: 'end',
      backdrop: true,
      panelClass: 'custom-offcanvas-width'
    });
  }
}

@Component({
  selector: 'app-direct-offcanvas-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="offcanvas-header">
      <h4 class="offcanvas-title">✅ Teste de Transparência</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="close()"></button>
    </div>
    <div class="offcanvas-body">
      <div class="alert alert-success">
        <strong>🎉 Sucesso!</strong> Se você está vendo este offcanvas com fundo branco sólido (não transparente), o problema foi resolvido!
      </div>
      
      <div class="card mb-3">
        <div class="card-header">
          <h5 class="card-title mb-0">Teste Visual de Textos</h5>
        </div>
        <div class="card-body">
          <p><strong>Teste 1:</strong> Este texto deve estar visível em preto.</p>
          <p><strong>Timestamp:</strong> {{ timestamp }}</p>
          
          <div class="bg-light p-2 rounded mb-2">
            <p class="mb-1"><strong>Teste 2:</strong> Esta área tem fundo cinza claro para contraste</p>
            <small>Este texto pequeno deve estar visível</small>
          </div>
          
          <div class="bg-white p-2 border rounded mb-2">
            <p class="mb-1"><strong>Teste 3:</strong> Esta área tem fundo branco com borda</p>
            <small>Este texto pequeno também deve estar visível</small>
          </div>
          
          <div class="row">
            <div class="col-12">
              <h6>🔗 Teste de Títulos e Textos</h6>
              <p>Este parágrafo deve estar completamente visível.</p>
              <small class="text-muted">Este texto em cinza deve estar visível.</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-6">
          <button class="btn btn-secondary w-100" (click)="close()">Fechar</button>
        </div>
        <div class="col-6">
          <button class="btn btn-primary w-100" (click)="openAnother()">Abrir Outro</button>
        </div>
      </div>
      
      <hr class="my-4">
      
      <div class="form-group">
        <label for="testInput">Campo de teste:</label>
        <input type="text" class="form-control" id="testInput" placeholder="Digite algo aqui...">
      </div>
    </div>
  `,
  styles: [`
    .offcanvas-body {
      padding: 1.5rem;
      background-color: white !important;
      color: #212529 !important;
    }
    .card {
      background-color: white !important;
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
    .form-control {
      background-color: white !important;
      color: #212529 !important;
    }
    .bg-light {
      background-color: #f8f9fa !important;
      color: #495057 !important;
    }
    .bg-white {
      background-color: white !important;
      color: #212529 !important;
    }
    p, h5, h6, strong, small {
      color: inherit !important;
    }
    .text-muted {
      color: #6c757d !important;
    }
    .mb-1 {
      margin-bottom: 0.25rem;
    }
    .mb-2 {
      margin-bottom: 0.5rem;
    }
  `]
})
export class DirectOffcanvasContentComponent {
  timestamp = new Date().toLocaleString();
  
  constructor(public activeOffcanvas: NgbActiveOffcanvas) {}

  close() {
    this.activeOffcanvas.close('Fechado pelo usuário');
  }

  openAnother() {
    // Injetar o serviço NgbOffcanvas para abrir outro
    const offcanvas = inject(NgbOffcanvas);
    offcanvas.open(DirectOffcanvasContentComponent, {
      position: 'end',
      panelClass: 'custom-offcanvas-width'
    });
  }
}