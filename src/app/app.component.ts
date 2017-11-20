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

  public pixels = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  private selectedColor = 1;
  private cooldown = false;

  // private ws = new $WebSocket("ws://10.139.148.40:8080");

  ngOnInit(): void {
    // Make the HTTP request:
    /* this.http.get('http://localhost:8080/pixels').subscribe(data => {
      // Read the result field from the JSON response.
      this.pixels = data;
    }); */
  }

  public toggleColor(row, col) {
    this.cooldown = true;
    setTimeout(() => this.cooldown = false, 5000);

    this.pixels[row][col] = this.selectedColor;

    let colorPackage = {
      row: row, 
      col: col, 
      color: this.selectedColor
    }

    /* this.ws.send(colorPackage).subscribe(
      (msg)=> {
          console.log("next", msg.data);
      },
      (msg)=> {
          console.log("error", msg);
      },
      ()=> {
          console.log("complete");
      }
    ); */
  } 

  constructor(private http: HttpClient) {

    /*this.ws.onMessage(
      (msg: MessageEvent)=> {
          let message = JSON.parse(msg.data);
          console.log("onMessage ", message);
          this.pixels[message.row][message.col] = message.color;
      },
      {autoApply: false}
  ); */
  }
}
