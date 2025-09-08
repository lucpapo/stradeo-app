import { 
  Component, 
  Type, 
  ViewChild, 
  ViewContainerRef, 
  AfterViewInit, 
  TemplateRef, 
  ChangeDetectorRef, 
  Injector 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-offcanvas-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #content let-offcanvascontainer="offcanvascontainer">
      <div class="offcanvas-level-indicator" *ngIf="level > 1">
        Nível {{ level }}
      </div>
      
      <div class="offcanvas-header pb-0">
        <h5 class="offcanvas-title">
          {{ level > 1 ? '🔗 ' : '📋 ' }}Painel Dinâmico
          <small class="text-muted ms-2" *ngIf="level > 1">(Aninhado)</small>
        </h5> 
        <button type="button" class="btn-close" (click)="offcanvascontainer.close()"></button>
      </div>
      
      <div class="offcanvas-body">
        <div class="stack-info mb-2" *ngIf="showStackInfo">
          <small class="text-muted">
            📊 Pilha: {{ stackSize }} offcanvas | Nível atual: {{ level }}
          </small>
        </div>
        <ng-container #dynamicContainer></ng-container>
      </div>
    </ng-template>

    <ng-container *ngIf="showContent">
      <ng-container *ngTemplateOutlet="content; context: { offcanvascontainer: this }"></ng-container>
    </ng-container>
  `,
  styles: [`
    /* Estilos para o offcanvas */
    .offcanvas-body {
      padding: 20px;
    }
    
    .offcanvas-header {
      border-bottom: 1px solid #dee2e6;
      padding: 1rem 1.5rem 0.5rem;
    }
    
    .offcanvas-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
    }
    
    .btn-close {
      padding: 0.25rem;
      margin: -0.125rem -0.125rem -0.125rem auto;
    }
    
    /* Classes de largura personalizadas */
    :host ::ng-deep .offcanvas-class-50 {
      width: 50% !important;
    }
    
    :host ::ng-deep .offcanvas-class-60 {
      width: 60% !important;
    }
    
    :host ::ng-deep .offcanvas-class-70 {
      width: 70% !important;
    }
    
    :host ::ng-deep .offcanvas-class-80 {
      width: 80% !important;
    }
    
    :host ::ng-deep .offcanvas-class-85 {
      width: 85% !important;
    }
    
    :host ::ng-deep .offcanvas-class-90 {
      width: 90% !important;
    }
    
    :host ::ng-deep .offcanvas-class-95 {
      width: 95% !important;
    }
    
    :host ::ng-deep .offcanvas-class-full {
      width: 100% !important;
    }
  `]
})
export class OffcanvasContainerComponent implements AfterViewInit {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) contentRef!: ViewContainerRef;
  @ViewChild('content') contentTemplate!: TemplateRef<any>;

  showContent = false;
  showStackInfo = true;
  level = 1;
  stackSize = 0;
  
  private _component!: Type<any>;
  private _data: any;
  
  offcanvasRef!: NgbOffcanvasRef;
  offcanvasService!: OffcanvasService;

  constructor(
    private cdr: ChangeDetectorRef, 
    private injector: Injector
  ) {}

  ngAfterViewInit() {
    this.showContent = true; // Exibe o conteúdo após a inicialização
    this.cdr.detectChanges(); // Marca a detecção de mudanças
    if (this._component) {
      this.loadComponent(this._component, this._data, this.injector);
    }
  }

  loadComponent(component: Type<any>, data?: any, injector?: Injector) {
    if (!data) {
      console.error('Data is required to create the component');
      return;
    }

    this._component = component;
    this._data = data;

    if (!this.contentRef) {
      console.error('contentRef is not initialized');
      return;  // Garante que o ViewChild está pronto
    }

    // Atualizar informações da pilha
    if (this.offcanvasService) {
      this.stackSize = this.offcanvasService.getStackSize();
    }

    this.contentRef.clear();  // Limpa o container atual
    const componentRef = this.contentRef.createComponent(component, { injector: injector || this.injector });  // Cria o componente dinamicamente com o Injector personalizado
    Object.assign(componentRef.instance, data);  // Passa dados para o componente
    
    // Se o componente tem o método onOffcanvasInit, chama ele
    console.log('🔍 Verificando se componente tem onOffcanvasInit:', !!componentRef.instance.onOffcanvasInit);
    console.log('🔍 offcanvasRef existe?', !!this.offcanvasRef);
    console.log('🔍 offcanvasService existe?', !!this.offcanvasService);
    
    if (componentRef.instance.onOffcanvasInit && typeof componentRef.instance.onOffcanvasInit === 'function') {
      console.log('✅ Chamando onOffcanvasInit');
      componentRef.instance.onOffcanvasInit(this.offcanvasRef, this.offcanvasService);
    } else {
      console.log('❌ onOffcanvasInit não encontrado ou não é função');
    }
  }

  close() {
    // Fecha o offcanvas atual
    this.offcanvasRef.close();
    // Mostra o offcanvas anterior, se houver
    const previousOffcanvasRef = this.offcanvasService.getPreviousOffcanvasRef();
    if (previousOffcanvasRef && previousOffcanvasRef.componentInstance) {
      previousOffcanvasRef.componentInstance.showContent = true;
      previousOffcanvasRef.componentInstance.cdr.detectChanges();
    }
  }
}