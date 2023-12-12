import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';

//TODO: nodes tree
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'main-page',
    component: MainPageComponent,
  },
];
