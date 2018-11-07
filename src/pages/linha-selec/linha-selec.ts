import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { Horarios } from '../horarios/horarios';
import { Mapa } from '../mapa/mapa';
import { snapshotToArray } from '../linhas/linhas';

import { AuthService } from '../../services/auth.service';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-linha-selec',
  templateUrl: 'linha-selec.html'
})
export class LINHASELECPage {

  favoritos = [];
  ref = firebase.database().ref('favoritos/');

  linha = null;
  cdLinha = null;
  dsLinha = null;
  uid = null;
  isFavorito = false;
  keyFavorito = null;

  constructor(public navCtrl: NavController, navParams: NavParams, private auth: AuthService) {
    this.linha = navParams.data.linha;
    this.cdLinha = this.linha.cd_linha;
    this.dsLinha = this.linha.ds_linha;
    this.uid = this.auth.getUID();

    this.ref.orderByChild('uid').equalTo(this.auth.getUID()).on('value', resp => {
      this.favoritos = [];
      this.favoritos = snapshotToArray(resp);

      this.favoritos.forEach(fav => {
        if ((<any>Object).values(fav).includes(this.cdLinha)) {
          this.isFavorito = true;
          this.keyFavorito = fav.key;
        }
      });
    });
  }

  goToHorarios(linha, dia) {
    const params = {
      linha: linha,
      dia: dia
    };
    this.navCtrl.push(Horarios, params);
  }

  goToMapa(linha) {
    const params = {
      linha: linha
    };
    this.navCtrl.push(Mapa, params);
  }

  postFavorito(cdLinha, dsLinha) {
    const postData = {
      cd_linha: cdLinha,
      ds_linha: dsLinha,
      uid: this.uid
    };

    const newFavKey = firebase.database().ref().child('favoritos').push().key;

    const updates = {};
    updates['/favoritos/' + newFavKey] = postData;

    return firebase.database().ref().update(updates);
  }

  deleteFavorito() {
    return firebase.database().ref('favoritos/' + this.keyFavorito).remove().then(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
  }
}
