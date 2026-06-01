import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import projectsData from './projects.json';

@Component({
  selector: 'app-projects',
  imports: [MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects = projectsData;

  getTechStackArray(techStack: string): string[] {
    return techStack ? techStack.split(',').map((tech) => tech.trim()) : [];
  }
}
