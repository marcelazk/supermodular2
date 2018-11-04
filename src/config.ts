import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
}

export const firebaseConfig = {
	fire: {
		apiKey: 'AIzaSyAP86aoRd5SsHH1U03RF2U0h6NtcOxWG9c',
    authDomain: 'blumenaubus-7ca2d.firebaseapp.com',
    databaseURL: 'https://blumenaubus-7ca2d.firebaseio.com',
    projectId: 'blumenaubus-7ca2d',
    storageBucket: 'blumenaubus-7ca2d.appspot.com',
    messagingSenderId: '19355041438'
  }
};
