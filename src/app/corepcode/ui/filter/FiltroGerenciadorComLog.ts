import { FormBuilder } from '@angular/forms';
import { FiltroGerenciadorSignal } from './FiltroGerenciadorSignal';
 
// Esta nova estratégia pode até estender a original para não repetir código
export class FiltroGerenciadorComLog<T extends object> extends FiltroGerenciadorSignal<T> {
  constructor(fb: FormBuilder, configInicial: T) {
    super(fb, configInicial);
    console.log('[Filtro Log] Gerenciador Criado com estado inicial:', configInicial);
  }

  override patchValue(valor: Partial<T>): void {
    console.log('[Filtro Log] Aplicando patch:', valor);
    super.patchValue(valor);
  }

  override limpar(): void {
    console.log('[Filtro Log] Limpando filtro.');
    super.limpar();
  }
}

//this.gerenciador = new FiltroGerenciadorComLog(this.fb, valorInicial); // <-- MUDOU AQUI
