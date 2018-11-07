import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

import { snapshotToArray } from '../linhas/linhas';

import * as firebase from 'Firebase';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
	templateUrl: 'comentarios.html',
	providers: []
})
export class Comentarios {

  private nav: Nav;

  comentarios = [];
  ref = firebase.database().ref('comentarios/');

  linha = null;
  cdLinha = null;
  dsLinha = null;

	constructor(nav: Nav, private auth: AuthService, navParams: NavParams) {
    this.nav = nav;
    this.linha = navParams.data.linha;
    this.cdLinha = this.linha.cd_linha;
    this.dsLinha = this.linha.ds_linha;

    this.ref.orderByChild('cd_linha').equalTo(this.cdLinha).on('value', resp => {
      this.comentarios = [];
      this.comentarios = snapshotToArray(resp);
    });

	}
}
