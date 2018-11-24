import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

import { snapshotToArray } from '../linhas/linhas';

import * as firebase from 'Firebase';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
	templateUrl: 'comentarios.html',
  providers: [],
  selector: 'page-comentarios'
})
export class Comentarios {

  private nav: Nav;
  ref = firebase.database().ref('linhas/');
  comentarios = [];
  linha = null;
  cdLinha = null;
  dsLinha = null;
  message = '';

  uid = null;

	constructor(nav: Nav, private auth: AuthService, navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.nav = nav;

    this.uid = this.auth.getUID();

    this.linha = navParams.data.linha;
    this.cdLinha = this.linha.cd_linha;
    this.dsLinha = this.linha.ds_linha;
    this.ref.child(this.linha.key).child('comentarios').once('value', resp => {
      this.comentarios = [];
      this.comentarios = snapshotToArray(resp);
      this.comentarios = this.comentarios.sort(function (a, b) {
        if (a.dt_comentario > b.dt_comentario) {
          return -1;
        }
        if (a.dt_comentario < b.dt_comentario) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
    });
  }

  postComentario() {
    const postData = {
      ds_comentario: this.message,
      dt_comentario: this.getDate(),
      email: this.getEmailParte(),
      uid: this.auth.getUID(),
      username: this.auth.getUsername()
    };

    this.ref.child(this.linha.key).child('comentarios').push(postData).then(() => {
      this.message = '';
    });
  }

  getDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();
    const hh = today.getHours();
    const min = today.getMinutes();

    let day = '';
    let month = '';
    let currentDate = '';
    let hour = '';
    let minutes = '';

    if (dd < 10) {
      day = '0' + dd;
    } else {
      day = dd.toString();
    }

    if (mm < 10) {
      month = '0' + mm;
    } else {
      month = mm.toString();
    }

    if (hh < 10 && hh > 0) {
      hour = '0' + hh;
    } else if (hh === 0) {
      hour = '00';
    } else {
      hour = hh.toString();
    }

    if (min < 10 && min > 0) {
      minutes = '0' + min;
    } else if (min === 0) {
      minutes = '00';
    } else {
      minutes = min.toString();
    }

    currentDate = day + '/' + month + '/' + yyyy + ' ' + hour + ':' + minutes;
    return currentDate;
  }

  getEmailParte() {
    let email = this.auth.getEmail();
    email = email.substr(0, email.indexOf('@') + 1);
    return email;
  }

  presentActionSheet(comentKey) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.deleteComentario(comentKey);
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteComentario(comentKey) {
    this.ref.child(this.linha.key).child('comentarios').child(comentKey).remove();
  }
}
