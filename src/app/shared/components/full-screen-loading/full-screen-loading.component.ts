import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-full-screen-loading',
    imports: [CommonModule],
    template: `
    <div class="full-screen-loading-overlay" *ngIf="show">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Carregando...</span>
        </div>
        <div class="loading-text mt-3">
          {{ message }}
        </div>
      </div>
    </div>
  `,
    styles: [`
    .full-screen-loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .loading-text {
      color: #495057;
      font-weight: 500;
      font-size: 1.1rem;
    }

    .spinner-border {
      animation: spinner-border 0.75s linear infinite;
    }

    @keyframes spinner-border {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class FullScreenLoadingComponent {
    @Input() show: boolean = false;
    @Input() message: string = 'Carregando...';
}