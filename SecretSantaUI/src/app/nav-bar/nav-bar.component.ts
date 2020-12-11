import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from '../login/models/Users.model';
import { UserServiceService } from '../UserServices/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() name: string = '';

  public user: Users = new Users;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser.value;
  }

}
