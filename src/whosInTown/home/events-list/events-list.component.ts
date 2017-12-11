import {Component, Input, OnInit} from '@angular/core';
import {Events} from "./events";
import {Router} from "@angular/router";
import {FavoritesService} from "../../service/favorites.service";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  @Input() events: Events[];
  @Input() isFav: boolean;
  constructor(private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit() {

  }
  onEventClicked(id) {
    this.router.navigate(['/event', id]);
  }

}
