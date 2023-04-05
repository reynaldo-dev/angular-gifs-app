import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Datum, Gifs } from '../interfaces/gi.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private api_key = 'RySTvXjJn5MwhR5YWXndOYAF2Sj0HwY8';
  private limit = '10';

  private _history: string[] = [];
  public gifs: Datum[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private readonly http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.gifs = JSON.parse(localStorage.getItem('gifs')!) || [];
  }

  searchGifs(q: string) {
    if (!this._history.includes(q)) {
      this._history.unshift(q);
      this._history = this._history.splice(0, 10);

      this.saveInLocalStorage<string[]>('history', this._history);
    }

    this.http
      .get<Gifs>(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: this.api_key,
          q,
          limit: this.limit,
        },
      })
      .subscribe((res: Gifs) => {
        this.gifs = res.data;
        this.saveInLocalStorage<Datum[]>('gifs', this.gifs);
      });
  }

  saveInLocalStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
