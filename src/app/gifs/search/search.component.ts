import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private readonly gifsService: GifsService) {}

  searchGifs(query: string) {
    query = query.trim().toLowerCase();

    if (query.length === 0) return;
    this.gifsService.searchGifs(query);
    this.searchInput.nativeElement.value = '';
  }
}
