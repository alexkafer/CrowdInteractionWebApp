import { Component, OnInit } from '@angular/core';
import { PixelManagerService } from '../pixel-manager.service';

@Component({
  selector: 'app-gaming-landing',
  templateUrl: './gaming-landing.component.html',
  styleUrls: ['./gaming-landing.component.css']
})
export class GamingLandingComponent implements OnInit {

  constructor(private px: PixelManagerService) { }

  ngOnInit() {
    
  }

  public intendToPlay() {
    this.px.intendToPlay();
  }
}
