import { Component, OnInit } from '@angular/core';
import { PixelManagerService } from '../pixel-manager.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pixels',
  templateUrl: './pixels.component.html',
  styleUrls: ['./pixels.component.css']
})
export class PixelsComponent implements OnInit {

  public pixels = [];
  public mode = new Observable();

  public touchColorHandler = null;

  constructor(private px: PixelManagerService) { }

  ngOnInit() {
    this.mode = this.px.mode.asObservable();
    this.mode.subscribe((num) => console.log("Mode: ", num));
    
    this.px.pixels.subscribe((num) => {
      this.pixels = num;
    });
  }

  public toggleColor(row, col) {
    if (this.touchColorHandler != null) {
      this.touchColorHandler(row, col)
    }
  }
}
