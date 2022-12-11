import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  uiState = {
    isLoading:false,
  }
  /* Forms */
  signInFormGroup: FormGroup;
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
    this.signInFormGroup = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
        ]),
      ],
      password: [null, Validators.required],
    });
  }


  // Form Controls
  get f(): { [key: string]: AbstractControl } {
    return this.signInFormGroup.controls;
  }


  // Show Message
  openSnackBar(message: string, action:string) {
    this._snackBar.open(message, action);
  }

  //Sign in
  signIn(){
    this.uiState.isLoading = true;
    if (!this.signInFormGroup.valid) {
      return;
    }
    this.authService.signIn(this.signInFormGroup.value).then((result) => {
      this.uiState.isLoading = false;
    }).catch((error) =>{
      this.openSnackBar(error.message,"Error")
      this.uiState.isLoading = false;
    })
  }
}
