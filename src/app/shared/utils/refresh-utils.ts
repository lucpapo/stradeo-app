// Utilitários para refresh da aplicação
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConcessionariaStateService } from '../component/concessionaria-selector/concessionaria-state.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshUtils {
  private router = inject(Router);
  private concessionariaState = inject(ConcessionariaStateService);

  /**
   * Refresh suave - apenas recarrega dados dos componentes
   */
  refreshDados(): void {
    console.log('🔄 [RefreshUtils] Refresh suave dos dados');
    this.concessionariaState.refreshConcessionariaAtual();
  }

  /**
   * Refresh médio - navega para a mesma rota (recarrega componentes)
   */
  refreshRota(): void {
    console.log('🔄 [RefreshUtils] Refresh da rota atual');
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  /**
   * Refresh completo - força refresh via evento de mudança de concessionária
   */
  refreshCompleto(): void {
    console.log('🔄 [RefreshUtils] Refresh completo da tela');
    this.concessionariaState.forcePageRefresh();
  }

  /**
   * Refresh hard - recarrega a página inteira
   */
  refreshHard(): void {
    console.log('🔄 [RefreshUtils] Refresh hard da página');
    window.location.reload();
  }

  /**
   * Refresh inteligente - escolhe o melhor tipo baseado no contexto
   */
  refreshInteligente(tipo: 'suave' | 'medio' | 'completo' | 'hard' = 'completo'): void {
    switch (tipo) {
      case 'suave':
        this.refreshDados();
        break;
      case 'medio':
        this.refreshRota();
        break;
      case 'completo':
        this.refreshCompleto();
        break;
      case 'hard':
        this.refreshHard();
        break;
    }
  }
}

// Função utilitária global (pode ser usada sem injeção)
export function forceRefresh(tipo: 'dados' | 'rota' | 'completo' | 'hard' = 'completo'): void {
  switch (tipo) {
    case 'dados':
      window.dispatchEvent(new CustomEvent('concessionaria-refresh'));
      break;
    case 'rota':
      window.dispatchEvent(new CustomEvent('force-route-refresh'));
      break;
    case 'completo':
      window.dispatchEvent(new CustomEvent('concessionaria-changed'));
      break;
    case 'hard':
      window.location.reload();
      break;
  }
}