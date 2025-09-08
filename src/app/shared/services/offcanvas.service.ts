import { Injectable, Type, Injector, inject } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasContainerComponent } from '../components/offcanvas-container/offcanvas-container.component';

export interface OffcanvasOptions {
  panelClass?: string;
  position?: 'start' | 'end' | 'top' | 'bottom';
  backdrop?: boolean | 'static';
  closePrevious?: boolean;
  keepPreviousBackdrop?: boolean;
  nestingMode?: 'no-backdrop' | 'with-backdrop'; // Novo: tipo de aninhamento
  id?: string; // Novo: ID único para controle granular
}

@Injectable({ 
  providedIn: 'root' 
})
export class OffcanvasService {
  private offcanvas = inject(NgbOffcanvas);
  private offcanvasStack: Array<{ref: NgbOffcanvasRef, level: number, position: string, id?: string}> = [];

  open(
    component: Type<any>, 
    data?: any, 
    injector?: Injector,
    options: OffcanvasOptions = {}
  ) {
    const defaultOptions: OffcanvasOptions = {
      panelClass: 'offcanvas-class-85',
      position: 'end',
      backdrop: true,
      closePrevious: false,
      keepPreviousBackdrop: true,
      nestingMode: 'no-backdrop' // Padrão: sem backdrop para aninhados
    };

    const finalOptions = { ...defaultOptions, ...options };

    if (finalOptions.closePrevious && this.offcanvasStack.length > 0) {
      this.closeCurrent();
    }

    // Determinar backdrop baseado no modo de aninhamento
    const isNested = this.offcanvasStack.length > 0;
    let backdrop: boolean | 'static';

    if (finalOptions.nestingMode === 'with-backdrop') {
      // Modo com backdrop: cada offcanvas tem seu próprio backdrop
      backdrop = finalOptions.backdrop !== undefined ? finalOptions.backdrop : true;
    } else {
      // Modo sem backdrop: apenas o primeiro tem backdrop se especificado
      if (isNested) {
        // Para offcanvas aninhados, não usar backdrop no modo 'no-backdrop'
        backdrop = false;
      } else {
        // Para o primeiro offcanvas, usar a configuração especificada
        backdrop = finalOptions.backdrop !== undefined ? finalOptions.backdrop : true;
      }
    }
    
    // Calcular o nível do offcanvas
    const level = this.offcanvasStack.length + 1;
    
    // Adicionar classe de nível para z-index
    const levelClass = `offcanvas-level-${level}`;
    const panelClass = `${finalOptions.panelClass} ${levelClass}`;

    const offcanvasRef: NgbOffcanvasRef = this.offcanvas.open(OffcanvasContainerComponent, {
      position: finalOptions.position,
      panelClass: panelClass,
      backdrop: backdrop
    });

    if (offcanvasRef.componentInstance) {
      // Usar setTimeout para garantir que o componente foi inicializado
      setTimeout(() => {
        // Definir referências ANTES de carregar o componente
        offcanvasRef.componentInstance.offcanvasRef = offcanvasRef;
        offcanvasRef.componentInstance.offcanvasService = this;
        offcanvasRef.componentInstance.level = level;
        
        // Passar o componente, dados e injector para o container
        offcanvasRef.componentInstance.loadComponent(component, data, injector);
        
        // Adicionar à pilha com informações do nível, posição e ID
        const stackItem = {
          ref: offcanvasRef,
          level: level,
          position: finalOptions.position || 'end',
          id: finalOptions.id
        };
        this.offcanvasStack.push(stackItem);

        // Função para limpeza automática da pilha
        const cleanupOffcanvas = () => {
          // Remove o item da pilha quando o offcanvas é fechado
          const index = this.offcanvasStack.findIndex(item => item.ref === offcanvasRef);
          if (index > -1) {
            this.offcanvasStack.splice(index, 1);
          }
          
          // Atualizar z-index após remoção
          this.updateStackZIndex();
          
          // Limpar classes CSS se não há mais offcanvas
          if (this.offcanvasStack.length === 0) {
            const bodyElement = document.body;
            bodyElement.classList.remove('offcanvas-with-backdrop-mode');
            bodyElement.classList.remove('offcanvas-no-backdrop-mode');
          }
        };

        // Adicionar listeners para ambos os casos: close() e dismiss()
        offcanvasRef.result.then(
          () => {
            // Offcanvas fechado via close() (botão interno "❌ Fechar")
            cleanupOffcanvas();
          },
          () => {
            // Offcanvas fechado via dismiss() (botão X do cabeçalho)
            cleanupOffcanvas();
          }
        );

        // Adicionar classe CSS baseada no modo de aninhamento
        const bodyElement = document.body;
        if (finalOptions.nestingMode === 'with-backdrop') {
          bodyElement.classList.add('offcanvas-with-backdrop-mode');
          bodyElement.classList.remove('offcanvas-no-backdrop-mode');
        } else {
          bodyElement.classList.add('offcanvas-no-backdrop-mode');
          bodyElement.classList.remove('offcanvas-with-backdrop-mode');
        }

        // Atualizar z-index dos offcanvas anteriores se necessário
        this.updateStackZIndex();
      }, 0);
    }

    return offcanvasRef;
  }

