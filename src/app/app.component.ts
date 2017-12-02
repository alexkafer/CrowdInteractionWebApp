import { Component, OnInit } from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public pixels = null;
  public mode = null;

  public selectedColor = 1;

  public cooldown = false;
  private cooldowntime = 0;
  private secondsRemaining = 5;

  public placeInLine = 0;
  public totalInLine = 0;

  private ws = new $WebSocket("ws://54.89.142.238:8080");

  ngOnInit(): void {
     // Make the HTTP request:
     this.http.get('http://54.89.142.238:8000').subscribe((data:any) => {
      // Read the result field from the JSON response.
      this.pixels = data.pixels;
      this.mode = data.mode;
      console.log(data);
    });
  }

  public toggleColor(row, col) {

    this.cooldown = true;
    this.cooldowntime = Date.now() + 5000;
    setTimeout(() => this.cooldown = false, 5000);

    this.pixels[row][col] = this.selectedColor;

    let colorPackage = {
      type: "pixel_touch",
      row: row, 
      col: col, 
      color: this.selectedColor
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

  constructor(private http: HttpClient) {

    this.ws.onMessage(
      (msg: MessageEvent)=> {
          let message = JSON.parse(msg.data);
          console.log("onMessage ", message);
          switch(message.type) {
            case "pixel_update": 
              this.pixels = message.pixels;
              break;
            case "mode_change":
              this.mode = message.mode;
              break;
            case "personal_update":
              console.log("Personal Update!")
              this.placeInLine = message.place;
              break;
          }
           
      },
      {autoApply: false}
  ); 

   setInterval(() => this.secondsRemaining = this.cooldown ? Math.floor((this.cooldowntime - Date.now())/1000) : 5, 1000)
  }

  public moveUp() {
    let colorPackage = {
      type: "button_press",
      button: 1
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

  public moveDown() {
    let colorPackage = {
      type: "button_press",
      button: 0
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
