import { Component, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { PixelManagerService } from './pixel-manager.service';
import { ModeDisplayDirective } from './mode-display.directive';
import { PlacesComponent } from './places/places.component';
import { PongComponent } from './pong/pong.component';
import { TestingComponent } from './testing/testing.component';
import { GamingLandingComponent } from './gaming-landing/gaming-landing.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  mode = '';

  public display = false;

  @ViewChild(ModeDisplayDirective) modeHost: ModeDisplayDirective;

  loadGame(game) {

    this.mode = game;

    let games = {
      places: PlacesComponent,
      line: GamingLandingComponent,
      pong: PongComponent,
      testing: TestingComponent
    }
    
    var component = games[game];

    if (component) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      let viewContainerRef = this.modeHost.viewContainerRef;
      viewContainerRef.clear();
  
      let componentRef = viewContainerRef.createComponent(componentFactory);
    }

    
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

  public state() {
    return this.px.state();
  }

  public toggleDisplay = () => {
    this.display = !this.display;
  }
}
