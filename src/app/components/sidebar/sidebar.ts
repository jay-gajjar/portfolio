import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, DOCUMENT, inject, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { Sections } from '../sections/sections';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 1024px)';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatIconModule, MatToolbarModule, MatDividerModule, Sections],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @ViewChild('content', { static: true }) content!: MatSidenavContent;
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  private readonly mediaMatcher = inject(MediaMatcher);
  layoutChangesSubscription = Subscription.EMPTY;
  activeSection = signal<string | null>(null);
  mode = signal<'light' | 'dark'>('light');
  isMobileScreen = signal<boolean>(false);
  private document = inject(DOCUMENT);

  navItems = [
    {
      id: 'home',
      icon: 'home',
      label: 'Home',
    },
    {
      id: 'about',
      icon: 'info',
      label: 'About',
    },
    {
      id: 'skills',
      icon: 'star',
      label: 'Skills',
    },
    {
      id: 'work',
      icon: 'work',
      label: 'Work Experience',
    },
    {
      id: 'projects-list',
      icon: 'folder_code',
      label: 'Projects',
    },
    {
      id: 'contact',
      icon: 'alternate_email',
      label: 'Contact',
    },
  ];

  constructor() {
    this.setDefaultTheme();
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY])
      .subscribe((state) => {
        this.isMobileScreen.set(!!state.breakpoints[MOBILE_MEDIAQUERY]);
      });
  }

  setDefaultTheme() {
    this.mode.set(this.getThemeColor());
    if (this.mode() === 'dark') {
      const html = this.document.querySelector('html');
      if (html) {
        html.classList.add('theme-dark');
      }
    }
  }

  scrollToId(id: string) {
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.toggleSidenav();
  }

  toggleSidenav() {
    if (this.isMobileScreen()) {
      this.sidenav.toggle();
      return;
    }
  }

  setObserver(observer: IntersectionObserver) {
    // Observe all sections
    this.navItems.forEach((link) => {
      const sectionEl = this.document.getElementById(link.id);
      if (sectionEl) {
        observer.observe(sectionEl);
      }
    });
  }

  toggleDark() {
    this.mode.set(this.mode() === 'dark' ? 'light' : 'dark');
    const html = this.document.querySelector('html');
    if (html) {
      html.classList.toggle('theme-dark');
    }
  }

  getThemeColor() {
    if (this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      return isSystemDark ? 'dark' : 'light';
    } else {
      return 'light';
    }
  }
}
