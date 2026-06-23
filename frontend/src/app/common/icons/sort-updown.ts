import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[sort-updown]',
  template: `
    <svg:path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
  `,
  host: {
    '[class]': 'size()',
    '[attr.viewBox]': '"0 0 24 24"',
    '[attr.xmlns]': '"http://www.w3.org/2000/svg"',
    '[attr.fill]': '"none"',
    '[attr.stroke]': '"currentColor"',
    '[attr.stroke-width]': '"1.2"',
  },
})
export class SortUpdown {
  readonly size = input<string>('size-5');
}
