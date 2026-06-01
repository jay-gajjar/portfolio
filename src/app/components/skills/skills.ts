import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import skillsData from './skills.json';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  imports: [MatCardModule],
})
export class Skills {
  skills = skillsData;
}
