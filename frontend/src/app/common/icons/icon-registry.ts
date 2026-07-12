import { ChevronLeft } from './chevron-left.icon';
import { ChevronLeftDouble } from './chevron-left-double.icon';
import { ChevronRight } from './chevron-right.icon';
import { ChevronRightDouble } from './chevron-right-double.icon';
import { CircleCheck } from './circle-check.icon';
import { CircleHalf } from './circle-half.icon';
import { DocumentPlus } from './document-plus.icon';
import { InProgress } from './in-progress.icon';
import { SortAscending } from './sort-asc.icon';
import { SortDescending } from './sort-desc.icon';
import { SortIdle } from './sort-idle.icon';
import { SortUpdown } from './sort-updown.icon';
import { SpinnerIcon } from './spinner.icon';

export const ICON_REGISTRY = {
  'chevron-left-double': ChevronLeftDouble,
  'chevron-left': ChevronLeft,
  'chevron-right-double': ChevronRightDouble,
  'chevron-right': ChevronRight,
  'circle-check': CircleCheck,
  'circle-half': CircleHalf,
  'document-plus': DocumentPlus,
  'in-progress': InProgress,
  'sort-asc': SortAscending,
  'sort-desc': SortDescending,
  'sort-idle': SortIdle,
  'sort-updown': SortUpdown,
  'spinner-icon': SpinnerIcon
} as const;

export type IconName = keyof typeof ICON_REGISTRY;
