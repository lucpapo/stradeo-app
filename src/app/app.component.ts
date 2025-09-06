import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapTopComponent } from "./shared/component/tap-top/tap-top.component";
import { ToastContainerComponent } from '@pcode/toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TapTopComponent,ToastContainerComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  
}
