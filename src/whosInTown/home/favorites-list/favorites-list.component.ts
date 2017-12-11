import { Component, OnInit } from '@angular/core';
import {FavoritesService} from "../../service/favorites.service";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {
  events;
  isFav = false;
  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.events = this.favoritesService.getFavorites();
    if (this.events && this.events.length > 0 ) {
      this.isFav = true;
    }
  }

}
