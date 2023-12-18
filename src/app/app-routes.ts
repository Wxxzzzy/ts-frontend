import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { CreateTeamComponent } from './components/user/create-team/create-team.component';
import { EmptyPageComponent } from './components/user/empty-page/empty-page.component';
import { NotificationsComponent } from './components/user/notifications/notifications.component';
import { TeamMainPageComponent } from './components/user/user-team/team-main-page/team-main-page.component';
import { UserTeamsComponent } from './components/user/user-teams/user-teams.component';

//TODO: nodes tree
//TODO: create more modules and refactor project structure
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: RegistrationComponent,
  },
  {
    path: 'user-page',
    component: EmptyPageComponent,
  },
  {
    path: 'user-page/my-teams',
    component: UserTeamsComponent,
  },
  {
    path: 'user-page/create-team',
    component: CreateTeamComponent,
  },
  {
    path: 'user-page/notifications',
    component: NotificationsComponent,
  },
  {
    path: 'user-page/team/:teamId',
    component: TeamMainPageComponent,
  },
];
