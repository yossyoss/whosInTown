import { Component, OnInit } from '@angular/core';
import {BandsintownService} from "../service/bandsintown.service";
import {Artist} from "./artist-info/artist";
import {Events} from "./events-list/events";
import {FavoritesService} from "../service/favorites.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputVal: string;
  artist: Artist;
  events: Events;
  isSearching: boolean;
  isFavoritesSelected;
  noEventsResultsFound = false;
  noArtistResultsFound = false;
  constructor(private bandsintownService: BandsintownService, private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.events = this.bandsintownService.getEvents();
    this.artist = this.bandsintownService.getArtist();
    const fav = this.favoritesService.getFavorites();
    if (fav && fav.length > 0) {
      this.isFavoritesSelected = true;
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSearchClicked();
    }
  }
  onSearchClicked() {
    this.noEventsResultsFound = false;
    this.noArtistResultsFound = false;
    this.isSearching = true;
    if (this.inputVal) {
      this.bandsintownService.getArtistInfo(this.inputVal).subscribe((data) => {
        this.isSearching = false;
        this.bandsintownService.setArtist(data);
        this.artist = data;
        if (data.length === 0) {
          this.noArtistResultsFound = true;
        }
      });
      this.bandsintownService.getEventByArtist(this.inputVal).subscribe((events) => {
        this.isSearching = false;
        this.bandsintownService.setEvents(events);
        this.events = events;
        if (events.length === 0) {
          this.noEventsResultsFound = true;
        }
      });
    }
  }



}
