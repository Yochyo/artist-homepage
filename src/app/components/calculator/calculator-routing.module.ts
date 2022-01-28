import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalculatorComponent} from "./calculator.component";
import {AddMeasurementComponent} from "./add-measurement/add-measurement.component";


const routes: Routes = [
  {path: '', component: CalculatorComponent},
  {path: 'add', component: AddMeasurementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorRoutingModule {
}
