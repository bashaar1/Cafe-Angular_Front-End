import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private dialog: MatDialog, private route: Router, private userService: UserService) { }
  signUpAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent, dialogConfig);
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.userService.checkToken().subscribe((response: any) => {
        this.route.navigate(['/cafe/dashboard']);
      }, (error: any) => {
        console.log(error);
      });
    }
  }
  signInAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SigninComponent, dialogConfig);
  }
  forgetPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ForgetPasswordComponent, dialogConfig);
  }
}
