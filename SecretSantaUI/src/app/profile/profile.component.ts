import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Users } from '../login/models/Users.model';
import { UserServiceService } from '../UserServices/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser: Users = new Users();
  public form!: FormGroup;
  public submitted: boolean = false;
  public formErrors: boolean = false;
  public loading: boolean = false;
  public updated: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    this.form = this.formBuilder.group({
      email: [this.currentUser.email, [Validators.email, Validators.required]],
      firstname: [this.currentUser.firstName, Validators.required],
      lastname: [this.currentUser.lastName, Validators.required],
      amazonlink: [this.currentUser.amazonLink]
    });
  }

  public UpdateProfile(): void {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      this.formErrors = true;
      this.loading = false;
      return;
    }

    this.formErrors = false;

    let updatedProfile: Users = {
      id: this.currentUser.id,
      email: this.form.controls.email.value,
      firstName: this.form.controls.firstname.value,
      lastName: this.form.controls.lastname.value,
      amazonLink: this.form.controls.amazonlink.value
    };

    this.subscriptions.add(
      this.userService.updateUser(updatedProfile).subscribe((data: Users) => {
        if (data.email !== null) {
          this.updated = true;
          localStorage.setItem('currentUser', JSON.stringify(updatedProfile));
          this.currentUser = updatedProfile;
        } else {
          this.formErrors = true;
        }

        this.loading = false;
      })
    );
  }
}
