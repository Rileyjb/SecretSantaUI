import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/UserServices/user.service';
import { GroupService } from '../group-services/group.service';
import { Groups } from '../Models/Group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  private userId: number = 0;

  public groups: any;
  public hasData: boolean = false;
  public faEllipse = faEllipsisV;
  public show: boolean = false;
  public addCode: string = '';

  constructor(
    private userService: UserServiceService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    /** Get user id */
    this.userId = this.userService.userId.value;
    this.getGroups();
  }

  getGroups() {
    this.subscriptions.add(
      this.groupService.getGroupsByUserId(this.userId).subscribe( data => {
        this.groups = data;
        if (this.groups.length > 0) {
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      })
    );
  }

  joinGroup() {
    let newGroup: Groups = {
      userId: this.userId,
      addCode: this.addCode,
    }

    this.subscriptions.add(
      this.groupService.JoinGroup(newGroup).subscribe( data => {
        console.log('join group', data);
      })
    );

    // TODO: make page show newly added group
    this.getGroups();

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
