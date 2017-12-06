import { Component, OnInit } from '@angular/core';
import { PixelManagerService } from '../pixel-manager.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  public selectedColor = 1;
  
  public cooldown = false;
  private cooldowntime = 0;
  private secondsRemaining = 5;

  constructor(private px: PixelManagerService) { }

  public toggleColor(row, col) {
    this.cooldown = true;
    this.cooldowntime = Date.now() + 5000;

    this.px.sendPixelTouch(row, col, this.selectedColor);

    setTimeout(() => this.cooldown = false, 5000);
  } 

  ngOnInit() {
    setInterval(() => this.secondsRemaining = this.cooldown ? Math.floor((this.cooldowntime - Date.now())/1000) : 5, 1000)
  }

}
