import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/UserServices/user-service.service';
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

  private subscriptions: Subscription = new Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  addUser() {
    debugger;
    var user: Users = {
    
      email: "test@nafinc.com",
      password: "tes123",
      firstName: "test",
      lastName: "test"
    }

    console.log("🚀 ~ file: login-page.component.ts ~ line 34 ~ LoginPageComponent ~ addUser ~ user", user);

    this.subscriptions.add(
      this.userService.addNewUser(user).subscribe(data => {
        console.log(data);
      })
    );
  }

  onSubmit() { 
    this.submitted = true;

    if (this.form.controls.username.errors) {
      return;
    }

    this.loading = true;

    var currentUser: Login = {
      username: <string>this.form.controls.username.value,
      password: <string>this.form.controls.password.value
    }

    console.log("🚀 ~ file: login-page.component.ts ~ line 57 ~ LoginPageComponent ~ onSubmit ~ user", currentUser);

    this.subscriptions.add(
      this.userService.getLogin(currentUser).subscribe( data => {
        console.log('data', data);
        var response: any = data;
        if (data.length > 0) {
          this.userService.setCurrentUser(data);
          //change route
          console.log('success');
          this.loading = false;
          return;
        } else {
          this.loading = false;
          console.log('fail');
          return;
        }
      })
    )
  }

}
