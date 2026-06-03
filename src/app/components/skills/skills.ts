import { Component } from '@angular/core';
import skillsData from './skills.json';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  imports: [],
})
export class Skills {
  skills = skillsData;

  skillCategories = [
    {
      title: 'Frontend Core',
      skillNames: ['Javascript', 'Typescript', 'HTML', 'CSS', 'SASS', 'JQuery'],
    },
    {
      title: 'Frameworks & State',
      skillNames: ['Angular'],
    },
    {
      title: 'Backend & APIs',
      skillNames: ['Node JS', 'REST API'],
    },
    {
      title: 'Development & AI Tools',
      skillNames: ['Git', 'VS Code', 'Postman', 'Cursor', 'ChatGPT', 'Antigravity'],
    },
  ];

  getSkillsByCategory(names: string[]) {
    // Return skills matched by name, preserving their original order in category definition
    return names
      .map((name) => this.skills.find((s) => s.name.toLowerCase() === name.toLowerCase()))
      .filter((s): s is (typeof skillsData)[0] => !!s);
  }
}
