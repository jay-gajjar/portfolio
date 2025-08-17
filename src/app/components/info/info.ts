import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-info',
  imports: [MatButtonModule, NgOptimizedImage],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {}
