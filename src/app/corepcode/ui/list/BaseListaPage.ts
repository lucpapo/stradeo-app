import { Directive, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyInput } from '@pcode/api';
import { IGerenciadorLista } from './IGerenciadorLista';
import { IServiceBase } from '@pcode/api/IServiceBase';
import { GerenciadorListaSignal } from './GerenciadorListaSignal';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';

// Importações da nossa arquitetura
 

@Directive()
export abstract class BaseListaPage<
  TRow extends { id: TKey },
  TFilter extends object,
  TKey extends KeyInput
> implements OnInit {

  protected readonly router = inject(Router);
  protected readonly stateProvider = inject(StateProvider);

  // Inputs para configuração do StateRef
  masterKey = input<string>('');
  componentKey = input<string>('');

  // Usamos a asserção de atribuição definitiva (!) porque garantimos que será
  // inicializado em ngOnInit antes de ser usado pelo template.
  public gerenciador!: IGerenciadorLista<TRow, TFilter, TKey>;
  
  private _stateRef?: StateRef<{ pagination: { page: number; qtdPage: number } }>;

  constructor() {
    // O construtor é mantido vazio.
    // Inicializar o 'gerenciador' aqui causaria o erro, porque as dependências
    // do componente filho (como o serviço) ainda não foram injetadas.
  }

  // --- Contrato para a Classe Filha ---
  protected abstract obterServico(): IServiceBase<TRow, TFilter, TKey>;
  protected abstract obterEstadoInicialQuery(): { page: number; pageSize: number; filters: TFilter };

  /**
   * StateRef configurado automaticamente baseado nos inputs masterKey e componentKey
   */
  protected get stateRef(): StateRef<{ pagination: { page: number; qtdPage: number } }> | null {
    const masterKey = this.masterKey();
    const componentKey = this.componentKey();
    
    if (!masterKey || !componentKey) {
      return null;
    }
    
    if (!this._stateRef) {
      this._stateRef = new StateRef(this.stateProvider, masterKey, componentKey);
    }
    
    return this._stateRef;
  }

  /**
   * Valor inicial para paginação - pode ser sobrescrito nas classes filhas
   */
  protected get valorInicialPaginacao(): { page: number; qtdPage: number } {
    return { page: 0, qtdPage: 10 };
  }

  // --- Ciclo de Vida ---
  ngOnInit(): void {
    // Inicializa StateRef se configurado
    if (this.stateRef) {
      const savedState = this.stateRef.get();
      if (!savedState) {
        // Se não existe estado salvo, salva o valor inicial
        const valorInicial = this.valorInicialPaginacao;
        this.stateRef.set({ pagination: valorInicial });
      }
    }

    // Inicializamos o gestor aqui, dentro de ngOnInit.
    // Neste ponto do ciclo de vida do componente, a injeção de dependência foi concluída
    // para o componente filho, então `obterServico()` retornará uma instância de serviço válida.
    this.gerenciador = new GerenciadorListaSignal<TRow, TFilter, TKey>(
      this.obterServico(),
      this.obterEstadoInicialQuery()
    );

    // Após o gestor ser criado com um serviço válido, podemos acionar o carregamento inicial dos dados.
    this.gerenciador.load();
  }
}

