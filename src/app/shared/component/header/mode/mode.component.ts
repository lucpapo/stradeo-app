import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonSvgIconsComponent } from "../common-svg-icons/common-svg-icons.component";

@Component({
  selector: 'app-mode',
  standalone: true,
  imports: [CommonModule, CommonSvgIconsComponent],
  templateUrl: './mode.component.html',
  styleUrl: './mode.component.scss'
})

export class ModeComponent {

  public dark: boolean = false;

  layoutToggle() {
    const isDarkOnly = document.body.classList.contains("dark-only");
    this.dark = !isDarkOnly;
    if (this.dark) {
      document.body.classList.add("dark-only");
    } else {
      document.body.classList.remove("dark-only");
    }
  }
}
