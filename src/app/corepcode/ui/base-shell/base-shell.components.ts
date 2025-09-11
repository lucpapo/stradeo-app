import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { StateProvider } from '../../../corepcode/store/state-provider';

/**
 * Diretiva de base abstrata para componentes "Shell".
 *
 * Contém a lógica padrão para inicializar e destruir um "root state",
 * garantindo que o estado seja gerenciado de forma consistente em toda a aplicação.
 *
 * Componentes filhos devem estender esta classe e fornecer a `rootKey` específica.
 */
@Directive()
export abstract class BaseShellDirective implements OnInit, OnDestroy {
  /**
   * A chave raiz (rootKey) que identifica o estado deste shell.
   * Deve ser implementada pela classe filha.
   */
  abstract readonly rootKey: string;

  protected stateProvider = inject(StateProvider);

  ngOnInit() {
    // Garante que o root state existe ao iniciar o shell
    this.stateProvider.ensureRoot(this.rootKey);
    console.log(`[BaseShell] Root state inicializado: ${this.rootKey}`);
  }

  ngOnDestroy() {
    // Fecha todos os child roots (popups/overlays) quando o shell é destruído
    this.stateProvider.closeAllChildRoots(this.rootKey);
    console.log(`[BaseShell] Child roots fechados para: ${this.rootKey}`);
  }
}
