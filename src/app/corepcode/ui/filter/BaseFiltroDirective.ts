import { Directive, effect, inject, input, output, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { IFiltroGerenciador } from './IFiltroGerenciador';
import { FiltroGerenciadorSignal } from './FiltroGerenciadorSignal';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { ValidationService } from '../../../shared/validation/validation.service';
import { ValidationConfig } from '../../../shared/validation/validation-config.interface';
 
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
  protected readonly validationService = inject(ValidationService);
  
  apply = output<T>();
  clear = output<void>();
  value = input<Partial<T> | null>(null);
  
  // Inputs para configuração do StateRef
  masterKey = input<string>('');
  componentKey = input<string>('');
  
  // NOVO: Input para controlar se deve carregar dados inicialmente
  loadInitialData = input<boolean>(true);

  public readonly gerenciador: IFiltroGerenciador<T>;
  private _stateRef?: StateRef<{ filter: T }>;

  // Propriedades de validação (podem ser sobrescritas pelas classes filhas)
  protected validationConfig?: ValidationConfig = {};
  protected fieldLabels?: Record<string, string> = {};

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
    const shouldLoadInitialData = this.loadInitialData();
    
    // CORREÇÃO: Lógica simplificada para evitar chamadas duplas
    if (this.stateRef) {
      const savedState = this.stateRef.get();
      
      if (savedState?.filter) {
        // Carrega filtro do state
        this.gerenciador.patchValue(savedState.filter);
        
        // NOVO: Só aplica se loadInitialData=true E formulário válido
        if (shouldLoadInitialData && this.isFormValidWithValidation()) {
          // Simula um clique do usuário após um pequeno delay
          setTimeout(() => this.onApply(), 0);
        }
      } else {
        // Se não há state, salva o valor inicial e aplica se válido
        const valorInicial = this.gerenciador.getValorAtual();
        this.stateRef.set({ filter: valorInicial });
        
        if (shouldLoadInitialData && this.isFormValidWithValidation()) {
          setTimeout(() => this.onApply(), 0);
        }
      }
    } else {
      // Sem StateRef, só aplica se deve carregar dados e formulário válido
      if (shouldLoadInitialData && this.isFormValidWithValidation()) {
        setTimeout(() => this.onApply(), 0);
      }
    }
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
    // Validação padrão - marca campos como touched se inválido
    if (this.gerenciador.form.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const currentValue = this.gerenciador.getValorAtual();
    
    // Atualiza o StateProvider se disponível
    if (this.stateRef) {
      this.stateRef.set({ filter: currentValue });
    }
    
    this.apply.emit(currentValue);
  }

  /**
   * Marca todos os campos do formulário como touched para exibir erros de validação
   */
  protected markAllFieldsAsTouched(): void {
    Object.keys(this.gerenciador.form.controls).forEach(key => {
      this.gerenciador.form.get(key)?.markAsTouched();
    });
  }

  /**
   * Verifica se o formulário é válido
   */
  public isFormValid(): boolean {
    return this.gerenciador.form.valid;
  }

  /**
   * Força a validação de todos os campos (marca como touched e dirty)
   * Útil quando o filtro vem do state e precisa mostrar erros imediatamente
   */
  public forceValidation(): void {
    Object.keys(this.gerenciador.form.controls).forEach(key => {
      const control = this.gerenciador.form.get(key);
      if (control) {
        control.markAsTouched();
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    });
  }

  /**
   * Verifica se o formulário é válido após forçar validação
   */
  public isFormValidWithValidation(): boolean {
    this.forceValidation();
    return this.gerenciador.form.valid;
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

