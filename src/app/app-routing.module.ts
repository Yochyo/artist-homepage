import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AlertGuard} from "./guards/alert.guard";

const routes: Routes = [
  {path: '', redirectTo: 'measurements', pathMatch: 'full'},
  {path: 'account', loadChildren: () => import('./components/account/account/account.module').then(m => m.AccountModule)},
  {path: 'measurements', loadChildren: () => import('./components/calculator/calculator.module').then(m => m.CalculatorModule), canActivate: [AuthGuard, AlertGuard]},
//TODO AlertGuard everywhere
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
