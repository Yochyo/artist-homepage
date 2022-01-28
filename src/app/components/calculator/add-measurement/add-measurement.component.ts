import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Measurement} from "../../../models/measurement";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent implements OnInit {
  static readonly SNACKBAR_ID = "AddMeasurementComponent"
  form = new FormGroup({
    age: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
  })

  constructor(private http: HttpClient, private userService: UserService, private snackBar: MatSnackBar, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  send() {
    const userId = this.userService.userValue!!._id
    const body: Measurement = {
      age: this.form.value.age,
      weight: this.form.value.age,
      height: this.form.value.age,
      userId: userId
    }
    this.http.post(`${environment.apiUrl}measurements/${userId}`, body).subscribe()
    this.openSnackBar()
  }

  openSnackBar() {
    const snack = this.alertService.addSnackbar(this.snackBar.open("Sent", "Close", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2000,
    }), AddMeasurementComponent.SNACKBAR_ID)
    snack.onAction().subscribe({
      next: _ => this.alertService.close(AddMeasurementComponent.SNACKBAR_ID)
    })
  }
}
