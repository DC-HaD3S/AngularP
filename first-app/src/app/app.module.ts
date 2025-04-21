import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import routeConfig from './routes'; // your route config
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [AppComponent, AboutComponent, ContactComponent, PrivacyPolicyComponent, TermsAndConditionsComponent],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routeConfig)  // root configurations
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
