import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Config } from '../config';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../pages/components/components.module';
import { GoogleMapsModule } from '../pages/google-maps/google-maps.module';
import { HomeModule } from '../pages/home/home.module';
import { SlideBoxModule } from '../pages/slide-box/slide-box.module';
import { WordpressModule } from '../pages/wordpress/wordpress.module';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AuthService } from '../services/auth.service';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { LINHASPage } from '../pages/linhas/linhas';
import { LINHASELECPage } from '../pages/linha-selec/linha-selec';
import { Horarios } from '../pages/horarios/horarios';
import { Mapa } from '../pages/mapa/mapa';
import { Comentarios } from '../pages/comentarios/comentarios';

@NgModule({
	declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    LINHASPage,
    LINHASELECPage,
    Horarios,
    Mapa,
    Comentarios
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig.fire),
		ComponentsModule,
		GoogleMapsModule,
		HomeModule,
		SlideBoxModule,
    WordpressModule,
    NgxErrorsModule,
    FormsModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    LINHASPage,
    LINHASELECPage,
    Horarios,
    Mapa,
    Comentarios
	],
	providers: [
		Config,
    StatusBar,
    AngularFireAuth,
    AuthService
	]
})
export class AppModule {
}
