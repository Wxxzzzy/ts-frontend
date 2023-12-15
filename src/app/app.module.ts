import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  ClrInputModule,
  ClrPasswordModule,
  ClrVerticalNavModule,
} from '@clr/angular';
import { routes } from './app-routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { MainPageComponent } from './components/main-page';
import { AdminPanelComponent } from './components/main-page/shared/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
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
    ClrVerticalNavModule,
    FlexModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
