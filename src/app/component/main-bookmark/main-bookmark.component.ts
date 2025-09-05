import { Component } from '@angular/core';
import { BookmarkSideMenuComponent } from './bookmark-side-menu/bookmark-side-menu.component';

@Component({
    selector: 'app-main-bookmark',
    templateUrl: './main-bookmark.component.html',
    styleUrls: ['./main-bookmark.component.scss'],
    standalone: true,
    imports: [BookmarkSideMenuComponent]
})
export class MainBookmarkComponent {

}
