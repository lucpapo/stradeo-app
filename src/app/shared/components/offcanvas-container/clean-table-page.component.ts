import { Component } from '@angular/core';
import { TableSimulationComponent } from './table-simulation.component';

@Component({
  selector: 'app-clean-table-page',
  standalone: true,
  imports: [TableSimulationComponent],
  template: `
    <div class="min-vh-100 bg-light">
      <app-table-simulation></app-table-simulation>
    </div>
    
    <!-- Scripts globais para funções de callback dos offcanvas -->
    <script>
      window.closeOffcanvas = function(id) {
        const element = document.getElementById(id);
        if (element) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(element);
          if (bsOffcanvas) {
            bsOffcanvas.hide();
          }
        }
      };

      window.openNestedLog = function(itemId, logTime) {
        // Implementar abertura de log aninhado
        console.log('Abrir log aninhado:', itemId, logTime);
      };

      window.openNestedItem = function(itemId, section) {
        // Implementar abertura de item aninhado
        console.log('Abrir item aninhado:', itemId, section);
      };
    </script>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class CleanTablePageComponent {
  constructor() {
    // Adiciona as funções globais ao window se não existirem
    if (typeof (window as any).closeOffcanvas === 'undefined') {
      (window as any).closeOffcanvas = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
          const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(element);
          if (bsOffcanvas) {
            bsOffcanvas.hide();
          }
        }
      };
    }

    if (typeof (window as any).openNestedLog === 'undefined') {
      (window as any).openNestedLog = (itemId: string, logTime: string) => {
        console.log('Abrir log aninhado:', itemId, logTime);
        // Aqui você pode implementar a lógica de abertura de logs aninhados
      };
    }

    if (typeof (window as any).openNestedItem === 'undefined') {
      (window as any).openNestedItem = (itemId: string, section: string) => {
        console.log('Abrir item aninhado:', itemId, section);
        // Aqui você pode implementar a lógica de abertura de itens aninhados
      };
    }
  }
}