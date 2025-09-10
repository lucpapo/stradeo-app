// tipocategoriaSR-shell.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateProvider, LOCAL_STORAGE_KEY, USE_BASE64_ENCODING } from '../../../corepcode/store/state-provider';

@Component({
  standalone: true,
  selector: 'app-tipocategoriaSR-shell',
  imports: [CommonModule, RouterModule],
  template: `<router-outlet></router-outlet>`,
  providers: [
    StateProvider,
    { provide: LOCAL_STORAGE_KEY, useValue: 'ui-TipocategoriaSRShellComponent' },
    { provide: USE_BASE64_ENCODING, useValue: false } // desenvolvimento - dados legíveis
  ]
})
export class TipocategoriaSRShellComponent implements OnInit, OnDestroy {
  private readonly rootKey = 'ui-TipocategoriaSRShellComponent';

  constructor(private stateProvider: StateProvider) { }

  ngOnInit() {
    // Garante que o root state existe
    this.stateProvider.ensureRoot(this.rootKey);
    console.log(`[TipocategoriaSRShell] Root state inicializado: ${this.rootKey}`);
  }

  ngOnDestroy() {
    // Fecha todos os child roots (popups/overlays) quando o shell é destruído
    this.stateProvider.closeAllChildRoots(this.rootKey);
    console.log(`[TipocategoriaSRShell] Child roots fechados para: ${this.rootKey}`);
  }
}