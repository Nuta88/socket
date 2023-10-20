import { Component } from '@angular/core';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message: string = '';
  messages: string[] = [];

  constructor(private socketService: SocketioService) {}

  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.getNewMessage().subscribe((message: string) => {
      if ( message ) this.messages.push(message);
    })
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
