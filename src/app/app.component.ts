import {Component} from '@angular/core';
import {UserService} from "./services/user.service";
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private userService: UserService
  ) {
    console.log("works")
  }

  get user(): User | undefined {
    return this.userService.userSubject.value
  }

  logout = () => this.userService.logout()
}
