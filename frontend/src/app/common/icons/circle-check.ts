import { Component, input } from "@angular/core";

@Component({
  selector: 'svg[circle-check]',
  template: `
    <svg:g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
      <svg:path d="m9 10l3.258 2.444a1 1 0 0 0 1.353-.142L20 5" />
      <svg:path d="M21 12a9 9 0 1 1-6.67-8.693" />
    </svg:g>
  `,
  host: {
    'class': 'size-7',
    '[attr.viewBox]': 'viewBox()',
    '[attr.xmlns]': '"http://www.w3.org/2000/svg"',
    'aria-hidden': 'true',
    'role': 'img',
  },
})
export class CircleCheck {
  readonly viewBox = input<string>('0 0 24 24');
}