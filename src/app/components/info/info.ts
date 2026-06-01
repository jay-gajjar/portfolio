import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DOCUMENT } from '@angular/common';

declare let gtag: any;

@Component({
  selector: 'app-info',
  imports: [MatButtonModule, NgOptimizedImage, MatIconModule],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {
  private document = inject(DOCUMENT);

  downloadResume() {
    gtag('event', 'resume_download', {
      event_category: 'engagement',
      event_label: 'resume pdf',
    });
  }

  scrollToContact() {
    const contactEl = this.document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
