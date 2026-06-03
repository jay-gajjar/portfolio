import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, ReactiveFormsModule, Icon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private httpClient = inject(HttpClient);
  private fb = inject(FormBuilder);
  secretKey = signal('xrgwzgwe');
  isLoading = signal(false);
  emailForm: FormGroup;
  showSnackBar = signal(false);
  message = signal('');
  snackbarTimeOut = signal<any>(undefined);

  constructor() {
    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendEmail(formData: any) {
    if (this.isLoading()) {
      return;
    }
    if (this.emailForm.invalid) {
      this.displaySnackBar('Please fill required fields with valid details.');
      return;
    }
    this.isLoading.set(true);
    const url = 'https://formspree.io/f/' + this.secretKey();
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    const data = `name=${formData.name}&email=${formData.email}&subject=${formData.subject}&message=${formData.message}`;

    this.httpClient.post(url, data, httpOptions).subscribe({
      next: () => {
        this.emailForm.reset();
        this.emailForm.markAsUntouched();
        this.isLoading.set(false);
        this.displaySnackBar('Thank you for filling out your information!');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.displaySnackBar('Failed to send message: ' + (error.message || 'Error occurred.'));
        console.error('Email send error:', error);
      },
    });
  }

  displaySnackBar(message: string) {
    if (this.snackbarTimeOut()) {
      clearTimeout(this.snackbarTimeOut());
    }
    this.message.set(message);
    this.showSnackBar.set(true);
    const timeout = setTimeout(() => {
      this.showSnackBar.set(false);
    }, 4000);
    this.snackbarTimeOut.set(timeout);
  }
}
