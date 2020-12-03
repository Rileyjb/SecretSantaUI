import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/UserServices/user.service';
import { Login } from '../models/login.model';
import { Users } from '../models/Users.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public submitted: boolean = false;
  public loading: boolean = false;
  public incorrectLogin: boolean = false;
  public success: boolean = false;
  public name: string = '';

  private subscriptions: Subscription = new Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void { 
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    var currentUser: Login = {
      username: <string>this.form.controls.username.value,
      password: <string>this.form.controls.password.value
    }

    this.subscriptions.add(
      this.userService.getLogin(currentUser).subscribe( (data: any) => {
        if (data.length > 0) {
          this.name = data[0].firstname;
          this.userService.setCurrentUser(data[0]);
          //change route
          this.loading = false;
          this.incorrectLogin = false;
          this.success = true;
        } else {
          this.loading = false;
          this.success = false;
          this.incorrectLogin = true;
        }
      })
    );
  }
}
