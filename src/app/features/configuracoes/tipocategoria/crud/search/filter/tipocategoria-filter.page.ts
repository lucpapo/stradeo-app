import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // 1. Importar Validators
import { StateProvider } from '@pcode/store/state-provider';
import { StateRef } from '@pcode/store/state-ref';
import { BaseFiltroDirective, ConfiguracaoFormulario } from '@pcode/ui/filter/BaseFiltroDirective';

export type TipocategoriaFilterValue = {
  descricao: string;
  status_delecao: '' | '0' | '1';
};

@Component({
  standalone: true,
  selector: 'app-tipocategoria-filter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tipocategoria-filter.page.html',
  styleUrls: ['./tipocategoria-filter.page.scss'],
})
export class TipocategoriaFilterPage extends BaseFiltroDirective<TipocategoriaFilterValue> implements OnInit {

  private readonly stateProvider = inject(StateProvider);
  private _stateRef?: StateRef<{ filter: TipocategoriaFilterValue }>;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    // Carrega estado salvo após inicialização completa
    const savedState = this.stateRef.get();
    if (savedState?.filter) {
      this.gerenciador.patchValue(savedState.filter);
    } else {
      // Se não existe estado salvo, salva o valor inicial
      const valorInicial = this.gerenciador.getValorAtual();
      this.stateRef.set({ filter: valorInicial });
    }

    super.ngOnInit();
  }

  private get stateRef(): StateRef<{ filter: TipocategoriaFilterValue }> {
    if (!this._stateRef) {
      this._stateRef = new StateRef(this.stateProvider, 'ui-TipocategoriaShellComponent', 'TipocategoriaFilterPage#main');
    }
    return this._stateRef;
  }

  protected criarConfiguracaoFormulario(): ConfiguracaoFormulario<TipocategoriaFilterValue> {
    return {
      descricao: ['', []], //[Validators.required, Validators.maxLength(20)]],
      status_delecao: '0',
    };
  }

  protected obterValorInicial(): TipocategoriaFilterValue {
    // Retorna apenas o valor padrão durante a inicialização
    return {
      descricao: '',
      status_delecao: '0'
    };
  }

  override onApply(): void {
    const currentValue = this.gerenciador.getValorAtual();

    // Atualiza o StateProvider sempre que aplicar o filtro
    this.stateRef.set({ filter: currentValue });

    super.onApply();
  }

  override onClear(): void {
    const valorOriginal: TipocategoriaFilterValue = {
      descricao: '',
      status_delecao: '0'
    };

    // Atualiza o StateProvider com valores limpos
    this.stateRef.set({ filter: valorOriginal });

    super.onClear();
  }
}

