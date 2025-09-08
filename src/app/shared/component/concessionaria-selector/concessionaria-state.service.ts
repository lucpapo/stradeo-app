// concessionaria-state.service.ts
import { Injectable, inject } from '@angular/core';
import { StateProvider } from '../../../corepcode/store/state-provider';
import { StateRef } from '../../../corepcode/store/state-ref';
import { ConcessaoService, Concessionaria } from '../../../corestradeo/services/concessao.service';
import { Observable, BehaviorSubject } from 'rxjs';

export interface ConcessionariaState {
  id: number;
  nome: string;
  cnpj: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConcessionariaStateService {
  private readonly stateProvider = inject(StateProvider);
  private readonly concessaoService = inject(ConcessaoService);

  // Chaves do state
  private readonly masterKey = 'ui-MasterAppComponent';
  private readonly componentKey = 'ConcessionariaSelector#main';

  // StateRef para gerenciar o estado da concessionária
  private concessionariaStateRef: StateRef<ConcessionariaState>;

  // Subject para notificar mudanças
  private concessionariaSubject = new BehaviorSubject<ConcessionariaState | null>(null);
  public concessionaria$ = this.concessionariaSubject.asObservable();

  constructor() {
    // Aguarda o root estar disponível antes de inicializar
    this.aguardarRootEInicializar();
  }

  private aguardarRootEInicializar(): void {
    // Verifica se o root já existe
    const checkRoot = () => {
      try {
        // Tenta garantir que o root existe
        this.stateProvider.ensureRoot(this.masterKey);

        // Cria o StateRef agora que o root existe
        this.concessionariaStateRef = new StateRef<ConcessionariaState>(
          this.stateProvider,
          this.masterKey,
          this.componentKey
        );

        console.log('✅ Root state disponível, inicializando concessionária...');
        this.inicializar();

      } catch (error) {
        console.log('⏳ Aguardando root state estar disponível...');
        // Tenta novamente após um pequeno delay
        setTimeout(checkRoot, 100);
      }
    };

    checkRoot();
  }

  private inicializar(): void {
    try {
      // Tenta restaurar do state primeiro
      const savedState = this.concessionariaStateRef.get();
      if (savedState) {
        console.log('🔄 Concessionária restaurada do estado:', savedState);
        this.concessionariaSubject.next(savedState);

        // Também atualiza o serviço legado para compatibilidade
        this.concessaoService.setConcessionariaAtual({
          id: savedState.id,
          nome: savedState.nome,
          cnpj: savedState.cnpj
        });
        return;
      }
    } catch (error) {
      console.log('⚠️ Erro ao restaurar estado, carregando primeira concessionária...');
    }

    // Se não há estado salvo, carrega a primeira concessionária disponível
    console.log('🔍 Nenhuma concessionária no estado, carregando a primeira...');
    this.concessaoService.getConcessionarias().subscribe({
      next: (concessionarias) => {
        if (concessionarias.length > 0) {
          const primeira = concessionarias[0];
          const state: ConcessionariaState = {
            id: primeira.id,
            nome: primeira.nome,
            cnpj: primeira.cnpj
          };
          this.setConcessionaria(state);
          console.log('✅ Primeira concessionária carregada e salva no estado:', state);
        } else {
          console.log('⚠️ Nenhuma concessionária disponível');
          // Se não há concessionárias, mantém null para mostrar "Carregando..."
          this.concessionariaSubject.next(null);
        }
      },
      error: (error) => {
        console.error('❌ Erro ao carregar concessionárias:', error);
        // Em caso de erro, mantém null
        this.concessionariaSubject.next(null);
      }
    });
  }

  /**
   * Define a concessionária atual e salva no state
   */
  setConcessionaria(concessionaria: ConcessionariaState): void {
    const concessionariaAnterior = this.concessionariaSubject.value;
    const mudouConcessionaria = !concessionariaAnterior || concessionariaAnterior.id !== concessionaria.id;

    // Salva no StateProvider (com proteção contra erro)
    try {
      if (this.concessionariaStateRef) {
        this.concessionariaStateRef.set(concessionaria);
      }
    } catch (error) {
      console.log('⚠️ Erro ao salvar no estado, continuando sem persistência...');
    }

    // Notifica subscribers
    this.concessionariaSubject.next(concessionaria);

    // Também atualiza o serviço legado para compatibilidade
    this.concessaoService.setConcessionariaAtual({
      id: concessionaria.id,
      nome: concessionaria.nome,
      cnpj: concessionaria.cnpj
    });

    console.log('💾 Concessionária salva no estado:', concessionaria);

    // Se mudou a concessionária, dispara evento para refresh da tela
    if (mudouConcessionaria) {
      console.log('🔄 Concessionária alterada, disparando RELOAD da tela...');
      // Dispara imediatamente para reload mais rápido
      window.dispatchEvent(new CustomEvent('concessionaria-changed', {
        detail: concessionaria
      }));
    }
  }  /**

   * Retorna a concessionária atual do state
   */
  getConcessionaria(): ConcessionariaState | null {
    try {
      return this.concessionariaStateRef ? this.concessionariaStateRef.get() : null;
    } catch (error) {
      console.log('⚠️ Erro ao obter estado, retornando valor atual...');
      return this.concessionariaSubject.value;
    }
  }

  /**
   * Retorna a concessionária atual de forma síncrona
   */
  getConcessionariaSync(): ConcessionariaState | null {
    return this.concessionariaSubject.value;
  }

  /**
   * Carrega todas as concessionárias disponíveis
   */
  getConcessionarias(): Observable<Concessionaria[]> {
    return this.concessaoService.getConcessionarias();
  }

  /**
   * Limpa o estado da concessionária
   */
  clearConcessionaria(): void {
    try {
      this.stateProvider.removeChild(this.masterKey, this.componentKey);
    } catch (error) {
      console.log('⚠️ Erro ao limpar estado, continuando...');
    }
    this.concessionariaSubject.next(null);
    console.log('🧹 Estado da concessionária limpo');
  }

  /**
   * Verifica se há uma concessionária selecionada
   */
  hasConcessionaria(): boolean {
    return this.getConcessionaria() !== null;
  }

  /**
   * Método utilitário para componentes escutarem mudanças de concessionária
   * e reagirem com refresh de dados
   */
  onConcessionariaChange(callback: (concessionaria: ConcessionariaState) => void): void {
    this.concessionaria$.subscribe(concessionaria => {
      if (concessionaria) {
        callback(concessionaria);
      }
    });
  }

  /**
   * Força um refresh da concessionária atual (útil para recarregar dados)
   */
  refreshConcessionariaAtual(): void {
    const atual = this.getConcessionaria();
    if (atual) {
      console.log('🔄 Forçando refresh da concessionária atual');
      this.concessionariaSubject.next(atual);
      window.dispatchEvent(new CustomEvent('concessionaria-refresh', {
        detail: atual
      }));
    }
  }

  /**
   * Força um refresh completo da tela atual
   */
  forcePageRefresh(): void {
    const atual = this.getConcessionaria();
    if (atual) {
      console.log('🔄 Forçando refresh completo da página');
      // Dispara o mesmo evento que é usado quando a concessionária muda
      window.dispatchEvent(new CustomEvent('concessionaria-changed', {
        detail: atual
      }));
    }
  }

  /**
   * Força um reload hard da página (recarrega completamente)
   */
  forceHardReload(): void {
    console.log('🔄 Forçando HARD RELOAD da página');
    window.location.reload();
  }

  /**
   * Inicialização manual - pode ser chamada pelo AppComponent após garantir que o root existe
   */
  inicializarManual(): void {
    if (!this.concessionariaStateRef) {
      try {
        this.concessionariaStateRef = new StateRef<ConcessionariaState>(
          this.stateProvider,
          this.masterKey,
          this.componentKey
        );
        console.log('✅ StateRef criado manualmente');
      } catch (error) {
        console.log('⚠️ Erro ao criar StateRef manualmente:', error);
      }
    }

    // Se ainda não há concessionária carregada, tenta carregar
    if (!this.concessionariaSubject.value) {
      this.inicializar();
    }
  }
}