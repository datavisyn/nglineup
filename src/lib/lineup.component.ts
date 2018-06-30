import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-lineup',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class LineUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
