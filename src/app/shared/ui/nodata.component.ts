import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nodata',
  standalone: true,
  template: `
  <div class="p-6 text-center text-gray-500">
    <div class="text-lg font-medium mb-1">Nada por aqui</div>
    <div class="text-sm">{{message || 'Tente ajustar os filtros.'}}</div>
  </div>`,
})
export class NoDataComponent {
  @Input() message?: string;
}
