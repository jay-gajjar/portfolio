import { Component } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Sidebar],
  templateUrl: './app.html',
  styles: `
    .app {
      height: 100%;
    }
  `,
})
export class App {}
