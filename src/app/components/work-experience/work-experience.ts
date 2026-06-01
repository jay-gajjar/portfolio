import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import workExperienceData from './work-experience.json';

@Component({
  selector: 'app-work-experience',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.scss',
})
export class WorkExperience {
  experiences = workExperienceData;
}
