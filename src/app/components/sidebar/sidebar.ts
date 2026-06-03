import { Component, DOCUMENT, inject, signal, OnDestroy } from '@angular/core';
import { Icon } from '../icon/icon';
import { Sections } from '../sections/sections';

@Component({
  selector: 'app-sidebar',
  imports: [Icon, Sections],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnDestroy {
  private document = inject(DOCUMENT);
  activeSection = signal<string | null>(null);
  mode = signal<'light' | 'dark'>('light');
  isMobileScreen = signal<boolean>(false);
  isMobileOpen = signal<boolean>(false);

  private mediaQueryListener: (e: MediaQueryListEvent) => void;
  private mediaQuery: MediaQueryList;

  navItems = [
    {
      id: 'about',
      icon: 'person',
      label: 'About',
    },
    {
      id: 'skills',
      icon: 'code',
      label: 'Skills',
    },
    {
      id: 'work',
      icon: 'work',
      label: 'Experience',
    },
    {
      id: 'projects-list',
      icon: 'folder',
      label: 'Projects',
    },
  ];

  constructor() {
    this.setDefaultTheme();

    // Set up media query for mobile viewport tracking (1024px breakpoint)
    this.mediaQuery = window.matchMedia('(max-width: 1024px)');
    this.isMobileScreen.set(this.mediaQuery.matches);

    this.mediaQueryListener = (e: MediaQueryListEvent) => {
      this.isMobileScreen.set(e.matches);
      if (!e.matches) {
        this.isMobileOpen.set(false);
      }
    };

    this.mediaQuery.addEventListener('change', this.mediaQueryListener);
  }

  ngOnDestroy() {
    this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
  }

  setDefaultTheme() {
    this.mode.set(this.getThemeColor());
    if (this.mode() === 'dark') {
      const body = this.document.querySelector('body');
      if (body) {
        body.classList.add('theme-dark');
      }
    }
  }

  scrollToId(id: string) {
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.activeSection.set(id);
    if (this.isMobileScreen()) {
      this.isMobileOpen.set(false);
    }
  }

  toggleSidenav() {
    this.isMobileOpen.set(!this.isMobileOpen());
  }

  setObserver(observer: IntersectionObserver) {
    this.navItems.forEach((link) => {
      const sectionEl = this.document.getElementById(link.id);
      if (sectionEl) {
        observer.observe(sectionEl);
      }
    });

    // Also observe the home section so we know when user scrolls to top
    const homeEl = this.document.getElementById('home');
    if (homeEl) {
      observer.observe(homeEl);
    }

    // Also observe the contact section so we can detect active button highlights
    const contactEl = this.document.getElementById('contact');
    if (contactEl) {
      observer.observe(contactEl);
    }
  }

  toggleDark() {
    const newMode = this.mode() === 'dark' ? 'light' : 'dark';
    this.mode.set(newMode);
    const body = this.document.querySelector('body');
    if (body) {
      body.classList.toggle('theme-dark', newMode === 'dark');
    }
  }

  getThemeColor(): 'light' | 'dark' {
    const isSystemDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isSystemDark ? 'dark' : 'light';
  }
}

