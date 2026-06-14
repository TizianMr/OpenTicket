/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[chevron-left]',
  template: `<svg:path
    d="M15 18L9 12L15 6"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none" /> `,
  host: {
    '[class]': 'size()',
    '[attr.viewBox]': '"0 0 24 24"',
    '[attr.xmlns]': '"http://www.w3.org/2000/svg"',
    '[attr.fill]': '"none"',
  },
})
export class ChevronLeft {
  readonly size = input<string>('size-5');
}
