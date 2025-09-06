import { Directive, effect, inject, input, output, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { IFiltroGerenciador } from './IFiltroGerenciador';
import { FiltroGerenciadorSignal } from './FiltroGerenciadorSignal';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
 
/**
 * Define o formato para a configuração do formulário.
 * Para cada campo, você pode passar:
 * - Apenas o valor inicial.
 * - Um array com [valorInicial, validadores].
 */
export type ConfiguracaoFormulario<T> = {
  [P in keyof T]: [T[P], ValidatorFn | ValidatorFn[]] | T[P];
};

@Directive()
export abstract class BaseFiltroDirective<T extends object> implements OnInit {
  protected readonly fb = inject(FormBuilder);
  protected readonly stateProvider = inject(StateProvider);
  
  apply = output<T>();
  clear = output<void>();
  value = input<Partial<T> | null>(null);
  
  // Inputs para configuração do StateRef
  masterKey = input<string>('');
  componentKey = input<string>('');

  public readonly gerenciador: IFiltroGerenciador<T>;
  private _stateRef?: StateRef<{ filter: T }>;

  constructor() {
    const formConfig = this.criarConfiguracaoFormulario();

    // CORREÇÃO: Explicitamente definimos o tipo genérico <T> para evitar
    // que o TypeScript faça uma inferência incorreta.
    this.gerenciador = new FiltroGerenciadorSignal<T>(this.fb, formConfig);

    // Aplica o valor inicial logo após a criação do formulário
    const valorInicial = this.obterValorInicial();
    this.gerenciador.patchValue(valorInicial);

    effect(() => {
      const v = this.value();
      if (v) {
        this.gerenciador.patchValue(v);
      }
    });
  }

  ngOnInit(): void {
    // Carrega estado salvo se StateRef estiver configurado
    if (this.stateRef) {
      const savedState = this.stateRef.get();
      if (savedState?.filter) {
        this.gerenciador.patchValue(savedState.filter);
      } else {
        // Se não existe estado salvo, salva o valor inicial
        const valorInicial = this.gerenciador.getValorAtual();
        this.stateRef.set({ filter: valorInicial });
      }
    }
    
    this.onApply();
  }

  /**
   * O método abstrato agora é 'criarConfiguracaoFormulario'.
   * A classe filha deve implementar este método para fornecer a estrutura completa do formulário,
   * incluindo validadores.
   */
  protected abstract criarConfiguracaoFormulario(): ConfiguracaoFormulario<T>;

  /**
   * Método abstrato para definir o valor inicial do filtro.
   * A classe filha deve implementar este método para fornecer os valores padrão.
   */
  protected abstract obterValorInicial(): T;

  /**
   * StateRef configurado automaticamente baseado nos inputs masterKey e componentKey
   */
  protected get stateRef(): StateRef<{ filter: T }> | null {
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
   * Valor inicial para reset - pode ser sobrescrito nas classes filhas
   */
  protected get valorInicialParaReset(): T {
    return this.obterValorInicial();
  }

  onApply(): void {
    const currentValue = this.gerenciador.getValorAtual();
    
    // Atualiza o StateProvider se disponível
    if (this.stateRef) {
      this.stateRef.set({ filter: currentValue });
    }
    
    this.apply.emit(currentValue);
  }

  onClear(): void {
    const valorOriginal = this.valorInicialParaReset;
    
    // Atualiza o StateProvider com valores limpos se disponível
    if (this.stateRef) {
      this.stateRef.set({ filter: valorOriginal });
    }
    
    this.gerenciador.limpar();
    this.clear.emit();
  }
}

