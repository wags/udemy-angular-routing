import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { EditServerComponent } from 'app/servers/edit-server/edit-server.component';
import { ServerComponent } from 'app/servers/server/server.component';
import { ServersComponent } from 'app/servers/servers.component';
import { UserComponent } from 'app/users/user/user.component';
import { UsersComponent } from 'app/users/users.component';
import { HomeComponent } from 'app/home/home.component';
import { AuthGuard } from 'app/auth-guard.service';
import { CanDeactivateGuard } from 'app/servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from 'app/error-page/error-page.component';
import { ServerResolver } from 'app/servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, { useHash: true })
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
