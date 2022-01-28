import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-measurement-popup',
  templateUrl: './new-measurement-popup.component.html',
  styleUrls: ['./new-measurement-popup.component.scss']
})
export class NewMeasurementPopupComponent implements OnInit {

  constructor(public ref: MatSnackBarRef<NewMeasurementPopupComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: NewMeasurementPopupComponentProps) {
  }

  ngOnInit(): void {
  }

  onDismiss = () => this.data.onDismiss(this.ref)
  onLoad = () => this.data.onLoad(this.ref)
}

export interface NewMeasurementPopupComponentProps {
  onDismiss: (snackbar: MatSnackBarRef<NewMeasurementPopupComponent>) => any
  onLoad: (snackbar: MatSnackBarRef<NewMeasurementPopupComponent>) => any
}
