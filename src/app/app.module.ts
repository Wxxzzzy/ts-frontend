import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClrInputModule, ClrPasswordModule } from '@clr/angular';
import { routes } from './app-routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdminPanelComponent } from './components/main-page/shared/admin-panel/admin-panel.component';
import { SideBarMenuComponent } from './components/side-bar-menu/side-bar-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    SideBarMenuComponent,
    AdminPanelComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    ClrInputModule,
    FormsModule,
    ClrPasswordModule,
    HttpClientModule,
    //onSameUrlNavigation: 'reload'
    //paramsInheritanceStrategy: 'always'
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
