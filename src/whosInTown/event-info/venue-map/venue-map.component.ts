import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-venue-map',
  templateUrl: './venue-map.component.html',
  styleUrls: ['./venue-map.component.scss']
})
export class VenueMapComponent implements OnInit {
  lat: number;
  lng: number;
  @Input() venues;

  ngOnInit() {
    this.lat =  parseInt(this.venues.latitude, 10);
    this.lng = parseInt(this.venues.longitude, 10);
  }



}
