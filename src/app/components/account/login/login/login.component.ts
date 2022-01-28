import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";
import {Workbook} from "exceljs";


@Component({templateUrl: 'login.component.html', styleUrls: ['login.component.scss']})
export class LoginComponent implements OnInit {
  invalidCredentials: boolean = false
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  }) as FormGroupTyped<Pick<User, 'username' | 'password'>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: UserService,
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.accountService.login(this.form.value.username, this.form.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: _ => this.invalidCredentials = true
      });
  }

  loadRegister = () => this.router.navigate(['/account/register'], {queryParams: {returnUrl: this.route.snapshot.queryParams['returnUrl'] || '/'}})

  exportUser = async () => {
    const workbook: Workbook = new Workbook();
    const worksheet = workbook.addWorksheet("My Users");
    const buffer = await workbook.xlsx.writeBuffer()
    const b = new Blob([new Uint8Array(buffer, 0, length)]);

    const anchor: HTMLAnchorElement = document.getElementById("anchor") as HTMLAnchorElement
    const url = window.URL.createObjectURL(b);
    anchor.href = url;
    anchor.download = `${Date.now().toString()}.xlsx`;
    anchor.click()
    window.URL.revokeObjectURL(url);

    // const path = "./files";
    //  worksheet.columns = [{header: "S no.", key: "s_no", width: 10},
    //    {header: "First Name", key: "fname", width: 10},
    //    {header: "Last Name", key: "lname", width: 10},
    //    {header: "Email Id", key: "email", width: 10},
    //    {header: "Gender", key: "gender", width: 10},];// Looping through User data
    //  let counter = 1;
    // [].forEach((user) => {
    //
    //   user.s_no = counter;
    //   worksheet.addRow(user); // Add data in worksheet  counter++;});// Making first line in excel bold
    //   worksheet.getRow(1).eachCell((cell) => {
    //     cell.font = {bold: true};
    //   });
    //   try {
    //
    //     const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`).then(() => {
    //       res.send({status: "success", message: "file successfully downloaded", path: `${path}/users.xlsx`,});
    //     });
    //   } catch (err) {
    //     res.send({status: "error", message: "Something went wrong",});
    //   }
    // };
  }
}



