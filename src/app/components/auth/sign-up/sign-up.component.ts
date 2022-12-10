import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

   /* Forms */
  signUpFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    // Construct signIn form
    this.signUpFormGroup = this.formBuilder.group({
      emailCtrl: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
        ]),
      ],
      fullname: [null, Validators.required],
      passwordCtrl: [null, Validators.required],
    });
  }
  // Form Controls
  get f(): { [key: string]: AbstractControl } {
    return this.signUpFormGroup.controls;
  }

}
