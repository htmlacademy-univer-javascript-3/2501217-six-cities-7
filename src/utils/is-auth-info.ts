import type { AuthInfo } from '@/types/auth';

export const isAuthInfo = (value: unknown): value is AuthInfo => (
  typeof value === 'object' && value !== null &&
  'name' in value && typeof value.name === 'string' &&
  'avatarUrl' in value && typeof value.avatarUrl === 'string' &&
  'isPro' in value && typeof value.isPro === 'boolean' &&
  'email' in value && typeof value.email === 'string' &&
  'token' in value && typeof value.token === 'string' && value.token.length > 0
);
