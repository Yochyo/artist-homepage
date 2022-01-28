import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorRoutingModule} from "./calculator-routing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {NewMeasurementPopupComponent} from './new-measurement-popup/new-measurement-popup.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {CalculatorComponent} from "./calculator.component";
import {AddMeasurementComponent} from "./add-measurement/add-measurement.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [NewMeasurementPopupComponent, CalculatorComponent, AddMeasurementComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class CalculatorModule {
}
