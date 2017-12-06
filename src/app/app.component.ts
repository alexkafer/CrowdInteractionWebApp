import { Component, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { PixelManagerService } from './pixel-manager.service';
import { ModeDisplayDirective } from './mode-display.directive';
import { PlacesComponent } from './places/places.component';
import { PongComponent } from './pong/pong.component';
import { TestingComponent } from './testing/testing.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  mode = '';

  @ViewChild(ModeDisplayDirective) modeHost: ModeDisplayDirective;

  loadGame(game) {

    this.mode = game;

    let games = {
      places: PlacesComponent,
      pong: PongComponent,
      testing: TestingComponent
    }
    
    var component = games[game];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef = this.modeHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AppComponent>componentRef.instance).data = adItem.data;
  }

  ngAfterViewInit() {
    if (this.px.mode) {
      this.px.mode.subscribe((mode => this.loadGame(mode)));
    }
  }

  constructor(private px: PixelManagerService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.px.init();
  }

  public connected() {
    return this.px.state() == WebSocket.OPEN;
  }
}
