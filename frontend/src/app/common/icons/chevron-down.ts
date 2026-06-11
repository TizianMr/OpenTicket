/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[chevron-down]',
  template: `
    <svg:path
      d="m5.84 9.59l5.66 5.66l5.66-5.66l-.71-.7l-4.95 4.95l-4.95-4.95z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none" />
  `,
  host: {
    'class': 'size-3',
    '[attr.viewBox]': 'viewBox()',
    '[attr.xmlns]': '"http://www.w3.org/2000/svg"',
    'aria-hidden': 'true',
    'role': 'img',
  },
})
export class ChevronDown {
  readonly viewBox = input<string>('0 0 24 24');
}
