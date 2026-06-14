/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[chevron-left-double]',
  template: `
    <svg:path
      d="M18 17L13 12L18 7M11 17L6 12L11 7"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none" />
  `,
  host: {
    '[class]': 'size()',
    '[attr.viewBox]': '"0 0 24 24"',
    '[attr.xmlns]': '"http://www.w3.org/2000/svg"',
    '[attr.fill]': '"none"',
  },
})
export class ChevronLeftDouble {
  readonly size = input<string>('size-5');
}
