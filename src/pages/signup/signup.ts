import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController } from "ionic-angular";
import { HomePage } from "../home/home.page";

import { AuthService } from "../../services/auth.service";
import * as firebase from 'firebase/app';

@Component({
  selector: "as-page-signup",
  templateUrl: "./signup.html"
})
export class SignupPage {
  signupError: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService
  ) {
    this.form = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      username: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ]
    });
  }

  signup() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      () => {
        firebase.auth().currentUser.updateProfile({
          displayName: data.username,
          photoURL: null
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });
        this.navCtrl.setRoot(HomePage);
      },
      error => (this.signupError = error.message)
    );

    // this.auth.signUp(credentials).then(
    // 	() => this.navCtrl.setRoot(HomePage),
    // 	error => this.signupError = error.message
    // );
  }
}
