import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.html',
  imports: [MatCardModule, MatIconModule],
  styleUrls: ['./about-me.scss'],
})
export class AboutMe {}
