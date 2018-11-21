import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { snapshotToArray } from '../linhas/linhas';


import leaflet from 'leaflet';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class Mapa {
  @ViewChild('map')
  mapContainer: ElementRef;
  map: any;

  pontos = [];
  ref = null;

  linha = null;
  cdLinha = null;
  dsLinha = null;

  dsSaida = null;
  saida = null;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.linha = navParams.data.linha;
    this.cdLinha = this.linha.cd_linha;
    this.dsLinha = this.linha.ds_linha;

    this.dsSaida = navParams.data.saida;
    this.ref = firebase.database().ref('linhas/').child(this.linha.key).child('saidas').orderByChild('ds_saida');
    this.ref.equalTo(this.dsSaida).on('value', resp => {
      this.saida = snapshotToArray(resp)[0];
    });
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.pontos = [];
    this.pontos = Object.keys(this.saida.pontos).map(key => this.saida.pontos[key]);

    this.map = leaflet.map('map').fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 30
    });

    for (let pt in this.pontos) {
      if (this.pontos[pt].lat && this.pontos[pt].lng) {
        let circle = leaflet.circle([this.pontos[pt].lat, this.pontos[pt].lng], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 12
        }).addTo(this.map);
      }
    }
  }
}
