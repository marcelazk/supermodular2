import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LINHASELECPage } from '../linha-selec/linha-selec';

import * as firebase from 'Firebase';

@Component({
  selector: 'page-linhas',
  templateUrl: 'linhas.html'
})
export class LINHASPage {

  linhas = [];
  ref = firebase.database().ref('linhas/');

  constructor(public navCtrl: NavController) {
    this.ref.on('value', resp => {
      this.linhas = [];
      this.linhas = snapshotToArray(resp);
    });
  }

  filterItems() {
    // this.linhas = this.linhas.filter((linha) => {
    //     return linha.data.title.toLowerCase().indexOf(this.searchLinha.toLowerCase()) > -1;
    // });
  }

  filterLinhas() {
    // var input, filter, ul, li, a, i;
    // input = document.getElementById("linhas-search");
    // filter = this.searchLinha.toUpperCase();
    // ul = document.getElementById("linhas-list");
    // li = ul.getElementsByTagName("ion-item");
    // for (i = 0; i < li.length; i++) {
    //     a = li[i].getElementsByTagName("p")[0];
    //     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //         li[i].style.display = "";
    //     } else {
    //         li[i].style.display = "none";
    //     }
    // }
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
