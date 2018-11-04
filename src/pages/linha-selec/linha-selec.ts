import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { Horarios } from '../horarios/horarios';
import { Mapa } from '../mapa/mapa';

@Component({
  selector: 'page-linha-selec',
  templateUrl: 'linha-selec.html'
})
export class LINHASELECPage {

  linha = null;
  cdLinha = null;
  dsLinha = null;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.linha = navParams.data.linha;
    this.cdLinha = this.linha.cd_linha;
    this.dsLinha = this.linha.ds_linha;
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

}
