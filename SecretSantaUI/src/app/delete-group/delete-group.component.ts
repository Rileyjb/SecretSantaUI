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

  constructor(
    private groupService: GroupService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.groupService.currentGroup$.subscribe(data => {
        this.currentGroup = data;
        this.ValidateUser();
        
        console.log(data);
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
        console.log('success');
      } else {
        console.log('fail');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
