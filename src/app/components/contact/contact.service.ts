import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root' // Makes the service available application-wide
})
export class ContactService {

  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  isIconsLoaded = false;
  icons = [
    {
      name: 'github',
      url: 'images/github.svg',
    },
    {
      name: 'linkedIn',
      url: 'images/linkedIn.svg',
    },
    {
      name: 'email',
      url: 'images/email.svg',
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
      resolve();
    });
  }
}