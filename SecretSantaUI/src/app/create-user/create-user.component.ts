import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Login } from '../login/models/login.model';
import { Users } from '../login/models/Users.model';
import { LoginService } from '../login/Services/login.service';
import { UserServiceService } from '../UserServices/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public form!: FormGroup;
  public eyeSlash = faEyeSlash;
  public eye = faEye;
  public showPass: boolean = false;
  public showConfirmPass: boolean = false;
  public submitted: boolean = false;
  public loading: boolean = false;
  public incorrectLogin: boolean = false;
  public success: boolean = false;
  public failed: boolean = false;


  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', [Validators.required]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      amazonlink: ['']
    },
    {
      validator: this.MustMatch
    });
  }

  MustMatch(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPass'].value ? null : {'mismatch': true};
  }

  public showPassword() {
    this.showPass = !this.showPass;
  }

  public showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass;
  }

  public onSubmit(): void { 
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    var newUser: Users = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      firstName: this.form.controls.firstname.value,
      lastName: this.form.controls.lastname.value,
      amazonLink: this.form.controls.amazonlink.value
    }

    this.subscriptions.add(
      this.userService.addNewUser(newUser).subscribe( (data: any) => {
        if (data == 'User added successfully') {
          this.userService.setCurrentUser(newUser);
          this.loginService.setLoginStatus(true);
          
          this.loading = false;
          this.success = true;

          this.router.navigate(['groups']);
        } else {
          this.failed = true;
        }
      })
    );
  }

}
