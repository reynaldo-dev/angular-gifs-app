import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  constructor(private readonly gifsService: GifsService) {}

  get history() {
    return this.gifsService.history;
  }

  search(query: string) {
    this.gifsService.searchGifs(query);
  }
}
