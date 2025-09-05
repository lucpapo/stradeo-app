import { Component } from '@angular/core';
import { FooterLayoutComponent } from '../footer-layout/footer-layout.component';

@Component({
  selector: 'app-footer-dark',
  standalone: true,
  imports:[FooterLayoutComponent],
  templateUrl: './footer-dark.component.html',
  styleUrls: ['./footer-dark.component.scss']
})
export class FooterDarkComponent {

}
