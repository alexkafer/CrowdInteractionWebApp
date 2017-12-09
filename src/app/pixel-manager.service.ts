import { Injectable } from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class PixelManagerService {

  // public pixels = null;
  public pixels = new BehaviorSubject<any>([]); // = 'places';
  public mode = new Subject<string>(); // = 'places';

  // private ws = new $WebSocket("ws://ec2-18-220-127-31.us-east-2.compute.amazonaws.com:8000");
  private ws = new $WebSocket("ws://localhost:8000");

  constructor(private http: HttpClient) { 
    this.ws.onMessage(
      (msg: MessageEvent)=> {
          let message = JSON.parse(msg.data);
          console.log("onMessage ", message);
          switch(message.type) {
            case "pixel_update": 
              this.pixels.next(message.pixels);
              break;
            case "mode_change":
              this.mode.next(message.mode);
              break;
          }
      },
      {autoApply: false}  ); 
  }

  public init() {
    // Make the initial HTTP request to populate data:
    // this.http.get('http://ec2-18-220-127-31.us-east-2.compute.amazonaws.com')
    this.http.get('http://localhost:8080')
    .subscribe(
      (data: any) => {
        this.pixels.next(data.pixels);
        this.mode.next(data.mode);
      },
      err => console.log(err),
      () => console.log('yay')
    );

    this.pixels.next([]);
    this.mode.next("");
  }


  public state() {
    return this.ws.getReadyState();
  }

  public retry() {
    return this.ws.reconnect();
  }

  public intendToPlay() {
    let playPackage = {
      type: "play_intent"
    }

    this.ws.send(playPackage).subscribe(
      (msg)=> {
          console.log("next", msg.data);
      },
      (msg)=> {
          console.log("error", msg);
      },
      ()=> {
          console.log("complete");
      }
    );
  }

  public sendPixelTouch(row, col, color) {

    let colorPackage = {
      type: "pixel_touch",
      row: row, 
      col: col, 
      color: color
    }

    this.ws.send(colorPackage).subscribe(
      (msg)=> {
          console.log("next", msg.data);
      },
      (msg)=> {
          console.log("error", msg);
      },
      ()=> {
          console.log("complete");
      }
    );
  }

  public sendButtonUpdate(button) {
    let colorPackage = {
      type: "button_press",
      button: button
    }

    this.ws.send(colorPackage).subscribe(
      (msg)=> {
          console.log("next", msg.data);
      },
      (msg)=> {
          console.log("error", msg);
      },
      ()=> {
          console.log("complete");
      }
    );
  }
}
