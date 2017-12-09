import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { PongComponent } from './pong/pong.component';
import { PlacesComponent } from './places/places.component';
import { PixelsComponent } from './pixels/pixels.component';
import { TestingComponent } from './testing/testing.component';
import { ModeDisplayDirective } from './mode-display.directive';
import { PixelManagerService } from './pixel-manager.service';
import { GamingLandingComponent } from './gaming-landing/gaming-landing.component';


@NgModule({
  declarations: [
    AppComponent,
    PongComponent,
    PlacesComponent,
    PixelsComponent,
    TestingComponent,
    ModeDisplayDirective,
    GamingLandingComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule
  ],
  providers: [PixelManagerService],
  bootstrap: [AppComponent],
  entryComponents: [
    PlacesComponent,
    PongComponent,
    TestingComponent,
    GamingLandingComponent]
})
export class AppModule { }
