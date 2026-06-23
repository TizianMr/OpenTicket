export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface THead {
  readonly label: string;
  readonly key: string;
  sortDirection?: SortDirection;
}

export type PageSize = 5 | 10 | 25 | 50;
