import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {Events} from "../home/events-list/events";
@Injectable()
export class BandsintownService {
  events: Events;
  eventsArr = [];
  artistInfo;
  constructor(private http: HttpClient) { }

  getArtistInfo(artistName: string): Observable<any> {
    const apiURL = "https://rest.bandsintown.com/artists/" + artistName + "?app_id=myApp";
    return this.http.get<any>(apiURL)
      .pipe(
        catchError(this.handleError('getArtistInfo', []))
      );
  }

  getEventByArtist(artistName: string): Observable<any> {
    this.eventsArr = [];
    const apiURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=myApp";
    return this.http.get<any>(apiURL)
      .pipe(
        tap(data => {
          data.isFav = false;
          this.eventsArr.push(data);
        }),
        catchError(this.handleError('getHeroes', []))
      );
  }
  getEventById(id) {
    if (this.eventsArr && this.eventsArr[0]) {
      return this.eventsArr[0].filter(event => {
        return event.id === id;
      });
    }
  }
  // updateEvent(event, isFav) {
  //   this.eventsArr[0].forEach(e => {
  //     if (e.id === event.id) {
  //       e.isFav = isFav;
  //     }
  //   })
  // }
  getEvents() {
    return this.events;
  }
  setEvents(events) {
    this.events = events;
  }
  getArtist() {
    return this.artistInfo;
  }
  setArtist(artist) {
    this.artistInfo = artist;
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
