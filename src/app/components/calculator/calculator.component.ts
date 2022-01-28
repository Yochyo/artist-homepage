import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {Measurement} from "../../models/measurement";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {NewMeasurementPopupComponent} from "./new-measurement-popup/new-measurement-popup.component";
import {environment} from "../../../environments/environment";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  static readonly SNACKBAR_ID = "CalculatorComponent"

  form = new FormGroup({
    gender: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
  }) as FormGroupTyped<{ gender: string, age: string, weight: string, height: string }>
  result: string = ''
  ws: WebSocketSubject<any> | undefined


  constructor(private snackBar: MatSnackBar, private userService: UserService, private alertService: AlertService) {
  }

  openSnackBar(next: Measurement) {
    this.alertService.addSnackbar(this.snackBar.openFromComponent(NewMeasurementPopupComponent, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      politeness: "assertive",
      panelClass: "snackbar",
      data: {
        onDismiss: (_: MatSnackBarRef<NewMeasurementPopupComponent>) => {
          this.alertService.close(CalculatorComponent.SNACKBAR_ID)
        },
        onLoad: (_: MatSnackBarRef<NewMeasurementPopupComponent>) => {
          this.alertService.close(CalculatorComponent.SNACKBAR_ID)
          this.patchMeasurement(next)
        },
      }
    }), CalculatorComponent.SNACKBAR_ID)
  }

  // @ts-ignore
  patchMeasurement = (next: Measurement) => this.form.patchValue({...next})

  ngOnInit(): void {
    this.ws = webSocket<Measurement>(`ws://${environment.host}/measurements/${this.userService.userValue!!._id}/last/ws`)
    setInterval(() => {
      this.ws?.next("ping")
      console.log("send ping")
    }, 2000)
    this.ws.subscribe({
      next: next => this.openSnackBar(next)
    })
  }

  check() {
    const age = Number(this.form.value.age)
    let year = Math.floor(age / 12)
    let month = age % 12

    let multipliedYear = year * 2
    let multipliedMonth = month * 2

    let yearConvertedFromMonths = multipliedYear + (Math.floor(multipliedMonth / 12))
    let monthsAfterConversion = (multipliedMonth % 12)

    this.result = `${yearConvertedFromMonths},${monthsAfterConversion}`
  }

  ngOnDestroy(): void {
    this.ws?.complete()
  }
}
