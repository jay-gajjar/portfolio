import { Component, input, computed, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const SVG_ICONS: Record<string, { viewBox: string; paths: string; stroke?: boolean }> = {
  home: {
    viewBox: '0 0 24 24',
    paths:
      '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    stroke: true,
  },
  person: {
    viewBox: '0 0 24 24',
    paths: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    stroke: true,
  },
  code: {
    viewBox: '0 0 24 24',
    paths: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    stroke: true,
  },
  work: {
    viewBox: '0 0 24 24',
    paths:
      '<path d="M15 2H9a2 2 0 0 0-2 2v2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 0 0-2-2zM7 6h10v2H7V6zm14 4v10H3V10h18z"/>',
    stroke: false,
  },
  folder: {
    viewBox: '0 0 24 24',
    paths:
      '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9l-3.3-3.3A2 2 0 0 0 7.4 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16z"/>',
    stroke: true,
  },
  email: {
    viewBox: '0 0 24 24',
    paths:
      '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    stroke: true,
  },
  linkedIn: {
    viewBox: '0 0 24 24',
    paths:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    stroke: true,
  },
  github: {
    viewBox: '0 0 24 24',
    paths:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    stroke: true,
  },
  send: {
    viewBox: '0 0 24 24',
    paths: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    stroke: true,
  },
  download: {
    viewBox: '0 0 24 24',
    paths:
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    stroke: true,
  },
  terminal: {
    viewBox: '0 0 24 24',
    paths: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    stroke: true,
  },
  layers: {
    viewBox: '0 0 24 24',
    paths:
      '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    stroke: true,
  },
  speed: {
    viewBox: '0 0 24 24',
    paths:
      '<path d="M4.5 16.5c-1.5-1.25-2.5-3.19-2.5-5.34C2 6.59 6.59 2 12.18 2 17.78 2 22 6.59 22 11.16c0 2.15-1 4.09-2.5 5.34"/><path d="m12 14 4-4"/><circle cx="12" cy="12" r="1"/>',
    stroke: true,
  },
  schema: {
    viewBox: '0 0 24 24',
    paths:
      '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4"/>',
    stroke: true,
  },
  settings: {
    viewBox: '0 0 24 24',
    paths:
      '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    stroke: true,
  },
  devices: {
    viewBox: '0 0 24 24',
    paths:
      '<rect width="16" height="10" x="2" y="4" rx="2"/><rect width="6" height="10" x="16" y="10" rx="2"/><path d="M12 20h.01"/><path d="M19 18h.01"/>',
    stroke: true,
  },
  verified: {
    viewBox: '0 0 24 24',
    paths: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    stroke: true,
  },
  arrowRight: {
    viewBox: '0 0 24 24',
    paths: '<polyline points="9 18 15 12 9 6"/>',
    stroke: true,
  },
  chevronRight: {
    viewBox: '0 0 24 24',
    paths: '<polyline points="9 18 15 12 9 6"/>',
    stroke: true,
  },
  menu: {
    viewBox: '0 0 24 24',
    paths:
      '<line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>',
    stroke: true,
  },
  close: {
    viewBox: '0 0 24 24',
    paths: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    stroke: true,
  },
  lightMode: {
    viewBox: '0 0 24 24',
    paths:
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    stroke: true,
  },
  darkMode: {
    viewBox: '0 0 24 24',
    paths: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    stroke: true,
  },
};

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.viewBox]="iconConfig().viewBox"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.fill]="iconConfig().stroke ? 'none' : color()"
      [attr.stroke]="iconConfig().stroke ? color() : 'none'"
      [attr.stroke-width]="iconConfig().stroke ? strokeWidth() : null"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="className()"
      [style.color]="color()"
      [innerHTML]="sanitizedPaths()"
    ></svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
    `,
  ],
})
export class Icon {
  name = input.required<string>();
  size = input<number | string>(20);
  color = input<string>('currentColor');
  strokeWidth = input<number>(2);
  className = input<string>('');

  private domSanitizer = inject(DomSanitizer);

  iconConfig = computed(() => {
    const icon = SVG_ICONS[this.name()] || SVG_ICONS['code'];
    return icon;
  });

  sanitizedPaths = computed<SafeHtml>(() => {
    return this.domSanitizer.bypassSecurityTrustHtml(this.iconConfig().paths);
  });
}
