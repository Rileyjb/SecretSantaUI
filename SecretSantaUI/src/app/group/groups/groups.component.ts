import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { GroupService } from '../group-services/group.service';
import { Groups } from '../Models/Group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private userId: number = 0;

  public groups: any;
  public show: boolean = false;
  public hasData: boolean = false;
  public faEllipse = faEllipsisV;
  public addCode: string = '';
  public addError: boolean = false;
  public addSuccess: boolean = false;

  constructor(
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /** Get user id */
    this.userId = JSON.parse(localStorage.getItem('currentUser')!).id;

    this.getGroups();

    this.groupService.searchGroup$.subscribe(data => {
      this.SearchGroups(data);
    });
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.groupService.updateGroup$.subscribe(data => {
        if (data) {
          this.getGroups();
          this.groupService.UpdateGroups(false);
        }
      })
    );
  }

  private SearchGroups(searchStr: string): void {
    const groups = document.querySelector('.groups');
    
    if(!searchStr || searchStr === undefined) {
      groups?.querySelectorAll('.card').forEach(card => {
        card.removeAttribute('hidden');
      });
    } else {
      groups?.querySelectorAll('.card').forEach(card => {
        if(!card.getAttribute('id')?.toUpperCase().includes(searchStr.toUpperCase())) {
          card.setAttribute('hidden', 'true');
        } else {
          card.removeAttribute('hidden');
        }
      });
    }
  }

  private getGroups(): void {
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

  public joinGroup(): void {
    let newGroup: Groups = {
      userId: this.userId,
      addCode: this.addCode,
    }

    this.subscriptions.add(
      this.groupService.JoinGroup(newGroup).subscribe( (data: any) => {
        if (data === 1) {
          this.addCode = '';
          this.addSuccess = true;
          this.addError = false;
          this.getGroups();
        } else {
          this.addError = true;
          this.addSuccess = false;
        }
      })
    );
  }

  public editGroup(currentGroup: Groups): void {
      this.groupService.SetCurrentGroup(currentGroup);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
