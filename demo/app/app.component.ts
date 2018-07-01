import { Component } from '@angular/core';

@Component({
  selector: 'lineup-root',
  template: `<lineup-lineup [data]="data"></lineup-lineup>`,
  // templateUrl: './app.component.html'
})
export class AppComponent {
  readonly data = <any[]>[];

  readonly cats = ['c1', 'c2', 'c3'];

  constructor() {
    const cats = this.cats;
    for (let i = 0; i < 100; ++i) {
      this.data.push({
        a: Math.random() * 10,
        d: 'Row ' + i,
        cat: cats[Math.floor(Math.random() * 3)],
        cat2: cats[Math.floor(Math.random() * 3)]
      });
    }
  }
}
