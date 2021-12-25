import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home/home.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard]},
  {path: 'account', loadChildren: () => import('./components/account/account/account.module').then(m => m.AccountModule)},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
