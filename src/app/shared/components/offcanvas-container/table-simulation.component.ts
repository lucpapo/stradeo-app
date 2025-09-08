import { Component, inject, OnInit } from '@angular/core';
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
              * Log de Segurança usa backdrop opcional | IPs sempre empilham com backdrop
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
                    title="Abre logs com backdrop opcional | Clique nos IPs para empilhar">
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
export class TableSimulationComponent implements OnInit {
  private offcanvasService = inject(OffcanvasService);

  useBackdrop = false; // Controle do backdrop
  private currentItemId: number | null = null; // Rastrear o ID do item atual na pilha

  ngOnInit() {
    // Registrar funções globais para uso nos templates HTML
    this.registerGlobalFunctions();
  }

  private registerGlobalFunctions() {
    (window as any).openIpDetails = (ip: string, itemId: string) => {
      console.log('🔍 openIpDetails chamado:', ip, itemId);
      this.openIpDetails(ip, itemId);
    };

    (window as any).openIpLocation = (ip: string, itemId: string) => {
      console.log('🔍 openIpLocation chamado:', ip, itemId);
      this.openIpLocation(ip, itemId);
    };

    console.log('✅ Funções globais registradas');
  }

  // IDs únicos para controle de offcanvas
  private readonly OFFCANVAS_IDS = {
    SECURITY_LOGS: 'offseguranca',
    ITEM_DATA: 'offitem',
    IP_DETAILS: 'logip',
    IP_LOCATION: 'loglocation'
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

    // Preparar dados para o offcanvas
    const offcanvasData = {
      idOrigem: `logs-${item.id}`,
      contextState: `logs-${item.name}`,
      title: `Logs de Segurança - ${item.name}`,
      content: this.generateSecurityLogsContent(item),
      offcanvasType: 'logs',
      itemId: item.id.toString(), // Converter para string
      itemName: item.name, // Passar o nome do item
      securityLogs: this.getSecurityLogsData(), // Passar os dados dos logs
      callbacks: {
        openIpDetails: (ip: string, itemId: string) => {
          console.log('🔥 Callback openIpDetails chamado:', ip, itemId);
          this.openIpDetails(ip, itemId);
        },
        openIpLocation: (ip: string, itemId: string) => {
          console.log('🔥 Callback openIpLocation chamado:', ip, itemId);
          this.openIpLocation(ip, itemId);
        }
      }
    };

    console.log('📤 Dados sendo passados para o offcanvas:', offcanvasData);
    console.log('📤 Callbacks definidos:', !!offcanvasData.callbacks.openIpDetails);

    // Abre offcanvas de logs com backdrop ativado
    const offcanvasRef = this.offcanvasService.open(
      TableOffcanvasContentComponent,
      offcanvasData,
      undefined, // injector
      {
        position: 'start',
        panelClass: 'offcanvas-class-50',
        backdrop: this.useBackdrop, // Usar a configuração do switch
        nestingMode: 'with-backdrop', // Modo com backdrop para empilhamento
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



  // Gerar conteúdo dos logs de segurança
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
          <div class="alert alert-info alert-sm">
            <i class="bi bi-info-circle"></i> Clique em um IP para ver detalhes (abrirá offcanvas empilhado com backdrop)
          </div>
        </div>
        
        <div class="table-responsive">
          <table class="table table-sm table-hover">
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
                <tr>
                  <td>${log.time}</td>
                  <td>${log.action}</td>
                  <td>${log.user}</td>
                  <td>
                    <span class="badge bg-primary ip-clickable" 
                          style="cursor: pointer; user-select: none;" 
                          data-ip="${log.ip}"
                          data-item="${item.id}"
                          title="Clique para ver detalhes do IP">
                      📍 ${log.ip}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="mt-3">
          <small class="text-muted">
            <strong>💡 Dica:</strong> Clique em qualquer IP (badge azul) para abrir detalhes em offcanvas empilhado
          </small>
        </div>
      </div>
    `;
  }

  // Método para abrir detalhes do IP (offcanvas empilhado)
  openIpDetails(ip: string, itemId: string) {
    console.log('🎯🔍 ===== DETALHES DO IP CHAMADO =====');
    console.log('🎯 openIpDetails chamado com:', ip, itemId);
    console.log('🎯 ESTE É O MÉTODO DE DETALHES - NÃO LOCALIZAÇÃO!');
    const offcanvasId = this.OFFCANVAS_IDS.IP_DETAILS;

    // Verifica se já existe um offcanvas com este ID
    if (this.offcanvasService.isOpenById(offcanvasId)) {
      console.log('🔄 Fechando offcanvas existente:', offcanvasId);
      // Se já existe, fecha e abre novo (substitui)
      this.offcanvasService.closeById(offcanvasId);
    }

    // Abre offcanvas de detalhes do IP com backdrop (empilhado)
    const offcanvasRef = this.offcanvasService.open(
      TableOffcanvasContentComponent,
      {
        idOrigem: `ip-${ip}`,
        contextState: `ip-details-${ip}`,
        title: `Detalhes do IP - ${ip}`,
        content: this.generateIpDetailsContent(ip, itemId),
        offcanvasType: 'ip-details',
        ipAddress: ip,
        itemId: itemId,
        callbacks: {
          openIpDetails: (ip: string, itemId: string) => this.openIpDetails(ip, itemId),
          openIpLocation: (ip: string, itemId: string) => this.openIpLocation(ip, itemId)
        }
      },
      undefined, // injector
      {
        position: 'end', // Lado direito
        panelClass: 'offcanvas-class-30', // 30% de largura
        backdrop: true, // Com backdrop para cobrir o anterior
        nestingMode: 'with-backdrop', // Modo empilhado
        id: offcanvasId // ID único
      }
    );
  }

  // Método para abrir localização do IP (offcanvas empilhado sobre o anterior)
  openIpLocation(ip: string, itemId: string) {
    console.log('🌍🎯 ===== LOCALIZAÇÃO CHAMADA =====');
    console.log('🌍 openIpLocation chamado:', ip, itemId);
    console.log('🌍 Timestamp:', new Date().toISOString());
    console.log('🌍 ESTE É O MÉTODO DE LOCALIZAÇÃO - NÃO DETALHES!');

    // Criar ID COMPLETAMENTE único para evitar qualquer conflito
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const uniqueId = `location-${ip.replace(/\./g, '-')}-${itemId}-${timestamp}-${randomSuffix}`;
    console.log('🆔 ID COMPLETAMENTE único gerado:', uniqueId);
    console.log('� TimestDamp:', timestamp, 'Random:', randomSuffix);

    console.log('🌍 Pilha atual antes:', this.offcanvasService.getStackSize());
    console.log('🌍 IDs na pilha:', this.offcanvasService.getStackInfo());

    // SEMPRE criar novo offcanvas - nunca verificar se existe
    console.log('🌍 FORÇANDO novo offcanvas de localização - sempre empilhar');
    console.log('🌍 Abrindo localização do IP do lado ESQUERDO');

    // Abre offcanvas de localização do LADO ESQUERDO com backdrop (empilhado sobre o anterior)
    const offcanvasRef = this.offcanvasService.open(
      TableOffcanvasContentComponent,
      {
        idOrigem: `location-${ip}-${timestamp}`,
        contextState: `ip-location-${ip}-${timestamp}`,
        title: `🌍 Localização do IP - ${ip}`,
        content: this.generateIpLocationContent(ip, itemId),
        offcanvasType: 'ip-location',
        ipAddress: ip,
        itemId: itemId,
        callbacks: {
          openIpDetails: (ip: string, itemId: string) => this.openIpDetails(ip, itemId),
          openIpLocation: (ip: string, itemId: string) => this.openIpLocation(ip, itemId)
        }
      },
      undefined, // injector
      {
        position: 'start', // ← LADO ESQUERDO
        panelClass: 'offcanvas-class-35', // 35% de largura
        backdrop: true, // Com backdrop para proteger o anterior
        nestingMode: 'with-backdrop', // Modo empilhado com backdrop
        id: uniqueId // ID único com timestamp + random
      }
    );

    console.log('✅ Offcanvas de localização aberto do lado ESQUERDO');
    console.log('🔍 Pilha atual depois:', this.offcanvasService.getStackSize());

    // Verificação adicional após criação
    setTimeout(() => {
      console.log('🔍 Verificação pós-criação:');
      console.log('  - Pilha final:', this.offcanvasService.getStackSize());
      console.log('  - Elemento existe?', !!document.querySelector(`.offcanvas-level-3`));
      console.log('  - É lado esquerdo?', document.querySelector(`.offcanvas-level-3`)?.classList.contains('offcanvas-start'));
      console.log('  - ID único usado:', uniqueId);
    }, 100);
  }

  // Gerar conteúdo dos detalhes do IP
  private generateIpDetailsContent(ip: string, itemId: string): string {
    const ipData = {
      ip: ip,
      type: ip.startsWith('192.168') ? 'Interno' : 'Externo',
      status: 'Ativo',
      firstSeen: '2024-01-10 08:15:30',
      lastSeen: '2024-01-15 14:30:25',
      totalConnections: Math.floor(Math.random() * 500) + 50,
      riskLevel: ip.includes('10.0.0') ? 'Alto' : 'Baixo'
    };

    return `
      <div class="p-3">
        <div class="mb-3">
          <div class="alert alert-info alert-sm">
            <i class="bi bi-info-circle"></i> Offcanvas empilhado com backdrop sobre o anterior
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header bg-primary text-white">
            <h6 class="mb-0"><i class="bi bi-router"></i> Informações do IP</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <p><strong>IP:</strong> ${ipData.ip}</p>
                <p><strong>Tipo:</strong> 
                  <span class="badge ${ipData.type === 'Interno' ? 'bg-success' : 'bg-warning'}">
                    ${ipData.type}
                  </span>
                </p>
                <p><strong>Status:</strong> 
                  <span class="badge bg-success">${ipData.status}</span>
                </p>
              </div>
              <div class="col-6">
                <p><strong>Primeiro Acesso:</strong><br>
                  <small>${ipData.firstSeen}</small>
                </p>
                <p><strong>Último Acesso:</strong><br>
                  <small>${ipData.lastSeen}</small>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <h6 class="mb-0"><i class="bi bi-graph-up"></i> Estatísticas</h6>
          </div>
          <div class="card-body">
            <p><strong>Total de Conexões:</strong> ${ipData.totalConnections}</p>
            <p><strong>Nível de Risco:</strong> 
              <span class="badge ${ipData.riskLevel === 'Alto' ? 'bg-danger' : 'bg-success'}">
                ${ipData.riskLevel}
              </span>
            </p>
          </div>
        </div>

        <div class="d-grid gap-2">
          <button type="button" 
                  class="btn btn-outline-secondary" 
                  onclick="alert('Funcionalidade de bloqueio em desenvolvimento')">
            <i class="bi bi-shield-x"></i> Bloquear IP
          </button>
        </div>

        <div class="mt-3">
          <small class="text-muted">
            <strong>💡 Dica:</strong> O botão "Ver Localização" aparecerá abaixo (template Angular)
          </small>
        </div>
      </div>
    `;
  }

  // Gerar conteúdo da localização do IP
  private generateIpLocationContent(ip: string, itemId: string): string {
    const locationData = {
      ip: ip,
      country: ip.startsWith('192.168') ? 'Brasil' : 'Estados Unidos',
      region: ip.startsWith('192.168') ? 'São Paulo' : 'California',
      city: ip.startsWith('192.168') ? 'São Paulo' : 'San Francisco',
      latitude: ip.startsWith('192.168') ? '-23.5505' : '37.7749',
      longitude: ip.startsWith('192.168') ? '-46.6333' : '-122.4194',
      timezone: ip.startsWith('192.168') ? 'America/Sao_Paulo' : 'America/Los_Angeles',
      isp: ip.startsWith('192.168') ? 'Rede Interna' : 'CloudFlare Inc.'
    };

    return `
      <div class="p-3">
        <div class="mb-3">
          <div class="alert alert-success alert-sm">
            <i class="bi bi-arrow-left-circle"></i> Terceiro nível - Lado ESQUERDO com backdrop!
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header bg-success text-white">
            <h6 class="mb-0"><i class="bi bi-geo-alt"></i> Localização Geográfica</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <p><strong>IP:</strong> ${locationData.ip}</p>
                <p><strong>País:</strong> ${locationData.country}</p>
                <p><strong>Região:</strong> ${locationData.region}</p>
                <p><strong>Cidade:</strong> ${locationData.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <h6 class="mb-0"><i class="bi bi-compass"></i> Coordenadas</h6>
          </div>
          <div class="card-body">
            <p><strong>Latitude:</strong> ${locationData.latitude}</p>
            <p><strong>Longitude:</strong> ${locationData.longitude}</p>
            <p><strong>Fuso Horário:</strong> ${locationData.timezone}</p>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <h6 class="mb-0"><i class="bi bi-wifi"></i> Provedor</h6>
          </div>
          <div class="card-body">
            <p><strong>ISP:</strong> ${locationData.isp}</p>
            <p><strong>Tipo:</strong> 
              <span class="badge ${locationData.isp === 'Rede Interna' ? 'bg-success' : 'bg-info'}">
                ${locationData.isp === 'Rede Interna' ? 'Interno' : 'Externo'}
              </span>
            </p>
          </div>
        </div>

        <div class="d-grid gap-2">
          <button class="btn btn-outline-info" 
                  onclick="alert('Mapa interativo em desenvolvimento')">
            <i class="bi bi-map"></i> Ver no Mapa
          </button>
          <button class="btn btn-outline-warning" 
                  onclick="alert('Relatório de segurança em desenvolvimento')">
            <i class="bi bi-file-earmark-text"></i> Gerar Relatório
          </button>
        </div>

        <div class="mt-3">
          <small class="text-muted">
            <strong>🎯 Exemplo:</strong> Terceiro nível do lado ESQUERDO! O backdrop protege os offcanvas anteriores.
          </small>
        </div>
      </div>
    `;
  }

  // Obter dados dos logs de segurança
  private getSecurityLogsData() {
    return [
      { time: '14:30:25', action: 'Login realizado', user: 'admin@sistema.com', ip: '192.168.1.100' },
      { time: '14:28:10', action: 'Acesso autorizado', user: 'user@sistema.com', ip: '192.168.1.101' },
      { time: '14:25:33', action: 'Tentativa de login', user: 'guest@sistema.com', ip: '192.168.1.102' },
      { time: '14:20:15', action: 'Logout executado', user: 'admin@sistema.com', ip: '192.168.1.100' },
      { time: '14:15:42', action: 'Acesso negado', user: 'unknown@test.com', ip: '10.0.0.50' }
    ];
  }
}