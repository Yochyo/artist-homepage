import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() value: string = ''
  form!: FormControl


  constructor(
    private userService: UserService,
    private router: Router
  ) {
    if (this.userService.user) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = new FormControl(this.value)
  }

}
