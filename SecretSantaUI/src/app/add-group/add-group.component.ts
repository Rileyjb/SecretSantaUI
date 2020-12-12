import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../group/group-services/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit, OnDestroy {

  public open: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.groupService.openSidepanel$.subscribe( data => {
        this.open = data;
      })
    );

  }

  closePanel() {
    this.groupService.toggleSidepanel(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
