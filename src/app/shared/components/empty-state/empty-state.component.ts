import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-empty-state',
    imports: [CommonModule],
    template: `
    <div class="empty-state-content text-center py-5">
      <div class="empty-state-icon mb-3">
        <i [class]="iconClass" style="font-size: 3rem;"></i>
      </div>
      <h5 class="empty-state-title mb-2">{{ title }}</h5>
      <p class="empty-state-subtitle text-muted mb-3">{{ subtitle }}</p>
      <p class="empty-state-hint text-muted small" *ngIf="hint">{{ hint }}</p>
    </div>
  `,
    styles: [`
    .empty-state-content {
      width: 100%;
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 2rem;
    }

    .empty-state-icon {
      display: inline-block;
    }

    .empty-state-title {
      color: #495057;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .empty-state-subtitle {
      color: #6c757d;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }

    .empty-state-hint {
      color: #868e96;
      font-size: 0.85rem;
      font-style: italic;
    }
  `]
})
export class EmptyStateComponent {
    // Inputs
    @Input() iconClass: string = 'fa fa-database text-primary';
    @Input() title: string = 'Nenhum dado encontrado';
    @Input() subtitle: string = 'Não existem registros para os critérios selecionados';
    @Input() hint: string = 'Tente ajustar os filtros ou refazer a pesquisa';
}