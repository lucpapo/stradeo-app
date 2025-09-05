import { Component } from '@angular/core';
import { FooterLayoutComponent } from '../footer-layout/footer-layout.component';

@Component({
  selector: 'app-footer-light',
  standalone: true,
  imports:[FooterLayoutComponent],
  templateUrl: './footer-light.component.html',
  styleUrls: ['./footer-light.component.scss']
})
export class FooterLightComponent {

}
