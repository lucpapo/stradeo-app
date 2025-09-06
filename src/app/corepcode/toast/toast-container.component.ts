import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { ToastItem, ToastPosition, ToastType } from './toast.model';

@Component({
  standalone: true,
  selector: 'app-toast-container',
  imports: [CommonModule],
  template: `
    <ng-container *ngFor="let pos of positions">
      <div class="toast-container position-fixed p-3 toast-index"
           [ngClass]="containerClass(pos)"
           aria-live="polite" aria-atomic="true">

        <div *ngFor="let t of getToastsForPosition(pos); trackBy: trackById"
             class="toast fade show"
             role="alert" aria-live="assertive" aria-atomic="true"
             (mouseenter)="onHover(t, true)" (mouseleave)="onHover(t, false)">

          <div class="toast-header" [ngClass]="headerClass(t.type)">
            <i class="me-2" [ngClass]="iconClass(t.type)" aria-hidden="true"></i>
            <strong class="me-auto">{{ t.title ?? defaultTitle(t.type) }}</strong>
            <small class="text-muted">{{ timeAgo(t.createdAt) }}</small>
            <button *ngIf="t.dismissible" type="button" class="btn-close ms-2 mb-1" (click)="close(t.id)"></button>
          </div>

          <div class="toast-body" [ngClass]="bodyClass(t.type)">
            {{ t.message }}

            <!-- Progress bar: somente quando autohide -->
            <div *ngIf="t.autohide" class="progress mt-2 toast-progress">
              <div class="progress-bar" role="progressbar"
                   [style.width.%]="progressPct(t)"
                   [attr.aria-valuenow]="progressPct(t)" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>

      </div>
    </ng-container>
  `,
  styles: [`
    .toast-index { z-index: 1080; }
    .toast-progress { height: 3px; }
    .toast-header.bg-success, .toast-body.bg-success { color: #fff; }
    .toast-header.bg-danger,  .toast-body.bg-danger  { color: #fff; }
    .toast-header.bg-warning  { color: #000; }
    .toast-header.bg-info,    .toast-body.bg-info    { color: #000; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  private readonly toast = inject(ToastService);

  // Sinal de origem com todos os toasts, vindo do serviço.
  private allToasts = this.toast.toasts;

  positions: ToastPosition[] = [
    'top-end','top-center','top-start',
    'bottom-end','bottom-center','bottom-start',
  ];

  /**
   * Sinal computado que agrupa todos os toasts por sua posição.
   * É mais eficiente criar um único sinal computado que faz o agrupamento
   * do que criar um novo sinal computado para cada posição a cada renderização.
   */
  private toastsByPosition = computed(() => {
    const grouped = new Map<ToastPosition, ToastItem[]>();
    // O serviço já insere os mais novos no começo, então a ordem está correta.
    for (const toast of this.allToasts()) {
      if (!grouped.has(toast.position)) {
        grouped.set(toast.position, []);
      }
      grouped.get(toast.position)!.push(toast);
    }
    return grouped;
  });

  // Função para ser usada no template, que apenas lê o valor do sinal computado.
  getToastsForPosition(pos: ToastPosition): ToastItem[] {
    return this.toastsByPosition().get(pos) || [];
  }

  close(id: string) { this.toast.close(id); }
  onHover(t: ToastItem, paused: boolean) { if (t.autohide) this.toast.pause(t.id, paused); }

  progressPct(t: ToastItem) { return this.toast.progressPct(t); }

  containerClass(pos: ToastPosition) {
    switch (pos) {
      case 'top-end': return ['top-0','end-0'];
      case 'top-start': return ['top-0','start-0'];
      case 'top-center': return ['top-0','start-50','translate-middle-x'];
      case 'bottom-end': return ['bottom-0','end-0'];
      case 'bottom-start': return ['bottom-0','start-0'];
      case 'bottom-center': return ['bottom-0','start-50','translate-middle-x'];
    }
  }

  // Função para otimizar o *ngFor, evitando que o Angular destrua e recrie
  // os elementos do DOM a cada atualização da lista de toasts.
  trackById(index: number, item: ToastItem): string {
    return item.id;
  }

  defaultTitle(type: ToastType) {
    return ({ success:'Sucesso', info:'Info', warning:'Atenção', danger:'Erro', default:'Aviso' } as any)[type] ?? 'Aviso';
  }

  /** Ícones Font Awesome (ajuste se usar outra lib) */
  iconClass(type: ToastType) {
    return ({
      success: 'fa fa-check-circle',
      info: 'fa fa-info-circle',
      warning: 'fa fa-exclamation-triangle',
      danger: 'fa fa-times-circle',
      default: 'fa fa-bell'
    } as any)[type];
  }

  headerClass(type: ToastType) {
    return ({
      success: 'bg-success text-white',
      info: 'bg-info',
      warning: 'bg-warning',
      danger: 'bg-danger text-white',
      default: 'bg-light'
    } as any)[type];
  }

  bodyClass(type: ToastType) {
    return ({
      success: '',
      info: '',
      warning: '',
      danger: '',
      default: ''
    } as any)[type];
  }

  timeAgo(ts: number) {
    const s = Math.max(1, Math.floor((Date.now() - ts)/1000));
    if (s < 60) return `${s}s`;
    const m = Math.floor(s/60);
    if (m < 60) return `${m}m`;
    const h = Math.floor(m/60);
    return `${h}h`;
  }
}
