import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasExampleService } from '../../services/offcanvas-example.service';

@Component({
  selector: 'app-offcanvas-usage-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h3>🚀 Sistema de Offcanvas - Transparência Corrigida</h3>
      
      <div class="alert alert-success mb-4">
        <h5 class="alert-heading">✅ Problema Resolvido!</h5>
        <p class="mb-0">O problema de transparência no background foi corrigido. Agora todos os offcanvas têm fundo branco sólido e aparecem corretamente sobre o backdrop.</p>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Ações Básicas</h5>
            </div>
            <div class="card-body">
              <button 
                class="btn btn-primary me-2 mb-2" 
                (click)="openBasicOffcanvas()">
                Abrir Offcanvas Básico
              </button>
              
              <button 
                class="btn btn-success me-2 mb-2" 
                (click)="openWithCustomData()">
                Abrir com Dados Personalizados
              </button>
              
              <button 
                class="btn btn-info me-2 mb-2" 
                (click)="openSmallOffcanvas()">
                Abrir Pequeno (60%)
              </button>
              
              <button 
                class="btn btn-warning me-2 mb-2" 
                (click)="openFullOffcanvas()">
                Abrir Tela Cheia
              </button>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Controles da Pilha</h5>
            </div>
            <div class="card-body">
              <p>Offcanvas na pilha: <strong>{{ stackSize }}</strong></p>
              
              <button 
                class="btn btn-secondary me-2 mb-2" 
                (click)="closeCurrent()"
                [disabled]="stackSize === 0">
                Fechar Atual
              </button>
              
              <button 
                class="btn btn-danger me-2 mb-2" 
                (click)="closeAll()"
                [disabled]="stackSize === 0">
                Fechar Todos
              </button>
              
              <button 
                class="btn btn-outline-primary me-2 mb-2" 
                (click)="updateStackSize()">
                Atualizar Contador
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5>Simulação de Lista de Itens</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Tipo</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of mockItems">
                      <td>{{ item.id }}</td>
                      <td>{{ item.nome }}</td>
                      <td>{{ item.tipo }}</td>
                      <td>
                        <button 
                          class="btn btn-sm btn-outline-primary me-1"
                          (click)="visualizarItem(item.id, item.nome)">
                          Visualizar
                        </button>
                        <button 
                          class="btn btn-sm btn-outline-secondary"
                          (click)="editarItem(item.id, item.nome)">
                          Editar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
  `]
})
export class OffcanvasUsageExampleComponent {
  private offcanvasExampleService = inject(OffcanvasExampleService);
  
  stackSize = 0;
  
  mockItems = [
    { id: 'ATIVO001', nome: 'Equipamento Industrial A', tipo: 'Máquina' },
    { id: 'ATIVO002', nome: 'Veículo Corporativo B', tipo: 'Transporte' },
    { id: 'ATIVO003', nome: 'Computador Desktop C', tipo: 'TI' },
    { id: 'ATIVO004', nome: 'Impressora Multifuncional D', tipo: 'Escritório' },
    { id: 'ATIVO005', nome: 'Sistema de Ar Condicionado E', tipo: 'Infraestrutura' }
  ];

  constructor() {
    this.updateStackSize();
  }

  openBasicOffcanvas() {
    this.offcanvasExampleService.getAtivoHref('EXEMPLO001');
    this.updateStackSize();
  }

  openWithCustomData() {
    this.offcanvasExampleService.getAtivoHref('CUSTOM001');
    this.updateStackSize();
  }

  openSmallOffcanvas() {
    this.offcanvasExampleService.getAtivoHref('SMALL001');
    this.updateStackSize();
  }

  openFullOffcanvas() {
    this.offcanvasExampleService.getAtivoHref('FULL001');
    this.updateStackSize();
  }

  visualizarItem(id: string, nome: string) {
    this.offcanvasExampleService.getAtivoHref(id);
    this.updateStackSize();
  }

  editarItem(id: string, nome: string) {
    this.offcanvasExampleService.getAtivoHref(id);
    this.updateStackSize();
  }

  closeCurrent() {
    this.offcanvasExampleService.closeCurrent();
    setTimeout(() => this.updateStackSize(), 100);
  }

  closeAll() {
    this.offcanvasExampleService.closeAll();
    setTimeout(() => this.updateStackSize(), 100);
  }

  updateStackSize() {
    this.stackSize = this.offcanvasExampleService.getStackSize();
  }
}