import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ContextResolver } from './shared/context-resolver.service';
import { ContextCurrentUserAuthGuard } from './shared/context-current-user-auth-guard.service';


export const routes: Routes = [

  // Only relevant locally, as the landing page sits on / in production
  {
    path: '',
    redirectTo: '/rhn-support-pmuir',
    pathMatch: 'full'
  },
  // Temporary page to control the app
  {
    path: '_control',
    loadChildren: './control/control.module#ControlModule'
  },

  // Home
  {
    path: '_home',
    loadChildren: './home/home.module#HomeModule'
  },

  // Profile
  {
    path: ':entity',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './profile/profile.module#ProfileModule'
  },

  // Settings
  {
    path: ':entity/_settings',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './settings/settings.module#SettingsModule'
  },

  // Analyze
  {
    path: ':entity/:space',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './analyze/analyze.module#AnalyzeModule'
  },

  // Plan
  {
    path: ':entity/:space/plan',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './plan/plan.module#PlanModule'
  },

  // Create
  {
    path: ':entity/:space/create',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './create/create.module#CreateModule'
  },

  // Run
  {
    path: ':entity/:space/run',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './run/run.module#RunModule'
  },

  // Space-settings
  {
    path: ':entity/:space/settings',
    resolve: {
      context: ContextResolver
    },
    canActivate: [ContextCurrentUserAuthGuard],
    canActivateChild: [ContextCurrentUserAuthGuard],
    loadChildren: './space-settings/space-settings.module#SpaceSettingsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
