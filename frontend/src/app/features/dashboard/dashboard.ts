import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Icon } from '../../common/icons/icon';
import { IconName } from '../../common/icons/icon-registry';
import { TicketDto, TicketsService, TicketStatisticDto } from '../../core/api-generated';
import { ModalDirective } from '../../core/directives/modal-directive';
import { ModalService } from '../../core/services/modal-service';
import { CreateTicket } from '../ticket/create-ticket/create-ticket';
import { TicketDetails } from '../ticket/ticket-details/ticket-details';
import { TicketStatistic } from '../ticket/ticket-statistic/ticket-statistic';
import { TicketTable } from '../ticket/ticket-table/ticket-table';

interface StatisticItem {
  title: string;
  icon: IconName;
  amount: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CreateTicket, TicketTable, ModalDirective, TicketStatistic, Icon, TicketDetails],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly ticketsService = inject(TicketsService);
  protected readonly modalService = inject(ModalService);

  protected readonly selectedTicket = signal<TicketDto | null>(null);
  private readonly statConfig: { title: string; icon: IconName; key: keyof TicketStatisticDto }[] = [
    { title: 'Open tickets', icon: 'circle-half', key: 'numOfOpenTickets' },
    { title: 'Tickets in progress', icon: 'in-progress', key: 'numOfInProgressTickets' },
    { title: 'Closed tickets', icon: 'circle-check', key: 'numOfClosedTickets' },
  ];

  statistics = signal<StatisticItem[]>(this.statConfig.map(({ title, icon }) => ({ title, icon, amount: 0 })));

  onTicketSelect(ticket: TicketDto): void {
    this.selectedTicket.set(ticket);
  }

  onTicketDeselect(): void {
    this.selectedTicket.set(null);
  }

  ngOnInit(): void {
    const subscription = this.ticketsService.getStatistics().subscribe({
      next: response =>
        this.statistics.set(
          this.statConfig.map(({ title, icon, key }) => ({
            title,
            icon,
            amount: response[key],
          })),
        ),
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
