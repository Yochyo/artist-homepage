import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Alert, AlertType} from "../models/alert";

@Injectable({providedIn: 'root'})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultAlert: Alert = {
    autoClose: false, fade: false, id: "default-alert", keepAfterRouteChange: false, message: "", type: AlertType.Info
  }

  // enable subscribing to alerts observable
  onAlert(id = this.defaultAlert.id): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: Partial<Omit<Alert, 'message' | 'type'>>) {
    this.alert({...this.defaultAlert, ...options, type: AlertType.Success, message})
  }

  error(message: string, options?: Partial<Omit<Alert, 'message' | 'type'>>) {
    this.alert({...this.defaultAlert, ...options, type: AlertType.Error, message})
  }

  info(message: string, options?: Partial<Omit<Alert, 'message' | 'type'>>) {
    this.alert({...this.defaultAlert, ...options, type: AlertType.Info, message})
  }

  warn(message: string, options?: Partial<Omit<Alert, 'message' | 'type'>>) {
    this.alert({...this.defaultAlert, ...options, type: AlertType.Warning, message})
  }

  // main alert method
  alert = (alert: Alert) => this.subject.next(alert);

  // clear alerts
  clear() {
    this.subject.next(this.defaultAlert);
  }
}
