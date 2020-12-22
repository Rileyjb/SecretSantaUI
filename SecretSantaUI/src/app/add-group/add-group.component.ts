import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GroupService } from '../group/group-services/group.service';
import { Groups } from '../group/Models/Group.model';
import { UserServiceService } from '../UserServices/user.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit, OnDestroy {

  public open: boolean = false;
  public groupForm!: FormGroup;
  public submitted: boolean = false;
  public success: boolean = false;
  public failed: boolean = false;

  private subscriptions: Subscription = new Subscription();
  private userId: number = 0;

  constructor(
    private groupService: GroupService,
    private userService: UserServiceService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('currentUser')!).id;

    this.groupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.subscriptions.add(
      this.groupService.openSidepanel$.subscribe( data => {
        this.open = data;
      })
    );

  }

  createGroup() {
    this.submitted = true;

    if (this.groupForm.invalid) {
      return;
    }

    let newGroup: Groups = {
      userId: this.userId,
      groupName: this.groupForm.controls.groupName.value,
      ownerId: this.userId,
      description: this.groupForm.controls.description.value,
    }

    this.groupService.CreateNewGroup(newGroup).subscribe((data: any) => {
      if (data == 2) {
        this.success = true;
        this.submitted = false;
        this.groupForm.reset();
        this.groupForm.clearValidators();
        this.groupService.toggleSidepanel(false);
        this.success = false
      } else {
        this.failed = true
      }
      
    });
  }

  closePanel() {
    this.groupService.toggleSidepanel(false);
    this.groupForm.reset();
    this.groupForm.clearValidators();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
