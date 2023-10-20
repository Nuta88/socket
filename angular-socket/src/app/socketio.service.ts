import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket;

  constructor() {   }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('init', 'Hello there from Angular.');
  }
  sendMessage(message) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
}
