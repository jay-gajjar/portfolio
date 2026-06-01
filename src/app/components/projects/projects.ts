import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import projectsData from './projects.json';

@Component({
  selector: 'app-projects',
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects = projectsData;
}
