import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { NavParams } from 'ionic-angular';
import { Searchbar } from 'ionic-angular';

import { LINHASELECPage } from '../linha-selec/linha-selec';

import * as firebase from 'Firebase';

@Component({
  selector: 'page-linhas',
  templateUrl: 'linhas.html'
})
export class LINHASPage {

  constructor(public navCtrl: NavController, navParams: NavParams) {
    // SCRIPT USADO APENAS PARA CHAMAR snapshotToArray EM OUTRAS PAGINAS.
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
