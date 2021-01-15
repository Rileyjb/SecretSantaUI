import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GroupService } from '../group/group-services/group.service';
import { Groups } from '../group/Models/Group.model';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  @ViewChild('closeButton')
  public closeButton!: ElementRef;

  public currentGroup: Groups = new Groups();
  public editForm!: FormGroup;
  public canEdit: boolean = false;
  public deleteFailed: boolean = false;
  public saveSuccess: boolean = false;
  public saveFail: boolean = false;
  public leaveFail: boolean = false;

  constructor(
    private groupService: GroupService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.groupService.currentGroup$.subscribe(data => {
        this.currentGroup = data;
        this.ValidateUser();
      })
    );

    this.CreateGroup();
  }

  public CreateGroup(): void {
    this.editForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      groupDescription: ['', Validators.required],
      addCode: [{value: '', disabled: true}]
    });
  }

  private ValidateUser(): void {
    this.deleteFailed = false;
    this.saveSuccess = false;
    this.saveFail = false;
    this.leaveFail = false;

    const saveButton = document.querySelector('.save-button');
    this.canEdit = this.currentGroup.userId === this.currentGroup.ownerId;

    this.editForm.controls['groupName'].setValue(this.currentGroup.groupName);
    this.editForm.controls['groupDescription'].setValue(this.currentGroup.description);
    this.editForm.controls['addCode'].setValue(this.currentGroup.addCode);

    this.canEdit ? this.editForm.controls['groupName'].enable() : this.editForm.controls['groupName'].disable();
    this.canEdit ? this.editForm.controls['groupDescription'].enable() : this.editForm.controls['groupDescription'].disable();

    this.canEdit ? saveButton?.setAttribute('data-toggle', '') : saveButton?.setAttribute('data-toggle', 'tooltip');
    this.canEdit ? saveButton?.setAttribute('data-placement', '') : saveButton?.setAttribute('data-placement', 'top');
    this.canEdit ? saveButton?.setAttribute('title', '') : saveButton?.setAttribute('title', "You cannot edit groups you don't own");
  }

  public DeleteGroup(): void {
    this.groupService.DeleteGroup(this.currentGroup.groupId).subscribe((data: any) => {
      if (data > 1){
        this.groupService.UpdateGroups(true);
        this.closeButton.nativeElement.click();
      } else {
        this.deleteFailed = true;
      }
    });
  }

  public SaveGroup(): void {

    if(!this.editForm.valid) {
      return;
    }

    const updatedGroup: Groups = {
      groupId: this.currentGroup.groupId,
      groupName: this.editForm.controls.groupName.value,
      description: this.editForm.controls.groupDescription.value,
      addCode: this.currentGroup.addCode,
      userId: this.currentGroup.userId
    };

    this.groupService.SaveGroup(updatedGroup).subscribe((data: any) => {
      if(data > 0) {
        this.saveSuccess = true;
        this.saveFail = false;
        this.groupService.UpdateGroups(true);
        this.closeButton.nativeElement.click();
      } else {
        this.saveSuccess = false;
        this.saveFail = true;
      }
    });
  }

  public LeaveGroup(): void {
    this.groupService.LeaveGroup(this.currentGroup.groupId!, this.currentGroup.userId).subscribe((data: any) => {
      if(data > 0) {
        this.leaveFail = false;
        this.groupService.UpdateGroups(true);
        this.closeButton.nativeElement.click();
      } else {
        this.leaveFail = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
