import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import {AccountComponent} from "./account.component";
import {RegisterComponent} from "../register/register/register.component";
import {LoginComponent} from "../login/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [AccountComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
