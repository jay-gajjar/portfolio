import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

import workExperienceData from './work-experience.json';

@Component({
  selector: 'app-work-experience',
  imports: [MatCardModule, MatDivider],
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.scss',
})
export class WorkExperience {
  experiences = workExperienceData;
}
