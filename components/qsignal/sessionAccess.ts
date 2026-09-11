import { classSession } from './mockData';

export const joinedSessionStorageKey = 'qsignal-joined-session';

export function extractEntryCode(value: string) {
  const trimmed = value.trim();
  const queryStart = trimmed.indexOf('?');

  if (queryStart >= 0) {
    const query = new URLSearchParams(trimmed.slice(queryStart + 1));
    const code = query.get('code');
    if (code) return code;
  }

  return trimmed;
}

export function normalizeEntryCode(value: string) {
  return extractEntryCode(value).replaceAll(' ', '').toUpperCase();
}

export function isValidEntryCode(value: string) {
  return normalizeEntryCode(value) === normalizeEntryCode(classSession.accessCode);
}

export function getQrJoinPath() {
  return `/join?code=${encodeURIComponent(classSession.accessCode)}`;
}

export function getSafeStudentPath(value: string | null) {
  return value?.startsWith('/student') ? value : '/student';
}

export function hasJoinedSession() {
  return window.localStorage.getItem(joinedSessionStorageKey) === classSession.accessCode;
}

export function markSessionJoined() {
  window.localStorage.setItem(joinedSessionStorageKey, classSession.accessCode);
}
