import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { RegistrationButtonComponent } from './components/registration-button/registration-button.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationButtonComponent
  },
  {
    path: 'personal-information',
    component: PersonalInformationComponent
  },
  {
    path: 'contact-information',
    loadChildren: () => import('./components/contact-information/contact-information.module').then(m => m.ContactInformationModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
