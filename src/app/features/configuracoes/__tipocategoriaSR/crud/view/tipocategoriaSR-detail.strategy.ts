import { inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
import { AbstractDetailStrategy } from '@pcode/ui/base-detail';

import { StateProvider } from '@pcode/store/state-provider';
import { StateRef } from '@pcode/store/state-ref';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { ToastService } from '@pcode/toast/toast.service';

// Interface para o estado do item selecionado (deve coincidir com a lista)
interface SelectedItemState {
  selectedItem: TipoCategoria | null;
  lastAction: 'novo' | 'ver' | 'editar' | null;
}

interface ExtendedPaginationState {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  selected: SelectedItemState;
}

/**
 * Estratégia específica para detalhes de Tipo Categoria Sem Rota
 * Implementa as regras de negócio específicas desta entidade
 * Suporta obtenção do ID tanto via rota quanto via seleção de lista
 * Para tipo "Sem Rota", usa emits em vez de navegação por router
 */
export class TipocategoriaSRDetailStrategy extends AbstractDetailStrategy<TipoCategoria, number> {

  private readonly datePipe = inject(DatePipe);
  private readonly stateProvider = inject(StateProvider);
  private readonly toast = inject(ToastService);

  // Desabilita o toast padrão da classe base
  public readonly showDefaultSuccessToast = false;

  // EventEmitters para comunicação com o container (tipo "Sem Rota")
  public onNavigateToList = new EventEmitter<void>();
  public onNavigateToEdit = new EventEmitter<number>();
  public onNavigateToView = new EventEmitter<number>();

  constructor(
    readonly service: TipoCategoriaService,
    readonly router: Router
  ) {
    super();
  }

  /**
   * Define os controles do formulário específicos para Tipo Categoria Sem Rota
   */
  createFormControls(entity?: TipoCategoria): { [key: string]: any } {
    return {
      id: [{ value: entity?.id || null, disabled: true }],
      descricao: [entity?.descricao || '', [Validators.required, Validators.maxLength(100)]],
      status_delecao: [entity?.status_delecao ?? 0, Validators.required],
      data_cadastro: [{ value: entity?.data_cadastro || '', disabled: true }],
      usuario_cadastro: [{ value: entity?.usuario_cadastro || '', disabled: true }],
      data_atualizacao: [{ value: entity?.data_atualizacao || '', disabled: true }],
      usuario_atualizacao: [{ value: entity?.usuario_atualizacao || '', disabled: true }],
    };
  }



  /**
   * Retorna a rota base para navegação
   */
  getBaseRoute(): string {
    return '/configuracoes/tipocategoriaSR';
  }

  /**
   * Processa os dados após carregar da API
   * Formata as datas de auditoria usando DatePipe
   */
  override processLoadedData(data: TipoCategoria): TipoCategoria {
    if (!data) return data;

    return {
      ...data,
      data_cadastro: this.datePipe.transform(data.data_cadastro, 'dd/MM/yyyy HH:mm:ss') || data.data_cadastro,
      data_atualizacao: this.datePipe.transform(data.data_atualizacao, 'dd/MM/yyyy HH:mm:ss') || data.data_atualizacao
    };
  }

  /**
   * Labels dos campos para o ValidationIndicator
   */
  getFieldLabels(): { [key: string]: string } {
    return {
      descricao: 'Descrição',
      status_delecao: 'Status'
    };
  }

  /**
   * Retorna o título da entidade para mensagens
   */
  getEntityTitle(): string {
    return 'Tipo de Categoria Sem Rota';
  }

  /**
   * Obtém o ID da entidade para tipo "Sem Rota":
   * Para este tipo, ignora completamente a rota e busca apenas no StateProvider
   */
  getEntityId(): number | null {
    console.log('🔍 [DEBUG] getEntityId() chamado para tipo Sem Rota');

    // Debug: Lista todas as chaves disponíveis no StateProvider
    this.debugStateProvider();

    // Para tipo "Sem Rota", busca apenas no StateProvider
    console.log('🔍 [DEBUG] Buscando ID no StateProvider (tipo Sem Rota)...');
    const selectedItem = this.getSelectedItemFromState();
    console.log('🔍 [DEBUG] selectedItem do estado:', selectedItem);

    if (selectedItem?.selectedItem?.id) {
      console.log('📋 ID obtido do StateProvider:', selectedItem.selectedItem.id);
      return selectedItem.selectedItem.id;
    }

    console.log('❌ Nenhum ID encontrado no StateProvider');
    return null;
  }

  /**
   * Método de debug para listar todas as chaves disponíveis no StateProvider
   */
  private debugStateProvider(): void {
    try {
      // Tenta acessar o estado completo do shell
      const shellStateRef = new StateRef<any>(
        this.stateProvider,
        'ui-TipocategoriaShellComponent',
        '' // String vazia em vez de null
      );

      const shellState = shellStateRef.get();
      console.log('🔍 [DEBUG] Estado completo do shell:', shellState);

      if (shellState) {
        console.log('🔍 [DEBUG] Chaves disponíveis no shell:', Object.keys(shellState));
      }
    } catch (error) {
      console.warn('❌ Erro ao fazer debug do StateProvider:', error);
    }
  }

  /**
   * Obtém a entidade selecionada do StateProvider
   * Usado quando não há rota mas há seleção de lista
   */
  getEntityFromState(): TipoCategoria | null {
    const selectedItem = this.getSelectedItemFromState();
    if (selectedItem?.selectedItem) {
      console.log('📋 Entidade obtida do StateProvider:', selectedItem.selectedItem);
      return selectedItem.selectedItem;
    }
    return null;
  }

  /**
   * Obtém o item selecionado do estado da lista
   */
  private getSelectedItemFromState(): SelectedItemState | null {
    try {
      console.log('🔍 [DEBUG] getSelectedItemFromState() chamado');

      // Método 1: Tenta acessar diretamente a chave da lista
      const listStateRef = new StateRef<ExtendedPaginationState>(
        this.stateProvider,
        'ui-TipocategoriaShellComponent', // Shell key
        'TipocategoriaSRListPage#main'    // Component key direta
      );

      let state = listStateRef.get();
      console.log('🔍 [DEBUG] Método 1 - estado da lista obtido:', state);

      if (state?.selected?.selectedItem) {
        console.log('✅ [DEBUG] selectedItem encontrado no Método 1:', state.selected.selectedItem);
        console.log('✅ [DEBUG] ID do selectedItem:', state.selected.selectedItem.id);
        return state.selected;
      }

      // Método 2: Tenta acessar usando apenas a shell key (caso o estado esteja no root)
      console.log('🔍 [DEBUG] Método 1 falhou, tentando Método 2...');
      const shellStateRef = new StateRef<any>(
        this.stateProvider,
        'ui-TipocategoriaShellComponent',
        '' // String vazia em vez de null
      );

      const shellState = shellStateRef.get();
      console.log('🔍 [DEBUG] Método 2 - estado do shell obtido:', shellState);

      // Procura pela chave TipocategoriaSRListPage#main no estado do shell
      if (shellState && shellState['TipocategoriaSRListPage#main']) {
        const listData = shellState['TipocategoriaSRListPage#main'];
        console.log('🔍 [DEBUG] Método 2 - dados da lista encontrados:', listData);

        if (listData.selected?.selectedItem) {
          console.log('✅ [DEBUG] selectedItem encontrado no Método 2:', listData.selected.selectedItem);
          console.log('✅ [DEBUG] ID do selectedItem:', listData.selected.selectedItem.id);
          return listData.selected;
        }
      }

      console.log('❌ [DEBUG] Nenhum método conseguiu encontrar o selectedItem');
      return null;

    } catch (error) {
      console.warn('❌ Erro ao obter item selecionado do estado:', error);
      return null;
    }
  }

  /**
   * Retorna as chaves do StateProvider - incluindo a chave de paginação estendida
   */
  getStateKeys(): { shellKey: string; detailKey: string; paginationKey: string; } {
    return {
      shellKey: 'ui-TipocategoriaShellComponent',
      detailKey: 'TipocategoriaSRDetailPage#main',
      paginationKey: 'TipocategoriaSRListPage#main' // Usa a mesma chave da lista
    };
  }

  /**
   * Override: Navega para a lista usando emit em vez de router
   * Para tipo "Sem Rota", emite evento para o container
   */
  override navigateToList(): void {
    console.log('🔄 Navegando para lista via emit (Sem Rota)');
    this.onNavigateToList.emit();
  }

  /**
   * Override: Navega para edição usando emit em vez de router
   * Para tipo "Sem Rota", emite evento para o container
   */
  override navigateToEdit(id: number): void {
    console.log('🔄 Navegando para edição via emit (Sem Rota):', id);
    this.onNavigateToEdit.emit(id);
  }

  /**
   * Override: Navega para visualização usando emit em vez de router
   * Para tipo "Sem Rota", emite evento para o container
   */
  override navigateToView(id: number): void {
    console.log('🔄 Navegando para visualização via emit (Sem Rota):', id);
    this.onNavigateToView.emit(id);
  }

  /**
   * Override: Ações pós-salvamento customizadas para tipo "Sem Rota"
   * Mostra toast de sucesso personalizado
   */
  override afterSave(savedEntity: TipoCategoria, mode: 'create' | 'edit'): void {
    const action = mode === 'create' ? 'criado' : 'atualizado';
    this.toast.success(
      `Tipo de Categoria ${action} com sucesso!`,
      { title: 'Sucesso' }
    );
  }
}