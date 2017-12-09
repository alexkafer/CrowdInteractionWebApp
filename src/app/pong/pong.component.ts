import { Component, OnInit } from '@angular/core';
import { PixelManagerService } from '../pixel-manager.service';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css']
})
export class PongComponent implements OnInit {

  constructor(private px: PixelManagerService) { }

  ngOnInit() {
    
  }

  public up() {
    this.px.sendButtonUpdate(1);
  }

  public down() {
    this.px.sendButtonUpdate(0);
  }

}
