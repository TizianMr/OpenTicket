export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
export interface THead {
  readonly label: string;
  readonly key: string;
  sortDirection?: SortDirection;
}
