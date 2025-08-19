import { AfterViewInit, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Info } from '../info/info';
import { AboutMe } from '../about-me/about-me';
import { Skills } from '../skills/skills';
import { WorkExperience } from '../work-experience/work-experience';
import { Projects } from '../projects/projects';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-sections',
  imports: [Info, AboutMe, Skills, WorkExperience, Projects, Contact],
  templateUrl: './sections.html',
  styleUrl: './sections.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Sections implements AfterViewInit {
  @Output() initObserver = new EventEmitter<IntersectionObserver>();
  @Output() setActiveSection = new EventEmitter<string | null>();
  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    // Create observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setActiveSection.emit(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    this.initObserver.emit(this.observer);
  }
}
