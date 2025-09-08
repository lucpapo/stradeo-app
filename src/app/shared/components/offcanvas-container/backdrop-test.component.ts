import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OffcanvasService } from '../../services/offcanvas.service';
import { TableOffcanvasContentComponent } from './table-offcanvas-content.component';

@Component({
  selector: 'app-backdrop-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid p-4">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">🎭 Teste de Backdrop - Correção Aplicada</h2>
          
          <div class="alert alert-info">
            <h5>✅ Problema Corrigido:</h5>
            <p class="mb-2">O primeiro item agora respeita a configuração de backdrop.</p>
            <ul class="mb-0">
              <li><strong>Com Backdrop:</strong> Primeiro offcanvas terá backdrop escuro</li>
              <li><strong>Sem Backdrop:</strong> Primeiro offcanvas NÃO terá backdrop</li>
              <li><strong>Aninhados:</strong> Seguem a regra do modo selecionado</li>
            </ul>
          </div>
          
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center mb-3">
                <div class="col-md-6">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="backdropSwitch" 
                           [(ngModel)]="useBackdrop">
                    <label class="form-check-label" for="backdropSwitch">
                      <strong>{{ useBackdrop ? '🎭 Modo: COM Backdrop' : '🚫 Modo: SEM Backdrop' }}</strong>
                    </label>
                  </div>
                  <small class="text-muted">
                    {{ useBackdrop ? 'Cada offcanvas terá seu backdrop' : 'Nenhum offcanvas terá backdrop' }}
                  </small>
                </div>
                <div class="col-md-6 text-end">
                  <div class="badge bg-primary fs-6 me-2">
                    Pilha: {{ getStackSize() }}
                  </div>
                  <button class="btn btn-outline-danger btn-sm" (click)="closeAll()">
                    🗑️ Fechar Todos
                  </button>
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-6">
                  <h5>🔥 Teste do Primeiro Item</h5>
                  <p class="text-muted">Clique para testar se o backdrop está sendo aplicado corretamente:</p>
                  <button class="btn btn-primary me-2 mb-2" (click)="openFirstItem()">
                    🚀 Abrir Primeiro Offcanvas
                  </button>
                  <button class="btn btn-outline-primary mb-2" (click)="openSecondItem()">
                    ➕ Abrir Segundo (Aninhado)
                  </button>
                </div>
                
                <div class="col-md-6">
                  <h5>📋 Teste de Lista</h5>
                  <p class="text-muted">Simula cliques em itens de uma tabela:</p>
                  <div class="d-flex flex-wrap gap-2">
                    <button class="btn btn-outline-info btn-sm" 
                            *ngFor="let item of testItems; let i = index"
                            (click)="openItemOffcanvas(item, i)">
                      Item {{ item.id }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
            <h5>🧪 Como Testar:</h5>
            <ol>
              <li><strong>Desmarque</strong> o switch "Modo: SEM Backdrop"</li>
              <li>Clique em <strong>"Abrir Primeiro Offcanvas"</strong></li>
              <li><strong>Verifique:</strong> NÃO deve aparecer backdrop escuro atrás</li>
              <li><strong>Marque</strong> o switch "Modo: COM Backdrop"</li>
              <li>Feche todos e clique novamente em <strong>"Abrir Primeiro Offcanvas"</strong></li>
              <li><strong>Verifique:</strong> DEVE aparecer backdrop escuro atrás</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-check-input:checked {
      background-color: #198754;
      border-color: #198754;
    }
    
    .badge {
      font-size: 0.9rem;
    }
    
    .btn-sm {
      font-size: 0.875rem;
    }
  `]
})
export class BackdropTestComponent {
  private offcanvasService = inject(OffcanvasService);
  
  useBackdrop = false;
  
  testItems = [
    { id: 1, name: 'Primeiro Item' },
    { id: 2, name: 'Segundo Item' },
    { id: 3, name: 'Terceiro Item' }
  ];

  getStackSize(): number {
    return this.offcanvasService.getStackSize();
  }

  closeAll() {
    this.offcanvasService.closeAll();
  }

  openFirstItem() {
    this.offcanvasService.open(
      TableOffcanvasContentComponent,
      {
        idOrigem: 'first-test',
        contextState: 'first-test-context',
        title: '🚀 Primeiro Offcanvas - Teste de Backdrop',
        content: this.generateTestContent('primeiro', this.useBackdrop),
        offcanvasType: 'test'
      },
      undefined,
      {
        position: 'end',
        panelClass: 'offcanvas-class-60',
        backdrop: this.useBackdrop,
        nestingMode: this.useBackdrop ? 'with-backdrop' : 'no-backdrop'
      }
    );
  }

  openSecondItem() {
    this.offcanvasService.open(
      TableOffcanvasContentComponent,
      {
        idOrigem: 'second-test',
        contextState: 'second-test-context',
        title: '➕ Segundo Offcanvas - Aninhado',
        content: this.generateTestContent('segundo', this.useBackdrop),
        offcanvasType: 'test-nested'
      },
      undefined,
      {
        position: 'start',
        panelClass: 'offcanvas-class-50',
        backdrop: this.useBackdrop,
        nestingMode: this.useBackdrop ? 'with-backdrop' : 'no-backdrop'
      }
    );
  }

  openItemOffcanvas(item: any, index: number) {
    this.offcanvasService.open(
      TableOffcanvasContentComponent,
      {
        idOrigem: `item-${item.id}`,
        contextState: `item-${item.id}-context`,
        title: `📋 ${item.name} - Teste`,
        content: this.generateItemContent(item, index),
        offcanvasType: 'item-test'
      },
      undefined,
      {
        position: index % 2 === 0 ? 'end' : 'start',
        panelClass: 'offcanvas-class-70',
        backdrop: this.useBackdrop,
        nestingMode: this.useBackdrop ? 'with-backdrop' : 'no-backdrop'
      }
    );
  }

  private generateTestContent(tipo: string, hasBackdrop: boolean): string {
    return `
      <div class="p-3">
        <div class="alert ${hasBackdrop ? 'alert-success' : 'alert-warning'}">
          <h6>🎭 Status do Backdrop:</h6>
          <p class="mb-2">
            <strong>Configuração:</strong> ${hasBackdrop ? 'COM backdrop' : 'SEM backdrop'}
          </p>
          <p class="mb-0">
            <strong>Resultado esperado:</strong> 
            ${hasBackdrop ? 'Deve haver um fundo escuro atrás do offcanvas' : 'NÃO deve haver fundo escuro atrás do offcanvas'}
          </p>
        </div>
        
        <div class="card">
          <div class="card-body">
            <h6>📊 Informações do Teste</h6>
            <p><strong>Tipo:</strong> ${tipo} offcanvas</p>
            <p><strong>Pilha atual:</strong> ${this.getStackSize()} offcanvas</p>
            <p><strong>Modo:</strong> ${hasBackdrop ? 'with-backdrop' : 'no-backdrop'}</p>
          </div>
        </div>
        
        <div class="mt-3">
          <button class="btn btn-outline-primary btn-sm me-2" 
                  onclick="alert('Teste de interação funcionando!')">
            🧪 Testar Interação
          </button>
          <button class="btn btn-outline-info btn-sm" 
                  onclick="console.log('Backdrop test: ${hasBackdrop}')">
            📝 Log no Console
          </button>
        </div>
      </div>
    `;
  }

  private generateItemContent(item: any, index: number): string {
    return `
      <div class="p-3">
        <div class="card">
          <div class="card-body">
            <h6>📋 ${item.name}</h6>
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Posição na lista:</strong> ${index + 1}</p>
            <p><strong>Backdrop ativo:</strong> ${this.useBackdrop ? 'Sim' : 'Não'}</p>
          </div>
        </div>
        
        <div class="mt-3">
          <small class="text-muted">
            Este é o conteúdo do ${item.name}. 
            ${this.useBackdrop ? 'Deve haver backdrop.' : 'Não deve haver backdrop.'}
          </small>
        </div>
      </div>
    `;
  }
}