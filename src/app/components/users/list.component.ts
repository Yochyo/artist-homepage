import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users: User[] | undefined;

    constructor(private accountService: UserService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users?.find(x => x.id === id);
      //TODO  user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users?.filter(x => x.id !== id));
    }
}
