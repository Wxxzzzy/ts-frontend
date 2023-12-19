import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { envDev } from '../../environments';
import { Notification } from '../shared';
import { RequestNotificationService } from './request-notification.service';

@Injectable({
  providedIn: 'root',
})
export class ClientNotificationService {
  private hubConnection!: signalR.HubConnection;
  private endpoint = `${envDev.baseUrl}/notifications`;

  constructor(private notify: RequestNotificationService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.endpoint, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addInviteListener = () => {
    this.hubConnection.on('SendMessage', (notification: Notification) => {
      this.notify.info(notification.message);
    });
  };
}
