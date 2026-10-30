import { SortType } from '@/const';

export type Sorting = typeof SortType[keyof typeof SortType];
