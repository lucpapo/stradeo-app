import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseDetailPage, DetailStrategy } from '@pcode/ui/base-detail';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { FullScreenLoadingComponent } from '@pcodeshared/components/full-screen-loading/full-screen-loading.component';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { StateRef } from '@pcode/store/state-ref';

import { CompactErrorComponent } from '@pcodeshared/components/compact-error/compact-error.component';
import { AuditComponent } from '@pcodeshared/components/audit';
import { TipocategoriaSRDetailStrategy } from './tipocategoriaSR-detail.strategy';

@Component({
  standalone: true,
  selector: 'app-tipocategoriaSR-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ValidationIndicatorComponent, FullScreenLoadingComponent, CompactErrorComponent, AuditComponent],
  templateUrl: './tipocategoriaSR-detail.page.html',
  styleUrls: ['./tipocategoriaSR-detail.page.scss'],
  providers: [DatePipe]
})
export class TipocategoriaSRDetailPage extends BaseDetailPage<TipoCategoria, number> implements OnInit {

  // Dependências específicas
  private readonly service = inject(TipoCategoriaService);

  // Eventos para comunicação com o container (tipo "Sem Rota")
  @Output() navigateToList = new EventEmitter<void>();
  @Output() navigateToEdit = new EventEmitter<number>();
  @Output() navigateToView = new EventEmitter<number>();

  // Estratégia específica
  private strategy = new TipocategoriaSRDetailStrategy(
    this.service,
    this.router
  );

  constructor() {
    super();
  }

  override ngOnInit(): void {
    console.log('🔍 [DEBUG] TipocategoriaSRDetailPage ngOnInit chamado');
    
    // Conecta os eventos da strategy com os outputs do componente
    this.setupStrategyEvents();
    
    // Para tipo "Sem Rota", usa lógica customizada em vez da classe base
    this.initializeCustom();
  }

  /**
   * Conecta os eventos da strategy com os outputs do componente
   */
  private setupStrategyEvents(): void {
    this.strategy.onNavigateToList.subscribe(() => {
      console.log('📤 Emitindo evento navigateToList para o container');
      this.navigateToList.emit();
    });

    this.strategy.onNavigateToEdit.subscribe((id: number) => {
      console.log('📤 Emitindo evento navigateToEdit para o container:', id);
      this.navigateToEdit.emit(id);
    });

    this.strategy.onNavigateToView.subscribe((id: number) => {
      console.log('📤 Emitindo evento navigateToView para o container:', id);
      this.navigateToView.emit(id);
    });
  }

  /**
   * Inicialização customizada para tipo "Sem Rota"
   * Ignora completamente a rota e usa apenas o StateProvider
   */
  private initializeCustom(): void {
    // Inicializa o StateRef
    this.initializeStateRefCustom();
    
    // Obtém ID e entidade do StateProvider
    const customId = this.strategy.getEntityId();
    console.log('🔍 [DEBUG] ID customizado obtido:', customId);
    
    if (customId) {
      this.id.set(customId);
      
      // Tenta obter a entidade do estado primeiro
      const entityFromState = this.strategy.getEntityFromState();
      if (entityFromState) {
        console.log('🔍 [DEBUG] Usando entidade do estado:', entityFromState);
        this.handleLoadedDataCustom(entityFromState);
      } else {
        // Se não tem no estado, carrega da API
        console.log('🔍 [DEBUG] Carregando da API com ID:', customId);
        this.loading.set(true);
        this.strategy.loadEntity(customId).subscribe({
          next: (data) => this.handleLoadedDataCustom(data),
          error: (err) => this.handleLoadErrorCustom(err)
        });
      }
    } else {
      // Modo criação
      this.mode.set('create');
      this.handleLoadedDataCustom(null);
    }
  }

  /**
   * Inicializa o StateRef usando reflexão para acessar método privado da classe base
   */
  private initializeStateRefCustom(): void {
    const strategy = this.getStrategy();
    const stateKeys = strategy.getStateKeys();

    // Usa reflexão para acessar o detailStateRef da classe base
    (this as any).detailStateRef = new StateRef(
      this.stateProvider,
      stateKeys.shellKey,
      stateKeys.detailKey
    );
  }

  /**
   * Lida com os dados carregados usando métodos da classe base
   */
  private handleLoadedDataCustom(data: TipoCategoria | null): void {
    if (data) {
      const strategy = this.getStrategy();
      const processedData = strategy.processLoadedData
        ? strategy.processLoadedData(data)
        : data;

      this.entity.set(processedData);
      this.createFormWithDataCustom(processedData);

      if (this.isViewMode()) {
        this.form.disable();
      }
    } else {
      this.createFormWithDataCustom(null);
    }

    this.loading.set(false);
    this.saveCurrentStateCustom();
  }

  /**
   * Lida com erros de carregamento
   */
  private handleLoadErrorCustom(err: any): void {
    this.error.set(`Erro ao carregar dados: ${err.message}`);
    this.toast.danger('Falha ao carregar o registro.', { title: 'Erro' });
    this.loading.set(false);
  }

  /**
   * Cria o formulário com os dados
   */
  private createFormWithDataCustom(data: TipoCategoria | null): void {
    const strategy = this.getStrategy();
    const formControls = strategy.createFormControls(data || undefined);
    this.form = this.fb.group(formControls);

    if (data) {
      this.form.patchValue(data as any);
    }
  }

  /**
   * Salva o estado atual
   */
  private saveCurrentStateCustom(): void {
    const currentState = {
      entity: this.entity(),
      mode: this.mode(),
      loading: this.loading(),
      error: this.error()
    };

    console.log('💾 Salvando estado do detalhe:', currentState);
    const detailStateRef = (this as any).detailStateRef;
    if (detailStateRef) {
      detailStateRef.set(currentState);
    }
  }

  /**
   * Retorna a estratégia específica para TipoCategoria Sem Rota
   */
  protected getStrategy(): DetailStrategy<TipoCategoria, number> {
    return this.strategy;
  }

  public get fieldLabels(): { [key: string]: string } {
    return this.strategy.getFieldLabels();
  }

   
}