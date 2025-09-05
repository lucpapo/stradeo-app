import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-color-layout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './color-layout.component.html',
  styleUrl: './color-layout.component.scss'
})

export class ColorLayoutComponent {

  public primary_color: string = localStorage.getItem("primary_color") || "#678f44";
  public secondary_color: string = localStorage.getItem("secondary_color") || "#d1823f";

  constructor(public layoutService: LayoutService) {
    var primary = localStorage.getItem("primary_color") || this.layoutService.config.color.primary_color;
    var secondary = localStorage.getItem("secondary_color") || this.layoutService.config.color.secondary_color;
    this.layoutService.config.color.primary_color = primary;
    this.layoutService.config.color.secondary_color = secondary;
    localStorage.getItem("primary_color") || this.layoutService.config.color.primary_color;
    localStorage.getItem("secondary_color") || this.layoutService.config.color.secondary_color;
  }
  

  applyColor() {
    this.layoutService.config.color.secondary_color = this.primary_color;
    this.layoutService.config.color.secondary_color = this.secondary_color;
    document.documentElement.style.setProperty("--theme-default", this.layoutService.config.color.primary_color);
    document.documentElement.style.setProperty("--theme-secondary", this.layoutService.config.color.secondary_color);
    localStorage.setItem("primary_color", this.primary_color);
    localStorage.setItem("secondary_color", this.secondary_color);
    window.location.reload();

  }

  resetColor() {
    document.documentElement.style.setProperty("--theme-default", "#678f44");
    document.documentElement.style.setProperty("--theme-secondary", "#d1823f");
    localStorage.setItem("primary_color", "#678f44");
    localStorage.setItem("secondary_color", "#d1823f");
    window.location.reload();
  }

}
