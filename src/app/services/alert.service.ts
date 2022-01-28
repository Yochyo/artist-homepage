import {Injectable} from '@angular/core';
import {MatSnackBarRef} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class AlertService {
  private alerts: Alert[] = []

  addSnackbar = <T extends MatSnackBarRef<E>, E>(snackbar: T, id: number | string): T => this.add(snackbar, id, snackbar.dismiss)

  close(id: number | string): boolean {
    const alerts = this.alerts.filter(it => it.id === id)
    if (alerts.length == 0) return false

    alerts.forEach(it => it.close())
    this.alerts = this.alerts.filter(it => it.id !== id)
    return true
  }

  clear() {
    this.alerts.forEach(it => it.close())
    this.alerts = []
  }

  private add<T>(alert: T, id: number | string, close: () => void): T {
    this.getAlerts(id).forEach(it => this.close(it.id))

    this.alerts.push({id, close})
    return alert
  }

  private getAlerts = (id: number | string): Alert[] => this.alerts.filter(it => it.id === id)
}

type Alert = { id: number | string, close: () => void }
