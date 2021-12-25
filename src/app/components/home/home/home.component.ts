import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | undefined;

  constructor(private accountService: UserService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
  }
}
