import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbOffcanvas, NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple-offcanvas-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h3>Teste Simples do Offcanvas</h3>
      <button class="btn btn-primary" (click)="openSimpleOffcanvas()">
        Abrir Offcanvas Simples
      </button>
    </div>
  `
})
export class SimpleOffcanvasTestComponent {
  private offcanvas = inject(NgbOffcanvas);

  openSimpleOffcanvas() {
    const offcanvasRef = this.offcanvas.open(SimpleOffcanvasContentComponent, {
      position: 'end',
      panelClass: 'offcanvas-class-90'
    });
  }
}

@Component({
  selector: 'app-simple-offcanvas-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="offcanvas-header">
      <h4 class="offcanvas-title">Teste Simples</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="close()"></button>
    </div>
    <div class="offcanvas-body">
      <p>Este é um teste simples do offcanvas.</p>
      <p>Se você está vendo isso do lado direito da tela, o ng-bootstrap está funcionando!</p>
      <button class="btn btn-secondary" (click)="close()">Fechar</button>
    </div>
  `
})
export class SimpleOffcanvasContentComponent {
  constructor(public activeOffcanvas: NgbActiveOffcanvas) {}

  close() {
    this.activeOffcanvas.close();
  }
}