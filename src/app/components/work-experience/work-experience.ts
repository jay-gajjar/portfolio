import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-work-experience',
  imports: [MatCardModule, MatDivider],
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.scss',
})
export class WorkExperience {}
