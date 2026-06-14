/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[chevron-right-double]',
  template: `
    <svg:path
      d="M6 17L11 12L6 7M13 17L18 12L13 7"
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
export class ChevronRightDouble {
  readonly size = input<string>('size-5');
}
