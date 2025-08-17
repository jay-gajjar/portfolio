import { DOCUMENT, Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  private document = inject(DOCUMENT);

  icons = [
    {
      name: 'github',
      url: '/images/github.svg',
    },
    {
      name: 'linkedIn',
      url: '/images/linkedIn.svg',
    },
    {
      name: 'email',
      url: '/images/email.svg',
    },
  ];

  load() {
    return new Promise<void>((resolve) => {
      this.icons.forEach((icon) => {
        this.matIconRegistry.addSvgIcon(
          icon.name,
          this.domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
        );
      });
      this.hideLoader();
      resolve();
    });
  }

  hideLoader() {
    this.document.getElementById('app-loader')?.classList.add('hide');
  }
}
