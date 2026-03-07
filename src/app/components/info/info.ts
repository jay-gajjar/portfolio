import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

declare let gtag: any;

@Component({
  selector: 'app-info',
  imports: [MatButtonModule, NgOptimizedImage],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {

  downloadResume() {
    gtag('event', 'resume_download', {
      event_category: 'engagement',
      event_label: 'resume pdf'
    });
  }
}
