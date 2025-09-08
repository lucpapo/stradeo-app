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
      
      <!-- Template específico para logs de segurança -->
      <div *ngIf="offcanvasType === 'logs'" class="content-area">
        <div class="p-3">
          <div class="mb-3">
            <h6 class="text-muted">Item: {{ getItemName() }} (ID: {{ itemId }})</h6>
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
                <tr *ngFor="let log of getSecurityLogs()">
                  <td>{{ log.time }}</td>
                  <td>{{ log.action }}</td>
                  <td>{{ log.user }}</td>
                  <td>
                    <span class="badge bg-primary ip-clickable" 
                          style="cursor: pointer; user-select: none;" 
                          [attr.data-ip]="log.ip"
                          [attr.data-item]="itemId"
                          [title]="'Clique para ver detalhes do IP - ' + log.ip"
                          (click)="onIpClick(log.ip, itemId)">
                      📍 {{ log.ip }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-3">
            <small class="text-muted">
              <strong>💡 Dica:</strong> Clique em qualquer IP (badge azul) para abrir detalhes em offcanvas empilhado
            </small>
          </div>
        </div>
      </div>
      
      <!-- Template específico para detalhes do IP -->
      <div *ngIf="offcanvasType === 'ip-details'" class="content-area">
        <div [innerHTML]="content"></div>
        
        <!-- Botão de localização usando Angular puro -->
        <div class="mt-3 d-grid gap-2" *ngIf="ipAddress && itemId">
          <button type="button" 
                  class="btn btn-outline-primary" 
                  (click)="onLocationClick(ipAddress, itemId)"
                  title="Clique para ver localização geográfica do IP">
            <i class="bi bi-geo-alt"></i> Ver Localização Geográfica
          </button>
        </div>
      </div>
      
      <!-- Template genérico para outros tipos -->
      <div *ngIf="offcanvasType !== 'logs' && offcanvasType !== 'ip-details'" [innerHTML]="content" class="content-area" (click)="handleContentClick($event)"></div>
      
      <div class="mt-4 pt-3 border-top">
        <div class="mb-2" *ngIf="offcanvasType">
          <small class="text-muted">
            <strong>Tipo:</strong> {{ getOffcanvasTypeLabel() }}
          </small>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-secondary btn-sm" (click)="closeOffcanvas()">
            ❌ Fechar
          </button>
          <button class="btn btn-outline-info btn-sm" (click)="showStackInfo()">
            📊 Pilha: {{ getStackSize() }}
          </button>
          <button class="btn btn-outline-success btn-sm" (click)="testIpClick()" *ngIf="offcanvasType === 'logs'">
            🧪 Teste IP
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
  @Input() ipAddress?: string;
  @Input() itemId?: string;
  @Input() itemName?: string;
  @Input() securityLogs?: any[];
  @Input() callbacks?: any; // Callbacks para ações específicas
  
  private offcanvasRef?: NgbOffcanvasRef;
  private offcanvasService?: OffcanvasService;

  // Método chamado pelo container quando o componente é inicializado
  onOffcanvasInit(offcanvasRef: NgbOffcanvasRef, offcanvasService: OffcanvasService) {
    console.log('🔧 onOffcanvasInit chamado no TableOffcanvasContentComponent');
    console.log('📋 offcanvasRef recebido:', !!offcanvasRef);
    console.log('🔧 offcanvasService recebido:', !!offcanvasService);
    console.log('🔧 callbacks recebidos:', !!this.callbacks);
    console.log('🔧 callbacks.openIpDetails:', !!this.callbacks?.openIpDetails);
    console.log('🔧 callbacks.openIpLocation:', !!this.callbacks?.openIpLocation);
    console.log('🔧 itemId atual:', this.itemId);
    console.log('🔧 offcanvasType atual:', this.offcanvasType);
    console.log('🔧 securityLogs:', this.securityLogs?.length || 0, 'logs');
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

  getOffcanvasTypeLabel(): string {
    switch (this.offcanvasType) {
      case 'logs': return '🛡️ Logs de Segurança';
      case 'item': return '📋 Dados do Item';
      case 'ip-details': return '🌐 Detalhes do IP';
      case 'ip-location': return '📍 Localização do IP';
      default: return '📄 Conteúdo';
    }
  }

  handleContentClick(event: Event) {
    let target = event.target as HTMLElement;
    console.log('🔍 Clique detectado no conteúdo:', target.tagName, target.className);
    
    // Debug: mostrar o HTML atual da área de conteúdo
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      console.log('🔍 HTML da área de conteúdo:', contentArea.innerHTML.substring(0, 500));
      
      // Procurar todos os elementos com ip-clickable
      const ipElements = contentArea.querySelectorAll('.ip-clickable');
      console.log('🔍 Elementos com ip-clickable encontrados:', ipElements.length);
      ipElements.forEach((el, index) => {
        console.log(`  ${index + 1}:`, el.tagName, el.className, el.getAttribute('data-ip'));
      });
      
      // Procurar todos os elementos com data-ip
      const dataIpElements = contentArea.querySelectorAll('[data-ip]');
      console.log('🔍 Elementos com data-ip encontrados:', dataIpElements.length);
      dataIpElements.forEach((el, index) => {
        console.log(`  ${index + 1}:`, el.tagName, el.className, el.getAttribute('data-ip'));
      });
    }
    
    // Procurar o elemento clicável subindo na árvore DOM
    let clickableElement = target;
    let maxDepth = 10; // Aumentar a profundidade da busca
    
    while (clickableElement && maxDepth > 0) {
      console.log('🔍 Verificando elemento:', clickableElement.tagName, clickableElement.className);
      console.log('🔍 Tem ip-clickable?', clickableElement.classList.contains('ip-clickable'));
      console.log('🔍 Tem data-action?', clickableElement.getAttribute('data-action'));
      console.log('🔍 data-ip:', clickableElement.getAttribute('data-ip'));
      console.log('🔍 data-item:', clickableElement.getAttribute('data-item'));
      
      // PRIMEIRO: Verificar se é um botão de localização (prioridade!)
      console.log('🔍 Verificando data-action:', clickableElement.getAttribute('data-action'));
      if (clickableElement.getAttribute('data-action') === 'location') {
        const ip = clickableElement.getAttribute('data-ip');
        const itemId = clickableElement.getAttribute('data-item');
        
        console.log('🌍✅ BOTÃO LOCALIZAÇÃO ENCONTRADO:', ip, itemId);
        console.log('🌍 Elemento clicado:', clickableElement.outerHTML.substring(0, 200));
        
        if (ip && itemId && this.callbacks?.openIpLocation) {
          console.log('🌍🚀 CHAMANDO CALLBACK openIpLocation');
          console.log('🌍 IP:', ip, 'ItemId:', itemId);
          console.log('🌍 Callback function:', this.callbacks.openIpLocation.toString().substring(0, 100));
          event.preventDefault();
          event.stopPropagation();
          this.callbacks.openIpLocation(ip, itemId);
          return;
        } else {
          console.log('🌍❌ Callback não disponível ou dados faltando');
          console.log('  - ip:', ip);
          console.log('  - itemId:', itemId);
          console.log('  - openIpLocation:', !!this.callbacks?.openIpLocation);
        }
      }
      
      // SEGUNDO: Verificar se é um IP clicável (badges)
      if (clickableElement.classList.contains('ip-clickable')) {
        const ip = clickableElement.getAttribute('data-ip');
        const itemId = clickableElement.getAttribute('data-item');
        
        console.log('🎯✅ IP CLICÁVEL ENCONTRADO:', ip, itemId);
        console.log('🎯 Elemento clicado:', clickableElement.outerHTML.substring(0, 200));
        
        if (ip && itemId && this.callbacks?.openIpDetails) {
          console.log('🎯🚀 CHAMANDO CALLBACK openIpDetails');
          console.log('🎯 IP:', ip, 'ItemId:', itemId);
          console.log('🎯 Callback function:', this.callbacks.openIpDetails.toString().substring(0, 100));
          event.preventDefault();
          event.stopPropagation();
          this.callbacks.openIpDetails(ip, itemId);
          return;
        } else {
          console.log('🎯❌ Callback não disponível ou dados faltando');
          console.log('  - ip:', ip);
          console.log('  - itemId:', itemId);
          console.log('  - openIpDetails:', !!this.callbacks?.openIpDetails);
        }
      }
      
      // Também procurar nos filhos do elemento atual
      const ipChild = clickableElement.querySelector('.ip-clickable') as HTMLElement;
      if (ipChild) {
        const ip = ipChild.getAttribute('data-ip');
        const itemId = ipChild.getAttribute('data-item');
        
        console.log('✅ IP clicável encontrado nos filhos:', ip, itemId);
        
        if (ip && itemId && this.callbacks?.openIpDetails) {
          console.log('🚀 Chamando callback openIpDetails (filho)');
          event.preventDefault();
          event.stopPropagation();
          this.callbacks.openIpDetails(ip, itemId);
          return;
        }
      }
      
      const actionChild = clickableElement.querySelector('[data-action="location"]') as HTMLElement;
      if (actionChild) {
        const ip = actionChild.getAttribute('data-ip');
        const itemId = actionChild.getAttribute('data-item');
        
        console.log('✅ Botão localização encontrado nos filhos:', ip, itemId);
        
        if (ip && itemId && this.callbacks?.openIpLocation) {
          console.log('🚀 Chamando callback openIpLocation (filho)');
          event.preventDefault();
          event.stopPropagation();
          this.callbacks.openIpLocation(ip, itemId);
          return;
        }
      }
      
      // Subir um nível na árvore DOM
      clickableElement = clickableElement.parentElement as HTMLElement;
      maxDepth--;
    }
    
    console.log('❌ Nenhum elemento clicável encontrado');
  }

  testIpClick() {
    console.log('🧪 Teste de IP clicado');
    console.log('🔍 Callbacks disponíveis:', !!this.callbacks);
    console.log('🔍 openIpDetails disponível:', !!this.callbacks?.openIpDetails);
    console.log('🔍 itemId atual:', this.itemId);
    console.log('🔍 offcanvasType:', this.offcanvasType);
    console.log('🔍 Todos os dados do componente:');
    console.log('  - idOrigem:', this.idOrigem);
    console.log('  - contextState:', this.contextState);
    console.log('  - title:', this.title);
    console.log('  - itemName:', this.itemName);
    console.log('  - securityLogs:', this.securityLogs?.length || 0);
    
    if (this.callbacks?.openIpDetails) {
      console.log('🚀 Chamando openIpDetails via teste');
      try {
        this.callbacks.openIpDetails('192.168.1.100', this.itemId || '1');
        console.log('✅ Teste executado com sucesso');
      } catch (error) {
        console.error('❌ Erro no teste:', error);
        alert('Erro no teste! Verifique os logs do console.');
      }
    } else {
      console.log('❌ Callback openIpDetails não disponível');
      alert(`Callback não disponível!\n\nDetalhes:\n- callbacks: ${!!this.callbacks}\n- openIpDetails: ${!!this.callbacks?.openIpDetails}\n- itemId: ${this.itemId}\n\nVerifique os logs do console.`);
    }
  }

  // Método para clique direto no IP (template Angular)
  onIpClick(ip: string, itemId: string | undefined) {
    console.log('🎯 onIpClick chamado diretamente:', ip, itemId);
    console.log('🔍 this.callbacks existe?', !!this.callbacks);
    console.log('🔍 this.callbacks.openIpDetails existe?', !!this.callbacks?.openIpDetails);
    console.log('🔍 itemId definido?', !!itemId);
    console.log('🔍 Tipo do itemId:', typeof itemId);
    console.log('🔍 Valor do itemId:', itemId);
    
    if (this.callbacks?.openIpDetails && itemId) {
      console.log('🚀 Chamando callback openIpDetails diretamente');
      try {
        this.callbacks.openIpDetails(ip, itemId);
        console.log('✅ Callback executado com sucesso');
      } catch (error) {
        console.error('❌ Erro ao executar callback:', error);
      }
    } else {
      console.log('❌ Callback não disponível ou itemId faltando');
      console.log('  - callbacks:', this.callbacks);
      console.log('  - openIpDetails:', this.callbacks?.openIpDetails);
      console.log('  - itemId:', itemId);
    }
  }

  // Método para clique no botão de localização (template Angular)
  onLocationClick(ip: string, itemId: string | undefined) {
    console.log('🌍 onLocationClick chamado diretamente:', ip, itemId);
    console.log('🔍 this.callbacks existe?', !!this.callbacks);
    console.log('🔍 this.callbacks.openIpLocation existe?', !!this.callbacks?.openIpLocation);
    console.log('🔍 itemId definido?', !!itemId);
    console.log('🔍 Tipo do itemId:', typeof itemId);
    console.log('🔍 Valor do itemId:', itemId);
    
    if (this.callbacks?.openIpLocation && itemId) {
      console.log('🌍🚀 Chamando callback openIpLocation diretamente');
      try {
        this.callbacks.openIpLocation(ip, itemId);
        console.log('✅ Callback de localização executado com sucesso');
      } catch (error) {
        console.error('❌ Erro ao executar callback de localização:', error);
      }
    } else {
      console.log('❌ Callback de localização não disponível ou itemId faltando');
      console.log('  - callbacks:', this.callbacks);
      console.log('  - openIpLocation:', this.callbacks?.openIpLocation);
      console.log('  - itemId:', itemId);
    }
  }

  // Obter dados dos logs de segurança
  getSecurityLogs() {
    return this.securityLogs || [
      { time: '14:30:25', action: 'Login realizado', user: 'admin@sistema.com', ip: '192.168.1.100' },
      { time: '14:28:10', action: 'Acesso autorizado', user: 'user@sistema.com', ip: '192.168.1.101' },
      { time: '14:25:33', action: 'Tentativa de login', user: 'guest@sistema.com', ip: '192.168.1.102' },
      { time: '14:20:15', action: 'Logout executado', user: 'admin@sistema.com', ip: '192.168.1.100' },
      { time: '14:15:42', action: 'Acesso negado', user: 'unknown@test.com', ip: '10.0.0.50' }
    ];
  }

  // Obter nome do item (usar propriedade ou extrair do título)
  getItemName(): string {
    if (this.itemName) {
      return this.itemName;
    }
    if (this.title) {
      const match = this.title.match(/Logs de Segurança - (.+)/);
      return match ? match[1] : 'Item';
    }
    return 'Item';
  }
}