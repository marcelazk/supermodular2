import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { WordpressListPage } from '../wordpress/list/wordpress.list.page';
import { SlideBoxPage } from '../slide-box/slide-box.page';
import { GoogleMapsPage } from '../google-maps/google-maps.page';

import { Tile } from './models/tile.model';
import { InAppBrowserService } from '../../services/in-app-browser.service';
import { data } from './home-data';

import { LINHASPage } from '../linhas/linhas';
import { LINHASELECPage } from '../linha-selec/linha-selec';

import * as firebase from 'Firebase';

@Component({
	templateUrl: 'home.html',
	providers: []
})
export class HomePage {
	public tiles: Tile[][];

	private nav: Nav;

	constructor(
		nav: Nav
	) {
		this.nav = nav;
	}

	public navigateTo(tile) {
		this.nav.setRoot(tile.component);
  }

  goToLINHAS(params){
    if (!params) {
      params = {};
    }
    this.nav.push(LINHASPage);
  }

  goToLinhaSelec(params){
    if (!params) {
      params = {};
    }
    this.nav.push(LINHASELECPage);
  }
}