  closeCurrent() {
    if (this.offcanvasStack.length > 0) {
      const currentOffcanvas = this.offcanvasStack.pop();
      if (currentOffcanvas) {
        currentOffcanvas.ref.close();
        // A limpeza da pilha será feita automaticamente pelo listener
      }
      this.updateStackZIndex();
    }
  }

  getPreviousOffcanvasRef(): NgbOffcanvasRef | undefined {
    const previous = this.offcanvasStack[this.offcanvasStack.length - 1];
    return previous?.ref;
  }

  closeAll() {
    // Fechar todos os offcanvas da pilha
    const offcanvasToClose = [...this.offcanvasStack]; // Cópia para evitar modificação durante iteração
    offcanvasToClose.forEach(item => {
      item.ref.close();
    });
    
    // Limpar a pilha (será feito automaticamente pelos listeners, mas garantimos aqui)
    this.offcanvasStack = [];
    
    // Limpar classes CSS quando todos os offcanvas são fechados
    const bodyElement = document.body;
    bodyElement.classList.remove('offcanvas-with-backdrop-mode');
    bodyElement.classList.remove('offcanvas-no-backdrop-mode');
  }

  getStackSize(): number {
    return this.offcanvasStack.length;
  }

  getStackInfo() {
    return this.offcanvasStack.map(item => ({
      level: item.level,
      position: item.position
    }));
  }

  private updateStackZIndex() {
    // Atualizar z-index baseado no nível na pilha
    this.offcanvasStack.forEach((item, index) => {
      const element = document.querySelector(`.offcanvas-level-${item.level}`);
      if (element) {
        (element as HTMLElement).style.zIndex = (10000 + index * 10).toString();
      }
    });
  }

  // Método para abrir offcanvas em posição específica
  openAtPosition(
    component: Type<any>,
    position: 'start' | 'end' | 'top' | 'bottom',
    data?: any,
    panelClass: string = 'offcanvas-class-70'
  ) {
    return this.open(component, data, undefined, {
      position,
      panelClass,
      keepPreviousBackdrop: true
    });
  }

  // Método para abrir offcanvas do lado oposto
  openOpposite(
    component: Type<any>,
    data?: any,
    panelClass: string = 'offcanvas-class-70'
  ) {
    // Determinar posição oposta baseada no último offcanvas
    const lastOffcanvas = this.offcanvasStack[this.offcanvasStack.length - 1];
    let oppositePosition: 'start' | 'end' = 'end';
    
    if (lastOffcanvas) {
      oppositePosition = lastOffcanvas.position === 'end' ? 'start' : 'end';
    }

    return this.openAtPosition(component, oppositePosition, data, panelClass);
  }

  // Método para abrir offcanvas aninhado SEM backdrop (lado a lado)
  openNestedNoBackdrop(
    component: Type<any>,
    data?: any,
    options: Partial<OffcanvasOptions> = {}
  ) {
    return this.open(component, data, undefined, {
      ...options,
      nestingMode: 'no-backdrop',
      keepPreviousBackdrop: true
    });
  }

  // Método para abrir offcanvas aninhado COM backdrop (camadas)
  openNestedWithBackdrop(
    component: Type<any>,
    data?: any,
    options: Partial<OffcanvasOptions> = {}
  ) {
    return this.open(component, data, undefined, {
      ...options,
      nestingMode: 'with-backdrop',
      backdrop: true
    });
  }

  // Método para abrir sequência de offcanvas sem backdrop (lado a lado)
  openSideBySide(
    component: Type<any>,
    position: 'start' | 'end',
    data?: any,
    panelClass: string = 'offcanvas-class-60'
  ) {
    return this.openNestedNoBackdrop(component, data, {
      position,
      panelClass
    });
  }

  // Método para abrir offcanvas em camadas com backdrop
  openLayered(
    component: Type<any>,
    data?: any,
    panelClass: string = 'offcanvas-class-70'
  ) {
    return this.openNestedWithBackdrop(component, data, {
      panelClass,
      position: 'end' // Sempre da direita para camadas
    });
  }

  // Método para fechar offcanvas específicos por IDs
  closeByIds(ids: string[]) {
    const toClose = this.offcanvasStack.filter(item => 
      item.id && ids.includes(item.id)
    );
    
    toClose.forEach(item => {
      item.ref.close();
      // A limpeza da pilha será feita automaticamente pelo listener
    });
    
    this.updateStackZIndex();
  }

  // Método para fechar offcanvas por ID único
  closeById(id: string) {
    this.closeByIds([id]);
  }

  // Método para verificar se um ID específico está aberto
  isOpenById(id: string): boolean {
    return this.offcanvasStack.some(item => item.id === id);
  }

  // Método para obter referência por ID
  getRefById(id: string): NgbOffcanvasRef | undefined {
    const found = this.offcanvasStack.find(item => item.id === id);
    return found?.ref;
  }
}