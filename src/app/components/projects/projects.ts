import { Component } from '@angular/core';
import { Icon } from '../icon/icon';
import projectsData from './projects.json';

@Component({
  selector: 'app-projects',
  imports: [Icon],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects = projectsData;

  getTechStackArray(techStack: string): string[] {
    return techStack ? techStack.split(',').map((tech) => tech.trim()) : [];
  }
}
