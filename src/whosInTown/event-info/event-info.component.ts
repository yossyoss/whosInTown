import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BandsintownService} from "../service/bandsintown.service";
import {FavoritesService} from "../service/favorites.service";

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {
  checkboxValue: boolean;
  eventInfo;
  venues;
  offers = [];
  constructor(private activatedRoute: ActivatedRoute, private bandsintownService: BandsintownService, private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        const query  = params['id'];
        if (query) {
          this.eventInfo = this.bandsintownService.getEventById(query);
          const favorite = this.favoritesService.getFavoriteById(query);
          if (this.eventInfo && this.eventInfo.length > 0) {
            this.init();
          } else if (favorite && favorite.length > 0) {
            this.eventInfo = this.favoritesService.getFavoriteById(query);
            this.init();
          } else {
            this.router.navigate(['/home']);
          }
        }
      }
    });
    if (this.eventInfo && this.eventInfo.isFav) {
      this.checkboxValue = true;
    } else {
      this.checkboxValue = false;
    }
  }
  init(){
    this.eventInfo = this.eventInfo[0];
    this.venues = this.eventInfo.venue;
    this.offers = this.eventInfo.offers;
  }
  onAddToFavClicked() {
    if (this.checkboxValue) {
      this.eventInfo.isFav = true;
        this.favoritesService.addEventToFavorites(this.eventInfo);
    } else {
      this.eventInfo.isFav = false;
      this.favoritesService.removeEventFromFavorites(this.eventInfo);
    }
  }
  onBeckClicked() {
    this.router.navigate(['/home']);
  }

}
