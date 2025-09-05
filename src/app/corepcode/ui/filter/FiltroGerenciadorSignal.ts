import { FormBuilder, FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Signal } from '@angular/core';
import { startWith } from 'rxjs';
import { IFiltroGerenciador } from './IFiltroGerenciador';
import { ConfiguracaoFormulario } from './BaseFiltroDirective';
 

export class FiltroGerenciadorSignal<T extends object> implements IFiltroGerenciador<T> {
  public readonly form: FormGroup;
  public readonly valor: Signal<T>;
  private readonly estadoInicial: T;

  constructor(fb: FormBuilder, config: ConfiguracaoFormulario<T>) {
    // 1. Extrai apenas os valores iniciais para usar no método reset()
    const valoresIniciais = Object.keys(config).reduce((acc, key) => {
      const k = key as keyof T;
      const fieldConfig = config[k];
      acc[k] = Array.isArray(fieldConfig) ? fieldConfig[0] : fieldConfig;
      return acc;
    }, {} as T);
    this.estadoInicial = valoresIniciais;

    // 2. CORREÇÃO: Refatorado para uma abordagem mais segura em termos de tipagem
    const controls: { [P in keyof T]?: FormControl<T[P] | null> } = {};
    for (const key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        const k = key as keyof T;
        const fieldConfig = config[k];

        if (Array.isArray(fieldConfig)) {
          // O campo tem validadores: [valor, validadores]
          const [valor, validadores] = fieldConfig;
          controls[k] = new FormControl(valor, { validators: validadores, nonNullable: true });
        } else {
          // O campo não tem validadores, apenas o valor
          controls[k] = new FormControl(fieldConfig as T[typeof k], { nonNullable: true });
        }
      }
    }
    
    this.form = fb.group(controls);

    this.valor = toSignal(
      this.form.valueChanges.pipe(startWith(this.form.getRawValue())),
      { requireSync: true }
    );
  }

  public patchValue(valor: Partial<T>): void {
    if (valor) {
      this.form.patchValue(valor, { emitEvent: false });
    }
  }

  public limpar(): void {
    this.form.reset(this.estadoInicial);
  }

  public getValorAtual(): T {
    return this.form.getRawValue();
  }
}

