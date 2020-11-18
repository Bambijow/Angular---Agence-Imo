import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDyTol8fJp8ZNfYjxxQFoPy7XeiGTkz14M',
        authDomain: 'monagence-73d35.firebaseapp.com',
        databaseURL: 'https://monagence-73d35.firebaseio.com',
        projectId: 'monagence-73d35',
        storageBucket: 'monagence-73d35.appspot.com',
        messagingSenderId: '497980313879',
        appId: '1:497980313879:web:05740a2bf9d2e7a86ca752',
        measurementId: 'G-FD3DX9ZKND'
      };
      firebase.initializeApp(firebaseConfig);
    }
}
