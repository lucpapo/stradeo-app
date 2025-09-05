import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'app-default-select',
    templateUrl: './default-select.component.html',
    styleUrls: ['./default-select.component.scss'],
    standalone: true,
    imports: [NgSelectModule, FormsModule]
})
export class DefaultSelectComponent {

  selectedCity: string;
  selectedCityIds: string[] = [];
  selectedCityIds3: string[] = [];
  selectedCityIds2: string[] = [];
  selectedCityIds4: string[] = [];
  selectedCityIds5: string[] = [];
  selectedCityIds6: string[] = [];
  selectedCityName = 'Vilnius';
  selectedCityId: number = 0;
  selectedUserIds: number[] = [];

  store: boolean = true;
  cities = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys', disabled: true },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' }
  ];

  Placeholder = [
    { id: 1, name: 'Alabama' },
    { id: 2, name: 'Wyoming' },
    { id: 3, name: 'Coming' },
    { id: 4, name: 'Hanry Die' },
    { id: 4, name: 'John Deo' },
  ];
  Placeh = [
    { id: 1, name: 'Alabama' },
    { id: 2, name: 'Wyoming' },
    { id: 3, name: 'Coming' },
    { id: 4, name: 'Hanry Die' },
    { id: 4, name: 'John Deo' },
  ];

  Enable(val: boolean): void {
    this.store = val;
  }

}
