import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-dual-nesting-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <div class="alert alert-primary">
            <h5 class="alert-heading">🎯 Demo dos Dois Tipos de Aninhamento</h5>
            <p class="mb-0">
              Teste os dois modos distintos de offcanvas aninhados: sem backdrop (lado a lado) e com backdrop (camadas).
            </p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card border-info">
            <div class="card-header bg-info text-white">
              <h6 class="mb-0">🔗 Modo 1: Sem Backdrop (Lado a Lado)</h6>
            </div>
            <div class="card-body">
              <p><small>Offcanvas abrem lado a lado, compartilhando o backdrop do primeiro.</small></p>
              
              <button class="btn btn-info btn-sm me-2 mb-2" (click)="startNoBackdropDemo('end')">
                ➡️ Iniciar pela Direita
              </button>
              
              <button class="btn btn-outline-info btn-sm me-2 mb-2" (click)="startNoBackdropDemo('start')">
                ⬅️ Iniciar pela Esquerda
              </button>
              
              <div class="mt-2">
                <small class="text-muted">
                  <strong>Características:</strong><br>
                  • Apenas o primeiro tem backdrop<br>
                  • Offcanvas ficam lado a lado<br>
                  • Ideal para comparações
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card border-warning">
            <div class="card-header bg-warning text-dark">
              <h6 class="mb-0">🏗️ Modo 2: Com Backdrop (Camadas)</h6>
            </div>
            <div class="card-body">
              <p><small>Cada offcanvas tem seu próprio backdrop, criando camadas sobrepostas.</small></p>
              
              <button class="btn btn-warning btn-sm me-2 mb-2" (click)="startWithBackdropDemo()">
                🏗️ Iniciar Camadas
              </button>
              
              <button class="btn btn-outline-warning btn-sm me-2 mb-2" (click)="startMixedDemo()">
                🎭 Demo Mista
              </button>
              
              <div class="mt-2">
                <small class="text-muted">
                  <strong>Características:</strong><br>
                  • Cada um tem seu backdrop<br>
                  • Camadas sobrepostas<br>
                  • Ideal para workflows
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>📊 Status e Controles</h6>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <p><strong>Offcanvas Ativos:</strong> {{ stackSize }}</p>
                  <button class="btn btn-sm btn-outline-primary me-2" (click)="updateStackInfo()">
                    🔄 Atualizar
                  </button>
                  <button class="btn btn-sm btn-danger" (click)="closeAll()" [disabled]="stackSize === 0">
                    🗑️ Fechar Todos
                  </button>
                </div>
                <div class="col-md-6">
                  <div class="alert alert-light mb-0">
                    <small>
                      <strong>💡 Dica:</strong> Abra vários offcanvas em cada modo para ver as diferenças de comportamento!
                    </small>
                  </div>
                </div>
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
    .mt-2 { margin-top: 0.5rem; }
    
    .card-header h6 {
      margin-bottom: 0;
    }
    
    .border-info {
      border-color: #0dcaf0 !important;
    }
    
    .border-warning {
      border-color: #ffc107 !important;
    }
  `]
})
export class DualNestingDemoComponent {
  private offcanvasService = inject(OffcanvasService);
  
  stackSize = 0;

  constructor() {
    this.updateStackInfo();
  }

  // Modo 1: Sem Backdrop (Lado a Lado)
  startNoBackdropDemo(position: 'start' | 'end') {
    this.offcanvasService.openNestedNoBackdrop(
      NoBackdropContentComponent,
      {
        level: 1,
        mode: 'no-backdrop',
        position: position,
        title: `Primeiro Offcanvas (${position === 'end' ? 'Direita' : 'Esquerda'})`
      },
      {
        position: position,
        panelClass: 'offcanvas-class-80'
      }
    );
    
    setTimeout(() => this.updateStackInfo(), 100);
  }

  // Modo 2: Com Backdrop (Camadas)
  startWithBackdropDemo() {
    this.offcanvasService.openNestedWithBackdrop(
      WithBackdropContentComponent,
      {
        level: 1,
        mode: 'with-backdrop',
        title: 'Primeira Camada'
      },
      {
        panelClass: 'offcanvas-class-85'
      }
    );
    
    setTimeout(() => this.updateStackInfo(), 100);
  }

  // Demo Mista
  startMixedDemo() {
    // Primeiro sem backdrop
    this.offcanvasService.openNestedNoBackdrop(
      MixedContentComponent,
      {
        level: 1,
        mode: 'mixed',
        title: 'Demo Mista - Base'
      },
      {
        position: 'end',
        panelClass: 'offcanvas-class-90'
      }
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

// Componente para modo sem backdrop
@Component({
  selector: 'app-no-backdrop-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-3">
      <div class="alert alert-info">
        <h5>🔗 {{ title }}</h5>
        <p class="mb-0">Modo: <strong>{{ mode }}</strong> | Nível: <strong>{{ level }}</strong></p>
      </div>
      
      <div class="mb-3">
        <h6>Abrir Lado a Lado (Sem Backdrop)</h6>
        <button class="btn btn-primary btn-sm me-2 mb-2" (click)="openRight()">
          ➡️ Direita (60%)
        </button>
        <button class="btn btn-info btn-sm me-2 mb-2" (click)="openLeft()">
          ⬅️ Esquerda (50%)
        </button>
        <button class="btn btn-success btn-sm me-2 mb-2" (click)="openOpposite()">
          🔄 Lado Oposto (70%)
        </button>
      </div>
      
      <div class="mb-3">
        <h6>Controles</h6>
        <button class="btn btn-secondary btn-sm me-2" (click)="close()">❌ Fechar</button>
        <button class="btn btn-outline-danger btn-sm" (click)="closeAll()">🗑️ Fechar Todos</button>
      </div>
    </div>
  `
})
export class NoBackdropContentComponent {
  title = 'Offcanvas Sem Backdrop';
  mode = 'no-backdrop';
  level = 1;
  
