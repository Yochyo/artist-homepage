import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    if (this.userService.user) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
