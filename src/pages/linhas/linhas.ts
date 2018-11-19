import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { LINHASELECPage } from '../linha-selec/linha-selec';

import * as firebase from 'Firebase';

@Component({
  selector: 'page-linhas',
  templateUrl: 'linhas.html'
})
export class LINHASPage {

  linhas = [];
  linhasAux = [];
  ref = firebase.database().ref('linhas/');
  searchLinha;

  constructor(public navCtrl: NavController) {
    this.ref.on('value', resp => {
      this.linhas = [];
      this.linhasAux = [];
      this.linhas = snapshotToArray(resp);
      this.linhasAux = snapshotToArray(resp);
    });
  }

  filterLinhas() {
    this.linhas = this.linhasAux;
    this.linhas = this.linhasAux.filter((linha) => {
        return linha.ds_linha.toLowerCase().indexOf(this.searchLinha.toLowerCase()) > -1
          || linha.cd_linha.toString().indexOf(this.searchLinha.toLowerCase()) > -1;
    });
  }

  goToLinhaSelec(linha){
    const params = {
      linha: linha
    };
    this.navCtrl.push(LINHASELECPage, params);
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
