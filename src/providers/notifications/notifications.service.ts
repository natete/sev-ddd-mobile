import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

declare let devicePush;

@Injectable()
export class NotificationsService {

  constructor() { }

  init() {
    devicePush.register({
      idUser: '584b16cf9c0651fe07933674',
      idApplication: '1a95-445e-181d-a50f',
      position: false,
      icon: 'assets/images/icon.png',
      additionalData: {
        icon: 'assets/images/icon.png',
        // android: {
        //   iconColor: 'blue',
        //   badge: 'false'
        // }
        // ios: {
        //   badge: 'false'
        // }
      }
    });

    document.addEventListener('notificationReceived', (event: any) => devicePush.showNotification(event.data.message));
  }
}
