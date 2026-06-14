import { Component } from '@angular/core';

import { SpinnerIcon } from '../../../../common/icons/spinner-icon';

@Component({
  selector: 'app-ticket-table-loading',
  imports: [SpinnerIcon],
  templateUrl: './ticket-table-loading.html',
})
export class TicketTableLoading {}
