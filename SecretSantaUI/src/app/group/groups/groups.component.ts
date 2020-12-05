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
    debugger;
    /** Get user id */
    this.subscriptions.add(
      this.userService.currentUser$.subscribe( id => {
        this.userId = id.id;
        console.log("🚀 ~ file: groups.component.ts ~ line 29 ~ GroupsComponent ~ ngOnInit ~ this.userId", this.userId);
        this.getGroups();
      })
    );
  }

  getGroups() {
    this.subscriptions.add(
      this.groupService.getGroupsByUserId(this.userId).subscribe( data => {
        this.groups = data;
        console.log("🚀 ~ file: groups.component.ts ~ line 37 ~ GroupsComponent ~ this.groupService.getGroupsByUserId ~ data", data);
      })
    );
  }

}
