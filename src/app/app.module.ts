import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClrInputModule, ClrPasswordModule } from '@clr/angular';
import { routes } from './app-routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, MainPageComponent],
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
