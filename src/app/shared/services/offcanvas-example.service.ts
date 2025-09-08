import { Injectable, inject, Injector } from '@angular/core';
import { OffcanvasService } from './offcanvas.service';
import { ExampleOffcanvasContentComponent } from '../components/offcanvas-container/example-offcanvas-content.component';

@Injectable({
  providedIn: 'root'
})
export class OffcanvasExampleService {
  private offcanvasService = inject(OffcanvasService);
  private injector = inject(Injector);

  /**
   * Exemplo de abertura de offcanvas seguindo o padrão do seu projeto
   * @param ativo_id - ID do ativo/item que será visualizado
   */
  getAtivoHref(ativo_id: string) {
    // this.stateProvider.initializeContext(ativo_id); // Será adicionado depois
    
    this.offcanvasService.open(
      ExampleOffcanvasContentComponent,
      {
        idOrigem: ativo_id, 
        contextState: ativo_id
      },
      this.injector,
      {
        panelClass: 'offcanvas-class-90'
      }
    );
  }

  /**
   * Exemplo de abertura com diferentes configurações
   */
  openCustomOffcanvas(
    component: any,
    data: any,
    options: {
      panelClass?: string;
      position?: 'start' | 'end' | 'top' | 'bottom';
      backdrop?: boolean;
      closePrevious?: boolean;
    } = {}
  ) {
    const {
      panelClass = 'offcanvas-class-85',
      position = 'end',
      backdrop = true,
      closePrevious = false
    } = options;

    return this.offcanvasService.open(
      component,
      data,
      this.injector,
      {
        panelClass,
        position,
        backdrop,
        closePrevious
      }
    );
  }

  /**
   * Fecha o offcanvas atual
   */
  closeCurrent() {
    this.offcanvasService.closeCurrent();
  }

  /**
   * Fecha todos os offcanvas abertos
   */
  closeAll() {
    this.offcanvasService.closeAll();
  }

  /**
   * Retorna o número de offcanvas na pilha
   */
  getStackSize(): number {
    return this.offcanvasService.getStackSize();
  }

  /**
   * Abre offcanvas em posição específica
   */
  openAtPosition(
    ativo_id: string,
    position: 'start' | 'end' | 'top' | 'bottom',
    panelClass: string = 'offcanvas-class-80'
  ) {
    return this.offcanvasService.openAtPosition(
      ExampleOffcanvasContentComponent,
      position,
      {
        idOrigem: ativo_id,
        contextState: `${ativo_id}-${position}`
      },
      panelClass
    );
  }

  /**
   * Abre offcanvas do lado oposto ao último
   */
  openOpposite(ativo_id: string, panelClass: string = 'offcanvas-class-70') {
    return this.offcanvasService.openOpposite(
      ExampleOffcanvasContentComponent,
      {
        idOrigem: ativo_id,
        contextState: `${ativo_id}-opposite`
      },
      panelClass
    );
  }

  /**
   * Exemplo de abertura de offcanvas com dados personalizados
   */
  openExampleOffcanvas(data?: any, panelClass: string = 'offcanvas-class-85') {
    const defaultData = {
      idOrigem: 'example-' + Date.now(),
      contextState: 'example-context'
    };

    return this.offcanvasService.open(
      ExampleOffcanvasContentComponent,
      { ...defaultData, ...data },
      this.injector,
      {
        panelClass
      }
    );
  }

  /**
   * Abre offcanvas com ID específico e conteúdo HTML
   */
  open(id: string, config: {
    title: string;
    content: string;
    width?: string;
    position?: 'start' | 'end';
  }) {
    const offcanvasHtml = `
      <div class="offcanvas offcanvas-${config.position || 'end'}" 
           tabindex="-1" 
           id="${id}" 
           style="width: ${config.width || '40%'};">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">${config.title}</h5>
          <button type="button" 
                  class="btn-close" 
                  onclick="window.closeOffcanvas('${id}')"
                  aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          ${config.content}
        </div>
      </div>
    `;

    // Remove offcanvas existente com mesmo ID
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    // Adiciona novo offcanvas ao DOM
    document.body.insertAdjacentHTML('beforeend', offcanvasHtml);

    // Mostra o offcanvas
    const offcanvasElement = document.getElementById(id);
    if (offcanvasElement) {
      const bsOffcanvas = new (window as any).bootstrap.Offcanvas(offcanvasElement);
      bsOffcanvas.show();

      // Remove do DOM quando fechado
      offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
        offcanvasElement.remove();
      });
    }
  }

  /**
   * Destroi offcanvas por prefixo (para limpar offcanvas associados a uma linha)
   */
  destroyByPrefix(prefix: string) {
    const offcanvasElements = document.querySelectorAll(`[id^="${prefix}"]`);
    offcanvasElements.forEach(element => {
      const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(element);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
      element.remove();
    });
  }

  /**
   * Fecha offcanvas específico por ID
   */
  closeById(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(element);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }
}