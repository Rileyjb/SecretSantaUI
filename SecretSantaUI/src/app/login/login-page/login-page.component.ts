import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/UserServices/user.service';
import { Login } from '../models/login.model';
import { Users } from '../models/Users.model';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public submitted: boolean = false;
  public loading: boolean = false;
  public incorrectLogin: boolean = false;
  public success: boolean = false;
  public name: string = '';
  public eyeSlash = faEyeSlash;
  public eye = faEye;
  public showPass = false

  private subscriptions: Subscription = new Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public showPassword() {
    this.showPass = !this.showPass;
  }

  public loginGuest() {
    var guest: Users = {
      id: 1,
      email: 'Guest@gmail.com',
      firstName: 'Guest'
    };

    this.userService.setCurrentUser(guest);
    this.loginService.setLoginStatus(true);
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
      this.loginService.getLogin(currentUser).subscribe( (data: any) => {
        if (data.length > 0) {
          this.name = data[0].firstname;

          this.userService.setCurrentUser(data[0]);
          this.loginService.setLoginStatus(true);
          
          this.loading = false;
          this.incorrectLogin = false;
          this.success = true;

          this.router.navigate(['groups']);
        } else {
          this.loading = false;
          this.success = false;
          this.incorrectLogin = true;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
