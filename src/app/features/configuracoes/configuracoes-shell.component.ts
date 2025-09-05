// src/app/features/configuracoes/configuracoes-shell.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-configuracoes-shell',
  template: `<router-outlet />`,
  imports: [RouterOutlet],
})
export class ConfiguracoesShellComponent {}
