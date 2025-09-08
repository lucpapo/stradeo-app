import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasService } from '../../services/offcanvas.service';
import { ExampleOffcanvasContentComponent } from './example-offcanvas-content.component';

@Component({
  selector: 'app-nested-offcanvas-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <div class="alert alert-info">
            <h5 class="alert-heading">🎯 Demo de Offcanvas Aninhados</h5>
            <p class="mb-0">
              Teste o sistema de offcanvas aninhados com backdrop do anterior e escolha de posição.
              O backdrop do primeiro offcanvas permanece visível enquanto os aninhados não têm backdrop próprio.
            </p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h6>🚀 Iniciar Demonstração</h6>
            </div>
            <div class="card-body">
              <button class="btn btn-primary me-2 mb-2" (click)="startDemo('end')">
                ➡️ Começar pela Direita
              </button>
              <button class="btn btn-info me-2 mb-2" (click)="startDemo('start')">
                ⬅️ Começar pela Esquerda
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h6>📊 Status da Pilha</h6>
            </div>
            <div class="card-body">
              <p><strong>Offcanvas Ativos:</strong> {{ stackSize }}</p>
              <button class="btn btn-warning me-2 mb-2" (click)="updateStackInfo()">
                🔄 Atualizar
              </button>
              <button class="btn btn-danger me-2 mb-2" (click)="closeAll()" [disabled]="stackSize === 0">
                🗑️ Fechar Todos
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>📋 Instruções de Teste</h6>
            </div>
            <div class="card-body">
              <ol>
                <li><strong>Inicie</strong> clicando em "Começar pela Direita" ou "Começar pela Esquerda"</li>
                <li><strong>No primeiro offcanvas</strong>, teste os botões de abrir aninhados em diferentes posições</li>
                <li><strong>Observe</strong> que o backdrop do primeiro permanece visível</li>
                <li><strong>Teste</strong> abrir offcanvas do lado oposto para ver ambos os lados</li>
                <li><strong>Verifique</strong> os indicadores de nível nos offcanvas aninhados</li>
                <li><strong>Use</strong> "Info da Pilha" para ver detalhes da estrutura</li>
              </ol>
              
              <div class="alert alert-success mt-3">
                <strong>✅ Funcionalidades Implementadas:</strong>
                <ul class="mb-0 mt-2">
                  <li>Backdrop do primeiro offcanvas permanece visível</li>
                  <li>Offcanvas aninhados não criam backdrop próprio</li>
                  <li>Escolha de posição (direita, esquerda, oposto)</li>
                  <li>Z-index automático baseado no nível</li>
                  <li>Indicadores visuais de nível</li>
                  <li>Gerenciamento de pilha inteligente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .me-2 { margin-right: 0.5rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-4 { margin-top: 1.5rem; }
    .mt-3 { margin-top: 1rem; }
    
    .alert ul {
      padding-left: 1.2rem;
    }
    
    .card-header h6 {
      margin-bottom: 0;
    }
  `]
})
export class NestedOffcanvasDemoComponent {
  private offcanvasService = inject(OffcanvasService);
  
  stackSize = 0;

  constructor() {
    this.updateStackInfo();
  }

  startDemo(position: 'start' | 'end') {
    this.offcanvasService.openAtPosition(
      ExampleOffcanvasContentComponent,
      position,
      {
        idOrigem: `demo-${position}-${Date.now()}`,
        contextState: `demo-root-${position}`
      },
      'offcanvas-class-80'
    );
    
    setTimeout(() => this.updateStackInfo(), 100);
  }

  updateStackInfo() {
    this.stackSize = this.offcanvasService.getStackSize();
  }

  closeAll() {
    this.offcanvasService.closeAll();
    setTimeout(() => this.updateStackInfo(), 100);
  }
}