import {Injectable} from '@angular/core';
import {Measurement} from "../models/measurement";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class MeasurementRepositoryService {
  constructor(private http: HttpClient, private userService: UserService) {
  }

  private BASE = `${environment.apiUrl}users/${this.userService.userValue!!._id}/measurements`

  post(measurement: Measurement): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(this.BASE, measurement
    )
  }

  last(): Observable<Measurement> {
    return this.http.get<Measurement>(`${this.BASE}/last`)
  }

  ack(measurementId: string): Observable<any> {
    let ack = {_id: this.userService.userValue?._id!!, measurementId}
    return this.http.put(`${this.BASE}/${ack._id}`, ack)
  }
}
