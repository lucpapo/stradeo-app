import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateProvider, LOCAL_STORAGE_KEY, USE_BASE64_ENCODING } from '../../../corepcode/store/state-provider';

@Component({
  standalone: true,
  selector: 'app-tipocategoriaSR-shell',
  imports: [CommonModule, RouterModule],
  template: `<router-outlet></router-outlet>`,
  // Fornece a chave de estado única para todo este módulo
  providers: [
    { provide: LOCAL_STORAGE_KEY, useValue: 'ui-TipocategoriaSRShellComponent' },
    { provide: USE_BASE64_ENCODING, useValue: false }
  ]
})
export class TipocategoriaSRShellComponent implements OnInit, OnDestroy {
  private readonly rootKey = 'ui-TipocategoriaSRShellComponent';

  constructor(private stateProvider: StateProvider) { }

  ngOnInit() {
    this.stateProvider.ensureRoot(this.rootKey);
    console.log(`[TipocategoriaSRShell] Root state inicializado: ${this.rootKey}`);
  }

  ngOnDestroy() {
    this.stateProvider.closeAllChildRoots(this.rootKey);
    console.log(`[TipocategoriaSRShell] Child roots fechados para: ${this.rootKey}`);
  }
}