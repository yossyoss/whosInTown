import { Injectable } from '@angular/core';

@Injectable()
export class FavoritesService {
  myFavorites = [];
  constructor() { }

  getFavorites() {
    return  JSON.parse(localStorage.getItem('favorites'));
  }
  getFavoriteById(id) {
    const arr = this.getFavorites();
    return arr.filter(event => {
      return event.id === id;
    });
  }
  addEventToFavorites(event) {
    if (event) {
      this.myFavorites.push(event);
      this.updateFavoritesList();
      localStorage.setItem('favorites', JSON.stringify(this.myFavorites));
    }
  }
  removeEventFromFavorites(event) {
    this.myFavorites = this.getFavorites();
    this.myFavorites = this.myFavorites.filter((fav) => {
      return fav.id !== event.id;
    });
    this.updateFavoritesList();
    localStorage.setItem('favorites', JSON.stringify(this.myFavorites));
  }

  updateFavoritesList() {
    this.myFavorites.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
  }
}
