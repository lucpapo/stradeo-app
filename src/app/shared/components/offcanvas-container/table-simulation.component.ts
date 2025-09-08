import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OffcanvasService } from '../../services/offcanvas.service';
import { TableOffcanvasContentComponent } from './table-offcanvas-content.component';

interface SimulationItem {
  id: number;
  name: string;
  status: string;
  lastAccess: string;
}

@Component({
  selector: 'app-table-simulation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Simulação de Lista de Itens</h2>
        <div class="d-flex gap-3 align-items-center">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="backdropSwitch" 
                   [(ngModel)]="useBackdrop">
            <label class="form-check-label" for="backdropSwitch">
              {{ useBackdrop ? '🎭 Com Backdrop' : '🚫 Sem Backdrop' }}
            </label>
            <small class="text-muted d-block">
              * Controle granular: fecha apenas de outros itens, mantém do mesmo
            </small>
          </div>
          <div class="badge bg-primary fs-6">
            Pilha: {{ getStackSize() }}
          </div>
          <button class="btn btn-outline-danger btn-sm" (click)="closeAll()">
            🗑️ Fechar Todos
          </button>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th class="text-center" style="width: 40%;">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <span class="badge" 
                      [class]="item.status === 'Ativo' ? 'bg-success' : 'bg-warning'">
                  {{ item.status }}
                </span>
              </td>
              <td>{{ item.lastAccess }}</td>
              <td class="text-center">
                <div class="d-flex justify-content-center gap-2">
                  <button 
                    class="btn btn-outline-primary btn-sm"
                    (click)="openSecurityLogs(item)"
                    title="Mesma linha: coexiste | Linha diferente: limpa pilha">
                    <i class="bi bi-shield-check"></i>
                    Log de Segurança
                  </button>
                  <button 
                    class="btn btn-outline-info btn-sm"
                    (click)="openItemData(item)"
                    title="Mesma linha: coexiste | Linha diferente: limpa pilha">
                    <i class="bi bi-info-circle"></i>
                    Dados do Item
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .table th {
      border-top: none;
    }
    
    .btn-sm {
      font-size: 0.875rem;
      padding: 0.375rem 0.75rem;
    }
    
    .gap-2 {
      gap: 0.5rem !important;
    }
    
    .badge {
      font-size: 0.75em;
    }
  `]
})
export class TableSimulationComponent {
  private offcanvasService = inject(OffcanvasService);

  useBackdrop = false; // Controle do backdrop
  private currentItemId: number | null = null; // Rastrear o ID do item atual na pilha

  // IDs únicos para controle de offcanvas
  private readonly OFFCANVAS_IDS = {
    SECURITY_LOGS: 'offseguranca',
    ITEM_DATA: 'offitem'
  } as const;

  getStackSize(): number {
    return this.offcanvasService.getStackSize();
  }

  closeAll() {
    this.offcanvasService.closeAll();
    this.currentItemId = null;
  }

  items: SimulationItem[] = [
    {
      id: 1,
      name: 'Sistema de Autenticação',
      status: 'Ativo',
      lastAccess: '2024-01-15 14:30:25'
    },
    {
      id: 2,
      name: 'Base de Dados Principal',
      status: 'Ativo',
      lastAccess: '2024-01-15 14:28:10'
    },
    {
      id: 3,
      name: 'Servidor de Backup',
      status: 'Inativo',
      lastAccess: '2024-01-14 22:15:45'
    },
    {
      id: 4,
      name: 'API Gateway',
      status: 'Ativo',
      lastAccess: '2024-01-15 14:32:18'
    },
    {
      id: 5,
      name: 'Cache Redis',
      status: 'Ativo',
      lastAccess: '2024-01-15 14:31:55'
    }
  ];

  openSecurityLogs(item: SimulationItem) {
    const offcanvasId = this.OFFCANVAS_IDS.SECURITY_LOGS;

    // Se é uma linha diferente, limpa toda a pilha
    if (this.currentItemId !== null && this.currentItemId !== item.id) {
      this.offcanvasService.closeAll();
    }

    // Verifica se já existe um offcanvas com este ID
    if (this.offcanvasService.isOpenById(offcanvasId)) {
      // Se já existe, não faz nada (previne duplicação)
      return;
    }

    // Define o item atual
    this.currentItemId = item.id;

    // Abre offcanvas de logs com ID único
    const offcanvasRef = this.offcanvasService.open(
      TableOffcanvasContentComponent,
      {
        idOrigem: `logs-${item.id}`,
        contextState: `logs-${item.name}`,
        title: `Logs de Segurança - ${item.name}`,
        content: this.generateSecurityLogsContent(item),
        offcanvasType: 'logs'
      },
      undefined, // injector
      {
        position: 'start',
        panelClass: 'offcanvas-class-50',
        backdrop: false,
        nestingMode: 'no-backdrop',
        id: offcanvasId // ID único para este tipo de offcanvas
      }
    );

    // Adicionar listener para limpar currentItemId quando necessário
    offcanvasRef.result.catch(() => {
      // Se não há mais offcanvas na pilha, limpa o item atual
      setTimeout(() => {
        if (this.offcanvasService.getStackSize() === 0) {
          this.currentItemId = null;
        }
      }, 100);
    });
  }



  openItemData(item: SimulationItem) {
    const offcanvasId = this.OFFCANVAS_IDS.ITEM_DATA;

    // Se é uma linha diferente, limpa toda a pilha
    if (this.currentItemId !== null && this.currentItemId !== item.id) {
      this.offcanvasService.closeAll();
    }

    // Verifica se já existe um offcanvas com este ID
    if (this.offcanvasService.isOpenById(offcanvasId)) {
      // Se já existe, não faz nada (previne duplicação)
      return;
    }

    // Define o item atual
    this.currentItemId = item.id;

    // Abre offcanvas de dados com ID único
    const offcanvasRef = this.offcanvasService.open(
      TableOffcanvasContentComponent,
      {
        idOrigem: `item-${item.id}`,
        contextState: `item-${item.name}`,
        title: `Dados do Item - ${item.name}`,
        content: this.generateItemDataContent(item),
        offcanvasType: 'item'
      },
      undefined, // injector
      {
        position: 'start',
        panelClass: 'offcanvas-class-40',
        backdrop: false,
        nestingMode: 'no-backdrop',
        id: offcanvasId // ID único para este tipo de offcanvas
      }
    );

    // Adicionar listener para limpar currentItemId quando necessário
    offcanvasRef.result.catch(() => {
      // Se não há mais offcanvas na pilha, limpa o item atual
      setTimeout(() => {
        if (this.offcanvasService.getStackSize() === 0) {
          this.currentItemId = null;
        }
      }, 100);
    });
  }





  private generateSecurityLogsContent(item: SimulationItem): string {
    const logs = [
      { time: '14:30:25', action: 'Login realizado', user: 'admin@sistema.com', ip: '192.168.1.100' },
      { time: '14:28:10', action: 'Acesso autorizado', user: 'user@sistema.com', ip: '192.168.1.101' },
      { time: '14:25:33', action: 'Tentativa de login', user: 'guest@sistema.com', ip: '192.168.1.102' },
      { time: '14:20:15', action: 'Logout executado', user: 'admin@sistema.com', ip: '192.168.1.100' },
      { time: '14:15:42', action: 'Acesso negado', user: 'unknown@test.com', ip: '10.0.0.50' }
    ];

    return `
      <div class="p-3">
        <div class="mb-3">
          <h6 class="text-muted">Item: ${item.name} (ID: ${item.id})</h6>
        </div>
        
        <div class="table-responsive">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Ação</th>
                <th>Usuário</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map(log => `
                <tr style="cursor: pointer;" onclick="window.openNestedLog('${item.id}', '${log.time}')">
                  <td>${log.time}</td>
                  <td>${log.action}</td>
                  <td>${log.user}</td>
                  <td>${log.ip}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="mt-3">
          <small class="text-muted">Clique em uma linha para ver detalhes do log</small>
        </div>
      </div>
    `;
  }

  private generateItemDataContent(item: SimulationItem): string {
    return `
      <div class="p-3">
        <div class="row">
          <div class="col-12">
            <h6 class="text-muted mb-3">Informações Detalhadas</h6>
            
            <div class="card mb-3">
              <div class="card-body">
                <h6 class="card-title">Dados Básicos</h6>
                <p><strong>ID:</strong> ${item.id}</p>
                <p><strong>Nome:</strong> ${item.name}</p>
                <p><strong>Status:</strong> ${item.status}</p>
                <p><strong>Último Acesso:</strong> ${item.lastAccess}</p>
              </div>
            </div>
            
            <div class="card mb-3">
              <div class="card-body">
                <h6 class="card-title">Configurações</h6>
                <p><strong>Tipo:</strong> Sistema Crítico</p>
                <p><strong>Ambiente:</strong> Produção</p>
                <p><strong>Versão:</strong> 2.1.4</p>
                <p><strong>Responsável:</strong> Equipe DevOps</p>
              </div>
            </div>
            
            <div class="list-group">
              <div class="list-group-item list-group-item-action" 
                   style="cursor: pointer;" 
                   onclick="window.openNestedItem('${item.id}', 'config')">
                <i class="bi bi-gear"></i> Configurações Avançadas
              </div>
              <div class="list-group-item list-group-item-action" 
                   style="cursor: pointer;" 
                   onclick="window.openNestedItem('${item.id}', 'metrics')">
                <i class="bi bi-graph-up"></i> Métricas de Performance
              </div>
              <div class="list-group-item list-group-item-action" 
                   style="cursor: pointer;" 
                   onclick="window.openNestedItem('${item.id}', 'history')">
                <i class="bi bi-clock-history"></i> Histórico de Alterações
              </div>
            </div>
            
            <div class="mt-3">
              <small class="text-muted">Clique em uma opção para ver mais detalhes</small>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}