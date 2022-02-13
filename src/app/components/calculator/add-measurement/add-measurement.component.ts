import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Measurement} from "../../../models/measurement";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertService} from "../../../services/alert.service";
import {MeasurementRepositoryService} from "../../../api/measurement-repository.service";

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent implements OnInit {
  static readonly SNACKBAR_ID = "AddMeasurementComponent"
  form = new FormGroup({
    patientName: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
  }) as FormGroupTyped<Pick<Measurement, 'patientName' | 'weight' | 'height'>>

  constructor(private measurementRepo: MeasurementRepositoryService, private http: HttpClient, private userService: UserService, private snackBar: MatSnackBar, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  send() {
    const userId = this.userService.userValue!!._id
    const measurement: Measurement = {
      patientName: this.form.value.patientName,
      weight: this.form.value.weight,
      height: this.form.value.height,
      userId
    }
    this.measurementRepo.post(measurement).subscribe(_ => this.openSnackBar())

  }

  openSnackBar() {
    const snack = this.alertService.addSnackbar(this.snackBar.open("Sent", "Close", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
    }), AddMeasurementComponent.SNACKBAR_ID)
    snack.onAction().subscribe({
      next: _ => this.alertService.close(AddMeasurementComponent.SNACKBAR_ID)
    })
  }
}
