import { Component, input, computed } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ICON_REGISTRY, IconName } from './icon-registry';

@Component({
  selector: 'app-icon',
  template: `<ng-container *ngComponentOutlet="component()" />`,
  imports: [NgComponentOutlet]
})
export class Icon {
  name = input.required<IconName>();
  component = computed(() => ICON_REGISTRY[this.name()]);
}