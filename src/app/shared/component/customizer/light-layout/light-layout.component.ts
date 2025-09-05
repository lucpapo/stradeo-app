import { Component } from '@angular/core';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-light-layout',
  standalone: true,
  imports: [],
  templateUrl: './light-layout.component.html',
  styleUrl: './light-layout.component.scss'
})

export class LightLayoutComponent {

  public primary_color: string = localStorage.getItem("primary_color") || "#678f44";
  public secondary_color: string = localStorage.getItem("secondary_color") || "#d1823f";

  constructor(public layoutService: LayoutService) {
    var primary = localStorage.getItem("primary_color") || this.layoutService.config.color.primary_color;
    var secondary = localStorage.getItem("secondary_color") || this.layoutService.config.color.secondary_color;
    this.layoutService.config.color.primary_color = primary;
    this.layoutService.config.color.secondary_color = secondary;
    document.documentElement.style.setProperty("--theme-default", primary);
    document.documentElement.style.setProperty("--theme-secondary", secondary);
    localStorage.getItem("primary_color") || this.layoutService.config.color.primary_color;
    localStorage.getItem("secondary_color") || this.layoutService.config.color.secondary_color;
  }

  customizeLightColorScheme(primary: string, secondary: string) {
    this.layoutService.config.color.primary_color = this.primary_color;
    this.layoutService.config.color.secondary_color = this.secondary_color;
    document.documentElement.style.setProperty("--theme-default", primary);
    document.documentElement.style.setProperty("--theme-secondary", secondary);
    localStorage.setItem("primary_color", primary || '#678f44');
    localStorage.setItem("secondary_color", secondary || '#d1823f');
    localStorage.setItem("mode", 'light');
    window.location.reload();
  }
}
