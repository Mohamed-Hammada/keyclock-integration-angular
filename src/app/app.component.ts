import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public url: string | null = null;
  public dddd: string | null = null;
  public obj: string | null = null;
  public tokenObj: any | null = null;
  constructor(private readonly keycloak: KeycloakService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.tokenObj = await this.keycloak.getToken();
      this.userProfile = await this.keycloak.loadUserProfile();
      this.url = document.URL;
      this.obj = JSON.stringify(this.userProfile);
    }
  }

  public login() {
    // this.keycloak.login({ acr: { values: ['yyyy'], essential: true } });
    this.keycloak.login({locale:'ar'});
  }

  public logout() {
    this.keycloak.logout('http://localhost:4200/ch');
  }
}
