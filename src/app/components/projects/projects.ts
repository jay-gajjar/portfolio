import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-projects',
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {}
