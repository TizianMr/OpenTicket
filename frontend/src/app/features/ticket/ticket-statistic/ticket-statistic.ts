import { Component, input } from '@angular/core';

import { Icon } from '../../../common/icons/icon';
import { IconName } from '../../../common/icons/icon-registry';

@Component({
  selector: 'app-ticket-statistic',
  imports: [Icon],
  templateUrl: './ticket-statistic.html',
})
export class TicketStatistic {
  title = input.required<string>();
  icon = input.required<IconName>();
  number = input.required<number>();
}
