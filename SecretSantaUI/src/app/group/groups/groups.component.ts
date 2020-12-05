import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/UserServices/user.service';
import { GroupService } from '../group-services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  private subscriptions: Subscription = new Subscription();
  private userId: number = 0;
  public groups: any;
  

  constructor(
    private userService: UserServiceService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    /** Get user id */
    this.userId = this.userService.userId.value;
    this.getGroups()
  }

  getGroups() {
    this.subscriptions.add(
      this.groupService.getGroupsByUserId(this.userId).subscribe( data => {
        this.groups = data;
      })
    );
  }

}
