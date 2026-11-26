import type { RequestStatus } from '@/const';

export type RequestState = typeof RequestStatus[keyof typeof RequestStatus];
