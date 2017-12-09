import { Component, OnInit } from '@angular/core';
import { PixelManagerService } from '../pixel-manager.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-gaming-landing',
  templateUrl: './gaming-landing.component.html',
  styleUrls: ['./gaming-landing.component.css']
})
export class GamingLandingComponent implements OnInit {

  public waiting: BehaviorSubject<number>; // = 'places';

  constructor(private px: PixelManagerService) { }

  ngOnInit() {
    this.waiting = this.px.waiting;
  }

  public intendToPlay() {
  }
}
