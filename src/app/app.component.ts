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
  private selectedColor = 1;

  private cooldown = false;
  private cooldowntime = 0;
  private secondsRemaining = 5;

  private ws = new $WebSocket("ws://10.128.105.83:8080");

  ngOnInit(): void {
    // Make the HTTP request:
     this.http.get('http://10.128.105.83:8000').subscribe(data => {
      // Read the result field from the JSON response.
      this.pixels = data;
      console.log(data);
    });
  }

  public toggleColor(row, col) {

    this.cooldown = true;
    this.cooldowntime = Date.now() + 5000;
    setTimeout(() => this.cooldown = false, 5000);

    this.pixels[row][col] = this.selectedColor;

    let colorPackage = {
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
           this.pixels[message.row][message.col] = message.color;
      },
      {autoApply: false}
  ); 

   setInterval(() => this.secondsRemaining = this.cooldowntime ? Math.floor((this.cooldowntime - Date.now())/1000) : 5, 1000)
  }
}