  private offcanvasService = inject(OffcanvasService);

  openRight() {
    this.offcanvasService.openSideBySide(
      NoBackdropContentComponent,
      'end',
      {
        level: this.level + 1,
        mode: this.mode,
        title: `Nível ${this.level + 1} - Direita`
      },
      'offcanvas-class-60'
    );
  }

  openLeft() {
    this.offcanvasService.openSideBySide(
      NoBackdropContentComponent,
      'start',
      {
        level: this.level + 1,
        mode: this.mode,
        title: `Nível ${this.level + 1} - Esquerda`
      },
      'offcanvas-class-50'
    );
  }

  openOpposite() {
    this.offcanvasService.openOpposite(
      NoBackdropContentComponent,
      {
        level: this.level + 1,
        mode: this.mode,
        title: `Nível ${this.level + 1} - Oposto`
      },
      'offcanvas-class-70'
    );
  }

  close() {
    // Implementar fechamento
  }

  closeAll() {
    this.offcanvasService.closeAll();
  }
}

// Componente para modo com backdrop
@Component({
  selector: 'app-with-backdrop-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-3">
      <div class="alert alert-warning">
        <h5>🏗️ {{ title }}</h5>
        <p class="mb-0">Modo: <strong>{{ mode }}</strong> | Nível: <strong>{{ level }}</strong></p>
      </div>
      
      <div class="mb-3">
        <h6>Abrir em Camadas (Com Backdrop)</h6>
        <button class="btn btn-warning btn-sm me-2 mb-2" (click)="openLayer('80')">
          🏗️ Nova Camada (80%)
        </button>
        <button class="btn btn-outline-warning btn-sm me-2 mb-2" (click)="openLayer('70')">
          📄 Camada Menor (70%)
        </button>
        <button class="btn btn-outline-warning btn-sm me-2 mb-2" (click)="openLayer('60')">
          📋 Camada Pequena (60%)
        </button>
      </div>
      
      <div class="mb-3">
        <h6>Controles</h6>
        <button class="btn btn-secondary btn-sm me-2" (click)="close()">❌ Fechar</button>
        <button class="btn btn-outline-danger btn-sm" (click)="closeAll()">🗑️ Fechar Todos</button>
      </div>
    </div>
  `
})
export class WithBackdropContentComponent {
  title = 'Offcanvas Com Backdrop';
  mode = 'with-backdrop';
  level = 1;
  
  private offcanvasService = inject(OffcanvasService);

  openLayer(size: string) {
    this.offcanvasService.openLayered(
      WithBackdropContentComponent,
      {
        level: this.level + 1,
        mode: this.mode,
        title: `Camada ${this.level + 1} (${size}%)`
      },
      `offcanvas-class-${size}`
    );
  }

  close() {
    // Implementar fechamento
  }

  closeAll() {
    this.offcanvasService.closeAll();
  }
}

// Componente para demo mista
@Component({
  selector: 'app-mixed-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-3">
      <div class="alert alert-success">
        <h5>🎭 {{ title }}</h5>
        <p class="mb-0">Modo: <strong>{{ mode }}</strong> | Nível: <strong>{{ level }}</strong></p>
      </div>
      
      <div class="mb-3">
        <h6>Escolha o Tipo de Aninhamento</h6>
        <button class="btn btn-info btn-sm me-2 mb-2" (click)="openNoBackdrop()">
          🔗 Sem Backdrop (Lado a Lado)
        </button>
        <button class="btn btn-warning btn-sm me-2 mb-2" (click)="openWithBackdrop()">
          🏗️ Com Backdrop (Camada)
        </button>
      </div>
      
      <div class="mb-3">
        <h6>Controles</h6>
        <button class="btn btn-secondary btn-sm me-2" (click)="close()">❌ Fechar</button>
        <button class="btn btn-outline-danger btn-sm" (click)="closeAll()">🗑️ Fechar Todos</button>
      </div>
    </div>
  `
})
export class MixedContentComponent {
  title = 'Demo Mista';
  mode = 'mixed';
  level = 1;
  
  private offcanvasService = inject(OffcanvasService);

  openNoBackdrop() {
    this.offcanvasService.openNestedNoBackdrop(
      NoBackdropContentComponent,
      {
        level: this.level + 1,
        mode: 'no-backdrop',
        title: `Sem Backdrop - Nível ${this.level + 1}`
      },
      {
        position: 'start',
        panelClass: 'offcanvas-class-70'
      }
    );
  }

  openWithBackdrop() {
    this.offcanvasService.openNestedWithBackdrop(
      WithBackdropContentComponent,
      {
        level: this.level + 1,
        mode: 'with-backdrop',
        title: `Com Backdrop - Nível ${this.level + 1}`
      },
      {
        panelClass: 'offcanvas-class-75'
      }
    );
  }

  close() {
    // Implementar fechamento
  }

  closeAll() {
    this.offcanvasService.closeAll();
  }
}