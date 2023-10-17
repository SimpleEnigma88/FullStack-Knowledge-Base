import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set unless(condition: boolean) {
    if (!condition) {

    } else {

    }
  }

  constructor() { }

}
