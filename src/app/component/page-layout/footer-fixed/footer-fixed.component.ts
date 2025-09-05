import { Component } from '@angular/core';
import { FooterLayoutComponent } from '../footer-layout/footer-layout.component';

@Component({
  selector: 'app-footer-fixed',
  standalone: true,
  imports:[FooterLayoutComponent],
  templateUrl: './footer-fixed.component.html',
  styleUrls: ['./footer-fixed.component.scss']
})
export class FooterFixedComponent {

}
