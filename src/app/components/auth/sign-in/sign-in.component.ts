import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  /* Forms */
  signInFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    // Construct signIn form
    this.signInFormGroup = this.formBuilder.group({
      emailCtrl: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
        ]),
      ],
      passwordCtrl: [null, Validators.required],
    });
  }
  // Form Controls
  get f(): { [key: string]: AbstractControl } {
    return this.signInFormGroup.controls;
  }
}
