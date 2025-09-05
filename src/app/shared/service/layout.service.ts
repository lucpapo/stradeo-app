import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public isOpen: boolean = false;

  public config = {
    settings: {
      layout_type: 'ltr',
      mix_layout: 'dark-sidebar',
      sidebar_type: 'compact-wrapper',
      icon: "stroke-svg",
    },
    color: {
      primary_color: '#678f44',
      secondary_color: '#d1823f',
    },
  };


  createStyle(color: string) {
    let currentStyle = '';
    // Check if the requested color is already the current style
    if (currentStyle === color) {
      return; // Exit if the style is already loaded
    }
    // Update the current style
    currentStyle = color;
    const head = document.head;
    const existingLink = document.getElementById('dynamic-style');
    // If the link already exists, remove it
    if (existingLink) {
      head.removeChild(existingLink);
    }
    var link = document.createElement("link");
    link.id = 'dynamic-style'; // Set an ID for easier reference
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = window.location.origin + "/assets/css/" + color + ".css";
    head.appendChild(link);
  }

}
