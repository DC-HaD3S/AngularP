import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { ManageHousesComponent } from './components/manage-houses/manage-houses.component';
import { AuthGuard } from './core/auth.guard';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Us'
  },
  { 
    path: 'privacy-policy', 
    component: PrivacyPolicyComponent, 
    title: 'Privacy Policy' 
  },
  { 
    path: 'terms-and-conditions', 
    component: TermsAndConditionsComponent, 
    title: 'Terms & Conditions' 
  },
  { 
    path: 'manage-houses', 
    component: ManageHousesComponent, 
    title: 'Manage Houses', 
    canActivate: [AuthGuard] 
  }
];

export default routeConfig;