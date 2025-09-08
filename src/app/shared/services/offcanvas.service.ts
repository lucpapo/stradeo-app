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

    console.log('🎭 Configurando backdrop:', {
      isNested,
      nestingMode: finalOptions.nestingMode,
      backdropsetting: finalOptions.backdrop,
      stackSize: this.offcanvasStack.length
    });

    if (finalOptions.nestingMode === 'with-backdrop') {
      // Modo com backdrop: cada offcanvas tem seu próprio backdrop
      backdrop = finalOptions.backdrop !== undefined ? finalOptions.backdrop : true;
      console.log('✅ Modo with-backdrop: backdrop =', backdrop);
    } else {
      // Modo sem backdrop: apenas o primeiro tem backdrop se especificado
      if (isNested) {
        // Para offcanvas aninhados, não usar backdrop no modo 'no-backdrop'
        backdrop = false;
        console.log('❌ Modo no-backdrop (aninhado): backdrop = false');
      } else {
        // Para o primeiro offcanvas, usar a configuração especificada
        backdrop = finalOptions.backdrop !== undefined ? finalOptions.backdrop : true;
        console.log('✅ Modo no-backdrop (primeiro): backdrop =', backdrop);
      }
    }
    
    // Calcular o nível do offcanvas
    const level = this.offcanvasStack.length + 1;
    
    // Adicionar classe de nível para z-index
    const levelClass = `offcanvas-level-${level}`;
    const panelClass = `${finalOptions.panelClass} ${levelClass}`;

    console.log('🚀 Abrindo offcanvas com configurações:', {
      position: finalOptions.position,
      panelClass: panelClass,
      backdrop: backdrop,
      level: level,
      nestingMode: finalOptions.nestingMode,
      id: finalOptions.id
    });

    const offcanvasRef: NgbOffcanvasRef = this.offcanvas.open(OffcanvasContainerComponent, {
      position: finalOptions.position,
      panelClass: panelClass,
      backdrop: backdrop
    });

    console.log('✅ Offcanvas aberto:', !!offcanvasRef);

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

        // CORREÇÃO: Forçar backdrop para offcanvas empilhados
        if (finalOptions.nestingMode === 'with-backdrop' && backdrop === true) {
          setTimeout(() => {
            this.ensureBackdropForNestedOffcanvas(level);
            this.fixBackdropZIndex(level);
          }, 100);
          
          // Verificação adicional após um tempo maior
          setTimeout(() => {
            this.fixBackdropZIndex(level);
          }, 300);
        }

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
        
        // Forçar correção de z-index e posição após renderização
        setTimeout(() => {
          this.forceCorrectZIndex();
          this.forceCorrectPosition(level, finalOptions.position || 'end');
        }, 50);
        
        // Verificação adicional após mais tempo
        setTimeout(() => {
          this.forceCorrectPosition(level, finalOptions.position || 'end');
        }, 200);
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

  // Método para garantir backdrop em offcanvas empilhados
  private ensureBackdropForNestedOffcanvas(level: number) {
    console.log('🎭 Verificando backdrop para nível:', level);
    
    // Procurar pelo offcanvas atual
    const offcanvasElement = document.querySelector(`.offcanvas-level-${level}`);
    if (!offcanvasElement) {
      console.log('❌ Offcanvas não encontrado para nível:', level);
      return;
    }

    // Verificar se já existe backdrop para este nível
    const existingBackdrop = document.querySelector(`.backdrop-level-${level}`);
    if (!existingBackdrop && level > 1) {
      console.log('🎭 Criando backdrop manual para nível:', level);
      
      // Calcular z-index correto: entre o offcanvas anterior e o atual
      const previousOffcanvasZIndex = 10000 + (level - 2) * 20; // Nível anterior
      const currentOffcanvasZIndex = 10000 + (level - 1) * 20;  // Nível atual
      const backdropZIndex = previousOffcanvasZIndex + 15; // Entre os dois
      
      console.log('🎭 Z-indexes:', {
        previous: previousOffcanvasZIndex,
        backdrop: backdropZIndex,
        current: currentOffcanvasZIndex
      });
      
      // Criar backdrop manualmente
      const backdrop = document.createElement('div');
      backdrop.className = `offcanvas-backdrop fade show backdrop-level-${level}`;
      backdrop.style.zIndex = backdropZIndex.toString();
      backdrop.style.backgroundColor = `rgba(0, 0, 0, ${0.5 - (level - 2) * 0.1})`;
      backdrop.style.position = 'fixed';
      backdrop.style.top = '0';
      backdrop.style.left = '0';
      backdrop.style.width = '100vw';
      backdrop.style.height = '100vh';
      
      // Adicionar ao DOM
      document.body.appendChild(backdrop);
      
      // Remover backdrop quando offcanvas for fechado
      const offcanvasRef = this.offcanvasStack.find(item => item.level === level)?.ref;
      if (offcanvasRef) {
        offcanvasRef.result.finally(() => {
          if (backdrop.parentNode) {
            backdrop.parentNode.removeChild(backdrop);
            console.log('🗑️ Backdrop manual removido para nível:', level);
          }
        });
      }
      
      console.log('✅ Backdrop criado manualmente com z-index:', backdropZIndex);
    } else {
      console.log('ℹ️ Backdrop já existe ou é nível 1');
    }
  }

  // Método para corrigir z-index de backdrops existentes
  private fixBackdropZIndex(level: number) {
    console.log('🔧 Corrigindo z-index dos backdrops para nível:', level);
    
    // Encontrar todos os backdrops
    const backdrops = document.querySelectorAll('.offcanvas-backdrop');
    console.log('🔍 Backdrops encontrados:', backdrops.length);
    
    backdrops.forEach((backdrop, index) => {
      const backdropElement = backdrop as HTMLElement;
      const currentZIndex = parseInt(backdropElement.style.zIndex || '0');
      
      console.log(`🎭 Backdrop ${index + 1}:`, {
        currentZIndex,
        classList: backdropElement.className
      });
      
      // Se é o backdrop do offcanvas atual (nível > 1)
      if (index === backdrops.length - 1 && level > 1) {
        // Calcular z-index correto para ficar entre os offcanvas
        const previousOffcanvasZIndex = 10000 + (level - 2) * 20;
        const newBackdropZIndex = previousOffcanvasZIndex + 15;
        
        console.log('🔧 Ajustando backdrop:', {
          level,
          previousOffcanvasZIndex,
          newBackdropZIndex,
          oldZIndex: currentZIndex
        });
        
        backdropElement.style.zIndex = newBackdropZIndex.toString();
        backdropElement.style.backgroundColor = `rgba(0, 0, 0, ${0.5 - (level - 2) * 0.1})`;
        
        // Adicionar classe para identificação
        backdropElement.classList.add(`backdrop-level-${level}`);
        
        console.log('✅ Z-index do backdrop ajustado para:', newBackdropZIndex);
      }
    });
    
    // Verificar z-index dos offcanvas também
    const offcanvasElements = document.querySelectorAll('.offcanvas');
    console.log('🔍 Offcanvas encontrados:', offcanvasElements.length);
    
    offcanvasElements.forEach((offcanvas, index) => {
      const offcanvasElement = offcanvas as HTMLElement;
      const currentZIndex = parseInt(offcanvasElement.style.zIndex || '0');
      
      console.log(`📋 Offcanvas ${index + 1}:`, {
        currentZIndex,
        classList: offcanvasElement.className
      });
    });
  }

  // Método para forçar z-index correto de todos os elementos
  private forceCorrectZIndex() {
    console.log('⚡ Forçando correção de z-index');
    
    // Corrigir z-index dos offcanvas
    this.offcanvasStack.forEach((item, index) => {
      const offcanvasElement = document.querySelector(`.offcanvas-level-${item.level}`) as HTMLElement;
      if (offcanvasElement) {
        const correctZIndex = 10000 + index * 20;
        offcanvasElement.style.zIndex = correctZIndex.toString();
        console.log(`📋 Offcanvas nível ${item.level} (${item.position}): z-index = ${correctZIndex}`);
      }
    });
    
    // Corrigir z-index dos backdrops
    const backdrops = document.querySelectorAll('.offcanvas-backdrop');
    backdrops.forEach((backdrop, index) => {
      const backdropElement = backdrop as HTMLElement;
      
      if (index === 0) {
        // Primeiro backdrop (do primeiro offcanvas)
        backdropElement.style.zIndex = '9990';
        console.log('🎭 Primeiro backdrop: z-index = 9990');
      } else {
        // Backdrops dos offcanvas empilhados
        const targetLevel = index + 1;
        const previousOffcanvasZIndex = 10000 + (targetLevel - 2) * 20;
        const backdropZIndex = previousOffcanvasZIndex + 15;
        
        backdropElement.style.zIndex = backdropZIndex.toString();
        backdropElement.style.backgroundColor = `rgba(0, 0, 0, ${0.5 - (targetLevel - 2) * 0.1})`;
        backdropElement.classList.add(`backdrop-level-${targetLevel}`);
        
        console.log(`🎭 Backdrop ${index + 1} (nível ${targetLevel}): z-index = ${backdropZIndex}`);
      }
    });
    
    console.log('✅ Correção de z-index concluída');
  }

  // Método para forçar posição correta do offcanvas
  private forceCorrectPosition(level: number, position: string) {
    console.log('📍 Forçando posição correta para nível:', level, 'posição:', position);
    
    const offcanvasElement = document.querySelector(`.offcanvas-level-${level}`) as HTMLElement;
    if (!offcanvasElement) {
      console.log('❌ Offcanvas não encontrado para nível:', level);
      return;
    }

    console.log('🔍 Elemento encontrado:', offcanvasElement.className);
    console.log('🔍 Posição atual:', {
      left: offcanvasElement.style.left,
      right: offcanvasElement.style.right,
      transform: offcanvasElement.style.transform
    });

    if (position === 'start') {
      console.log('⬅️ Forçando posição ESQUERDA');
      
      // Remover classes de posição direita
      offcanvasElement.classList.remove('offcanvas-end');
      
      // Adicionar classe de posição esquerda
      offcanvasElement.classList.add('offcanvas-start');
      
      // Forçar estilos CSS
      offcanvasElement.style.left = '0';
      offcanvasElement.style.right = 'auto';
      offcanvasElement.style.transform = 'translateX(0)';
      
      console.log('✅ Posição ESQUERDA aplicada');
    } else {
      console.log('➡️ Mantendo posição DIREITA');
      
      // Garantir posição direita
      offcanvasElement.classList.remove('offcanvas-start');
      offcanvasElement.classList.add('offcanvas-end');
      
      offcanvasElement.style.right = '0';
      offcanvasElement.style.left = 'auto';
      offcanvasElement.style.transform = 'translateX(0)';
      
      console.log('✅ Posição DIREITA mantida');
    }

    console.log('🔍 Posição final:', {
      left: offcanvasElement.style.left,
      right: offcanvasElement.style.right,
      transform: offcanvasElement.style.transform,
      classList: offcanvasElement.className
    });
  }
}