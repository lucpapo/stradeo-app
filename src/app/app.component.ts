import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TapTopComponent } from "./shared/component/tap-top/tap-top.component";
import { ToastContainerComponent } from '@pcode/toast/toast-container.component';
import { StateProvider } from './corepcode/store/state-provider';
import { ConcessionariaStateService } from './shared/component/concessionaria-selector/concessionaria-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TapTopComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly rootKey = 'ui-MasterAppComponent';
  
  private isInitialized = false;
  private readonly USE_HARD_RELOAD = true; // Mude para false se quiser reload suave

  constructor(
    private stateProvider: StateProvider,
    private concessionariaStateService: ConcessionariaStateService,
    private router: Router
  ) { }

  ngOnInit() {
    // Garante que o root state existe para toda a aplicação
    this.stateProvider.ensureRoot(this.rootKey);
    console.log(`[MasterApp] Root state inicializado: ${this.rootKey}`);

    // Inicializa a concessionária no estado ConcessionariaSelector#main
    this.inicializarConcessionaria();

    // Escuta mudanças na concessionária para fazer refresh da tela
    this.concessionariaStateService.concessionaria$.subscribe(concessionaria => {
      if (concessionaria && this.isInitialized) {
        console.log(`[MasterApp] Concessionária alterada: ${concessionaria.nome} - Fazendo refresh da tela`);
        this.refreshTela();
      } else if (concessionaria) {
        console.log(`[MasterApp] Concessionária inicializada: ${concessionaria.nome}`);
        this.isInitialized = true;
      }
    });

    // Escuta eventos de refresh forçado
    window.addEventListener('force-route-refresh', () => {
      console.log('[MasterApp] Refresh forçado da rota');
      this.refreshTela();
    });
  }

  private inicializarConcessionaria(): void {
    // Garante que o root existe e depois inicializa o serviço manualmente
    console.log('[MasterApp] Inicializando concessionária...');
    
    // Pequeno delay para garantir que o root foi criado
    setTimeout(() => {
      this.concessionariaStateService.inicializarManual();
    }, 50);
  }

  private refreshTela(): void {
    console.log('[MasterApp] Fazendo RELOAD da tela devido à mudança de concessionária');

    // Emite um evento customizado que outros componentes podem escutar
    window.dispatchEvent(new CustomEvent('concessionaria-changed'));

    const currentUrl = this.router.url;
    console.log(`[MasterApp] RELOADING rota atual: ${currentUrl}`);

    if (this.USE_HARD_RELOAD) {
      console.log('[MasterApp] Usando HARD RELOAD');
      this.reloadHard();
    } else {
      console.log('[MasterApp] Usando SOFT RELOAD');
      this.reloadViaRouter(currentUrl);
    }
  }

  private reloadViaRouter(currentUrl: string): void {
    // Navega para uma rota temporária e depois volta sem histórico
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Força o reload da rota atual substituindo a URL atual
      this.router.navigateByUrl(currentUrl, { replaceUrl: true });
    });
  }

  private reloadHard(): void {
    console.log('[MasterApp] Fazendo RELOAD HARD da página');
    // Reload completo da página (última opção)
    window.location.reload();
  }

  ngOnDestroy() {
    // Fecha todos os child roots quando a aplicação é destruída
    this.stateProvider.closeAllChildRoots(this.rootKey);
    console.log(`[MasterApp] Child roots fechados para: ${this.rootKey}`);
  }
}
