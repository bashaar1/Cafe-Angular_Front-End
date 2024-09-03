import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalConstants } from '../shared/global-constant';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatDialogContent, MatFormField, MatLabel,
    MatError, NgIf, MatDialogActions, MatInput, ReactiveFormsModule, MatButton, MatDialogClose],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signInForm: any = FormGroup
  responseMessageOrToken: any;

  constructor(private formBuilder: FormBuilder, private ngxService: NgxUiLoaderService,
    private userService: UserService, private dialogRef: MatDialogRef<SigninComponent>,
    private snackBar: SnackbarService, private route: Router) { }
  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    });
  }
  handleSubmit() {
    this.ngxService.start();
    const formData = this.signInForm.value;
    const data = {
      email: formData.email,
      password: formData.password
    };
    this.userService.signin(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessageOrToken = response?.token;
      localStorage.setItem("token", this.responseMessageOrToken);
      this.snackBar.openSnackBar("Successfully Logged In", "");
      this.route.navigate(['/cafe/dashboard']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessageOrToken = error.error?.message;
      }
      else {
        this.responseMessageOrToken = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessageOrToken, "error")
    });
    this.ngxService.stop();
  }
}
