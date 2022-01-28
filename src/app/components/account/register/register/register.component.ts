import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first, switchMap} from 'rxjs/operators';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";

@Component({selector: "", templateUrl: 'register.component.html', styleUrls: ['register.component.scss']})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }) as FormGroupTyped<Pick<User, 'username' | 'password'>>;
  _form = this.form as FormGroup
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.userService.register({username: this.form.value.username, password: this.form.value.password})
      .subscribe({
        next: user => {
          console.log({user: user})
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
      });
  }

  loadLogin = () => this.router.navigate(['/account/login'], {queryParams: {returnUrl: this.route.snapshot.queryParams['returnUrl'] || '/'}})
}
