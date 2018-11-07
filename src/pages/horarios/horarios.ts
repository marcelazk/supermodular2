import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html'
})
export class Horarios {

  linha = null;
  dia = null;
  cdLinha = null;
  dsLinha = null;
  horariosAux = null;
  horarios = [];

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.linha = navParams.data.linha;
    this.dia = navParams.data.dia;
    this.cdLinha = this.linha.cd_linha;
    this.dsLinha = this.linha.ds_linha;

    if (this.dia === 'Semana') {
      this.horariosAux = this.linha.horarios.semana;

    } else if (this.dia === 'Sábado') {
      this.horariosAux = this.linha.horarios.sabado;

    } else if (this.dia === 'Domingo') {
      this.horariosAux = this.linha.horarios.domingo;
    }

    this.horarios = [];
    this.horarios = Object.keys(this.horariosAux).map(key => this.horariosAux[key]);
  }


}
