import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  ClrDatalistModule,
  ClrDropdownModule,
  ClrInputModule,
  ClrModalModule,
  ClrPasswordModule,
  ClrVerticalNavModule,
} from '@clr/angular';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app-routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { CreateTeamComponent } from './components/user/create-team/create-team.component';
import { EmptyPageComponent } from './components/user/empty-page/empty-page.component';
import { NotificationsComponent } from './components/user/notifications/notifications.component';
import { DashboardComponent } from './components/user/user-team/team-main-page/shared/dashboard/dashboard.component';
import { RightSideMenuComponent } from './components/user/user-team/team-main-page/shared/right-side-menu/right-side-menu.component';
import { TaskComponent } from './components/user/user-team/team-main-page/shared/task/task.component';
import { TeamMainPageComponent } from './components/user/user-team/team-main-page/team-main-page.component';
import { UserTeamsComponent } from './components/user/user-teams/user-teams.component';
import { APP_INTERCEPTORS } from './interceptors';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NotificationsComponent,
    UserTeamsComponent,
    CreateTeamComponent,
    EmptyPageComponent,
    TeamMainPageComponent,
    RightSideMenuComponent,
    DashboardComponent,
    TaskComponent,
    AdminPageComponent,
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
    //Toastr
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ClrModalModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    ClrDropdownModule,
    ClrDatalistModule,
  ],
  exports: [RouterModule],
  providers: [...APP_INTERCEPTORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
