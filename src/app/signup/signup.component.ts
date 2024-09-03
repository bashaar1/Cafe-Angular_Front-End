import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constant';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatDialogContent, MatFormField, ReactiveFormsModule,
    MatInputModule, MatLabel, MatError, NgIf, MatInputModule, MatDialogActions, MatButton, MatDialogClose],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: any = FormGroup;
  responseMessage: any;
  constructor(private formBuilder: FormBuilder, private route: Router, private userService: UserService,
    private snackBar: SnackbarService, private dialodRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]],

    })
  }

  handleSubmit() {
    this.ngxService.start();
    const formData = this.signupForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
    this.userService.signup(data).subscribe((response: any) => {
      console.log(response);
      this.ngxService.stop();
      this.dialodRef.close();
      this.responseMessage = response?.message;
      this.snackBar.openSnackBar(this.responseMessage, "");
      this.route.navigate(['/']);
    }, (error) => {
      this.ngxService.stop();
      if (error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage, "");
    });
  }
}
function handleSubmit() {
  throw new Error('Function not implemented.');
}

