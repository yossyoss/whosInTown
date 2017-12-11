import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { HomeComponent } from '../whosInTown/home/home.component';
import { EventsListComponent} from '../whosInTown/home/events-list/events-list.component';
import {ButtonModule, CheckboxModule, InputTextModule, RadioButtonModule} from "primeng/primeng";
import {HttpClientModule} from "@angular/common/http";
import {BandsintownService} from "../whosInTown/service/bandsintown.service";
import { ArtistInfoComponent } from '../whosInTown/home/artist-info/artist-info.component';
import { EventInfoComponent } from '../whosInTown/event-info/event-info.component';
import {FavoritesService} from "../whosInTown/service/favorites.service";
import { FavoritesListComponent } from '../whosInTown/home/favorites-list/favorites-list.component';
import { NotFoundComponent } from '../whosInTown/not-found/not-found.component';
import { VenueMapComponent } from '../whosInTown/event-info/venue-map/venue-map.component';
import {AgmCoreModule} from "@agm/core";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'event/:id', component: EventInfoComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsListComponent,
    ArtistInfoComponent,
    EventInfoComponent,
    FavoritesListComponent,
    NotFoundComponent,
    VenueMapComponent
  ],
  imports: [
    [ RouterModule.forRoot(routes) ],
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATA0V0YwmSf79M8_Sv6PsjFGXaQCBteJ4'
    }),
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule
  ],
  providers: [BandsintownService, FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
