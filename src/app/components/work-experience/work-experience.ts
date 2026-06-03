import { Component } from '@angular/core';
import { Icon } from '../icon/icon';
import workExperienceData from './work-experience.json';

@Component({
  selector: 'app-work-experience',
  imports: [Icon],
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.scss',
})
export class WorkExperience {
  experiences = workExperienceData;
}
