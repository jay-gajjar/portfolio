import { DOCUMENT, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private document = inject(DOCUMENT);

  load() {
    return new Promise<void>((resolve) => {
      this.hideLoader();
      resolve();
    });
  }

  hideLoader() {
    const loader = this.document.getElementById('app-loader');
    if (loader) {
      loader.classList.add('hide');
    }
  }
}
