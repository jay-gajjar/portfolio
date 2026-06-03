import { Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { DOCUMENT } from '@angular/common';

declare let gtag: any;

@Component({
  selector: 'app-info',
  imports: [Icon],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {
  private document = inject(DOCUMENT);

  downloadResume() {
    if (typeof gtag === 'function') {
      gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'resume pdf',
      });
    }
  }

  scrollToContact() {
    const contactEl = this.document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
