import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import leaflet from 'leaflet';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class Mapa {
  @ViewChild('map')
  mapContainer: ElementRef;
  map: any;

  linha = null;
  cdLinha = null;
  dsLinha = null;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.linha = navParams.data.linha;
    this.cdLinha = this.linha.cd_linha;
    this.dsLinha = this.linha.ds_linha;
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map('map').fitWorld();
    leaflet
      .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      })
      .addTo(this.map);
    this.map
      .locate({
        setView: true,
        maxZoom: 30
      });
  }
}
