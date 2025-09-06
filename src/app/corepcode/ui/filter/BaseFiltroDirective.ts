import { Directive, effect, inject, input, output, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { IFiltroGerenciador } from './IFiltroGerenciador';
import { FiltroGerenciadorSignal } from './FiltroGerenciadorSignal';
 
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
  
  apply = output<T>();
  clear = output<void>();
  value = input<Partial<T> | null>(null);

  public readonly gerenciador: IFiltroGerenciador<T>;

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

  onApply(): void {
    this.apply.emit(this.gerenciador.getValorAtual());
  }

  onClear(): void {
    this.gerenciador.limpar();
    this.clear.emit();
  }
}

