import { Component } from '@angular/core';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-dark-layout',
  standalone: true,
  imports: [],
  templateUrl: './dark-layout.component.html',
  styleUrl: './dark-layout.component.scss'
})

export class DarkLayoutComponent {


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

  customizeDarkColorScheme(primary: string, secondary: string) {
    this.layoutService.config.color.primary_color = this.primary_color;
    this.layoutService.config.color.secondary_color = this.secondary_color;
    document.documentElement.style.setProperty("--theme-default", primary);
    document.documentElement.style.setProperty("--theme-secondary", secondary);
    localStorage.setItem("primary_color", primary || '#678f44');
    localStorage.setItem("secondary_color", secondary || '#d1823f');
    localStorage.setItem("mode", 'dark-only');
    window.location.reload();
  }


}
