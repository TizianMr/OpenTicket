import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[chevron-right]',
  template: `
    <svg:path
      d="M9 18L15 12L9 6"
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
export class ChevronRight {
  readonly size = input<string>('size-5');
}
