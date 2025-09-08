import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasUsageExampleComponent } from './usage-example.component';
import { SimpleOffcanvasTestComponent } from './simple-test.component';
import { DirectOffcanvasTestComponent } from './direct-test.component';
import { NestedOffcanvasDemoComponent } from './nested-offcanvas-demo.component';
import { DualNestingDemoComponent } from './dual-nesting-demo.component';

@Component({
  selector: 'app-offcanvas-test-page',
  standalone: true,
  imports: [CommonModule, OffcanvasUsageExampleComponent, SimpleOffcanvasTestComponent, DirectOffcanvasTestComponent, NestedOffcanvasDemoComponent, DualNestingDemoComponent],
  template: `
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-6">
            <h3>Sistema de Offcanvas</h3>
          </div>
          <div class="col-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="javascript:void(0)">
                  <i data-feather="home"></i>
                </a>
              </li>
              <li class="breadcrumb-item">Componentes</li>
              <li class="breadcrumb-item active">Offcanvas</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5>Teste do Sistema de Offcanvas Dinâmico</h5>
              <span>Sistema baseado no ng-bootstrap para criar offcanvas dinâmicos com componentes Angular</span>
            </div>
            <div class="card-body">
              <app-dual-nesting-demo></app-dual-nesting-demo>
              <hr>
              <app-nested-offcanvas-demo></app-nested-offcanvas-demo>
              <hr>
              <app-direct-offcanvas-test></app-direct-offcanvas-test>
              <hr>
              <app-simple-offcanvas-test></app-simple-offcanvas-test>
              <hr>
              <app-offcanvas-usage-example></app-offcanvas-usage-example>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-title {
      margin-bottom: 1.5rem;
    }
    
    .breadcrumb {
      margin-bottom: 0;
    }
    
    .card-header span {
      color: #6c757d;
      font-size: 0.875rem;
    }
  `]
})
export class OffcanvasTestPageComponent {}