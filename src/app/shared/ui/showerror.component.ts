import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-showerror',
  standalone: true,
  imports: [NgIf],
  template: `
  <div *ngIf="message" class="border border-red-300 bg-red-50 text-red-700 p-3 rounded-lg">
    {{message}}
  </div>`,
})
export class ShowErrorComponent {
  @Input() message = 'Ocorreu um erro.';
}
