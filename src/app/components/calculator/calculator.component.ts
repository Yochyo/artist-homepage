import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {Gender, Measurement} from "../../models/measurement";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {NewMeasurementPopupComponent} from "./new-measurement-popup/new-measurement-popup.component";
import {environment} from "../../../environments/environment";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {HealthService} from "../../services/health.service";
import {MeasurementRepositoryService} from "../../api/measurement-repository.service";
import {of, switchAll, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  static readonly SNACKBAR_ID = "CalculatorComponent"

  form = new FormGroup({
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),

    patientName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  }) as FormGroupTyped<Omit<Measurement, '_id' | 'userId'>>

  uploading?: boolean = undefined
  resultTable: { unit: string, state: string }[] = []

  timer?: NodeJS.Timeout

  constructor(private healthService: HealthService, private measurementRepo: MeasurementRepositoryService, private snackBar: MatSnackBar, private userService: UserService, private alertService: AlertService) {
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
          this.fillForm(next)
        },
      }
    }), CalculatorComponent.SNACKBAR_ID)
  }

  // @ts-ignore
  patchMeasurement = (next: Measurement) => this.form.patchValue({...next})

  ngOnInit(): void {
    // this.timer = setInterval(() => {
    //   this.measurementRepo.last().pipe(
    //     switchMap(last => {
    //       this.measurementRepo.ack(last._id!!)
    //       return of(last)
    //     })
    //   ).subscribe(it => {
    //     this.openSnackBar(it)
    //   })
    // }, 2000)
  }

  fillForm(measurement: Measurement) {
    this.patchMeasurement(measurement)
  }

  submit() {
    let measurement = {...this.form.value, userId: this.userService.userValue!!._id}
    console.log({measurement: measurement})
    this.uploading = true
    // this.measurementRepo.post(measurement).subscribe({
    //   next: it => {
    //     {
    //       this.generateResult({...measurement, _id: it.result} as Required<Measurement>)
    //       this.uploading = false
    //     }
    //   },
    //   error: _ => this.uploading = undefined
    // })
    setTimeout(() => {
      this.generateResult(measurement as Required<Measurement>)
      this.uploading = false
    }, 500)
  }

  generateResult(measurement: Required<Measurement>) {
    let idealWeight = this.healthService.getIdealWeight(measurement.age, measurement.gender)
    let idealHeight = this.healthService.getIdealHeight(measurement.age, measurement.gender)

    this.resultTable = [
      {
        unit: "Weight",
        state: measurement.weight < idealWeight.from ? "Too thin" : measurement.weight > idealWeight.to ? "Too fat" : "Healthy weight"
      },
      {
        unit: "Height",
        state: measurement.height < idealHeight.from ? "Too small" : measurement.height > idealHeight.to ? "Too big" : "healthy size"
      }
    ]
    //TODO die größe angeben ist irgendwie komisch. Stattdesssen sollte die größe mit dem gewicht zusammenhängen
  }


  ngOnDestroy(): void {
    const timer = this.timer
    if (timer != undefined)
      clearInterval(timer)
  }
}
