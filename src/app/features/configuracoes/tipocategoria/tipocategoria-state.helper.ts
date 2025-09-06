// tipocategoria-state.helper.ts
import { inject } from '@angular/core';
import { StateProvider } from '../../../corepcode/store/state-provider';
import { StateRef } from '../../../corepcode/store/state-ref';

export const TIPOCATEGORIA_ROOT_KEY = 'ui-TipocategoriaShellComponent';

/**
 * Helper para criar StateRef para componentes da feature Tipocategoria
 */
export function createTipocategoriaStateRef<T extends object = any>(
  componentKey: string
): StateRef<T> {
  const stateProvider = inject(StateProvider);
  return new StateRef<T>(stateProvider, TIPOCATEGORIA_ROOT_KEY, componentKey);
}

/**
 * Helper para criar child root (popups/overlays) na feature Tipocategoria
 */
export function createTipocategoriaChildRoot(
  childId: string, 
  suffix = 'popup'
): string {
  const stateProvider = inject(StateProvider);
  return stateProvider.createChildRoot(TIPOCATEGORIA_ROOT_KEY, childId, suffix);
}

/**
 * Helper para acessar o StateProvider diretamente
 */
export function getTipocategoriaStateProvider(): StateProvider {
  return inject(StateProvider);
}