import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userSubject: BehaviorSubject<User | undefined>;
  public user: Observable<User | undefined>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | undefined>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | undefined {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const params = new HttpParams()
      .set("username", username)
      .set("password", password)
    return this.http.get<User>(`${environment.apiUrl}users/auth`, {params})
      .pipe(tap(user => this.setUser(user)));
  }

  logout() {
    this.setUser(undefined)
    this.router.navigate(['/account/login']);
  }

  register(user: Omit<User, '_id'>) {
    return this.http.post<User>(`${environment.apiUrl}users`, user).pipe(
      tap(user => this.setUser(user))
    );
  }

  private setUser(user: User | undefined) {
    user == undefined ? localStorage.removeItem('user') : localStorage.setItem('user', JSON.stringify(user))
    this.userSubject.next(user);
  }
}
