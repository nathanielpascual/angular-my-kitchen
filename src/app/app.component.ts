import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase';
// import 'firebase/app';
import { firebase } from '@firebase/app';

const config ={
  apiKey: "AIzaSyCHGXuSKZ2WW7PCvrOwEkj5qEKMgTxNPnA",
  authDomain: "recipe-book-7037c.firebaseapp.com"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp(config);
  }
}
