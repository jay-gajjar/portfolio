import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private httpClient = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  secretKey = 'xrgwzgwe';
  isLoading = false;
  emailForm: FormGroup;
  showSnackBar = false;
  message = '';
  snackbarTimeOut: any;

  constructor() {
    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendEmail(formData: any) {
    if (this.isLoading) {
      return;
    }
    if (this.emailForm.invalid) {
      this.displaySnackBar('Please fill required fields & Valid details...');
      return;
    }
    this.isLoading = true;
    //Set the url with your secretKey from formspree.io
    const url = 'https://formspree.io/f/' + this.secretKey;
    //Set Headers
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    const data = `name=${formData.name}&email=${formData.email}&message=${formData.message}`;
    let errorMessage = '';
    this.httpClient.post(url, data, httpOptions).subscribe({
      next: () => {
        this.isLoading = false;
        this.displaySnackBar('Thank you for filling out your information!');
      },
      error: (error) => {
        this.isLoading = false;
        errorMessage = error.message;
        console.log('error!', errorMessage);
      },
    });
  }

  displaySnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
