import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoadingService } from '../../corestradeo/http/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf],
  template: `
  <div *ngIf="isLoading()" class="fixed inset-0 grid place-items-center bg-black/20 z-50">
    <div class="rounded-2xl p-5 bg-white shadow">
      <div class="animate-spin w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full mx-auto"></div>
      <div class="mt-3 text-sm text-gray-700">Carregando...</div>
    </div>
  </div>`,
})
export class LoadingComponent {
  private loader = inject(LoadingService);
  readonly isLoading = computed(() => this.loader.isLoading());
}
