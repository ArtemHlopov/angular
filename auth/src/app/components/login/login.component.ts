import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({ email: '', ipv: '' });
  }
  public emailError = '';
  ngOnInit(): void {
    this.formGroup.controls['email'].valueChanges.subscribe(() => {
      if (this.formGroup.get('email')?.errors) {
        const curEr = this.formGroup.get('email')?.errors as ValidationErrors;
        this.emailError = curEr['error'];
      } else {
        this.emailError = '';
      }
    });
    this.formGroup.controls['ipv'].valueChanges.subscribe(() => {
      if (this.formGroup.get('ipv')?.errors) {
        const curErIpv = this.formGroup.get('ipv')?.errors as ValidationErrors;
        this.emailError = curErIpv['error'];
      } else {
        this.emailError = '';
      }
    });
  }
  congrats(): void {
    console.log('You take it');
  }
}
