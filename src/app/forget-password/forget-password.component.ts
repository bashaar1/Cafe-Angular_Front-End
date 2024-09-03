import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constant';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatDialogContent,
    MatFormField, MatLabel, MatError, NgIf, MatDialogActions, ReactiveFormsModule, MatButton, MatInput, MatDialogClose],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetPasswordForm: any = FormGroup;
  responseMessage: any = "";
  constructor(private ngxloader: NgxUiLoaderService, private route: Router,
    private dialogRef: MatDialogRef<ForgetPasswordComponent>,
    private formBuilder: FormBuilder, private userService: UserService, private snackBar: SnackbarService) { }
  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  handleSubmit() {
    this.ngxloader.start();
    const formData = this.forgetPasswordForm.value;
    const data = {
      email: formData.email
    };
    this.userService.forgetPassword(data).subscribe((response: any) => {
      this.ngxloader.stop();
      this.dialogRef.close();
      console.log(response);
      this.responseMessage = response?.message;
      this.snackBar.openSnackBar(this.responseMessage, '');
    }, (error) => {
      this.ngxloader.stop();
      if (error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;

      }
      this.snackBar.openSnackBar(this.responseMessage, '');

    });
  }
}
