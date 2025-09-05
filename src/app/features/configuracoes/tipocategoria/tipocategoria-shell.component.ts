// src/app/features/configuracoes/tipocategoria/tipocategoria-shell.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-tipocategoria-shell',
  template: `
    <!-- cabeçalho/toolbar local da feature, se quiser -->
    <router-outlet />
  `,
  imports: [RouterOutlet],
})
export class TipocategoriaShellComponent {}
