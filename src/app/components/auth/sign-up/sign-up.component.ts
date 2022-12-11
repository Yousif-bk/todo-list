import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  uiState={
    isLoading: false,
    isSubmitting: false,
    action: "Error"
  }
  /* Forms */
  signUpFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    // Construct signIn form
    this.signUpFormGroup = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
        ]),
      ],
      fullName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  // Form Controls
  get f(): { [key: string]: AbstractControl } {
    return this.signUpFormGroup.controls;
  }

  openSnackBar(message: string, action:string) {
    this._snackBar.open(message, action);
  }

  signUp() {
    this.uiState.isLoading = true
    this.uiState.isSubmitting = true
    if (!this.signUpFormGroup.valid) {
      this.uiState.isLoading = false
      return
    }
    this.authService.signUp(this.signUpFormGroup.value).then((result) =>{
      this.uiState.isLoading = false;
      this.uiState.isSubmitting = false;
    }).catch((error) =>{
      this.openSnackBar(error.message,this.uiState.action)
      this.uiState.isLoading = false;
      this.uiState.isSubmitting = false;
    })
  }
}
