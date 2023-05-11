import { logError } from '@/utils/logger';

let screenLock: WakeLockSentinel | null;
updateScreenLock();
document.addEventListener('visibilitychange', async () => {
  if (screenLock !== null && document.visibilityState === 'visible') {
    screenLock = await navigator.wakeLock.request('screen');
  }
});
function isScreenLockSupported() {
  return 'wakeLock' in navigator;
}
export function release() {
  if (typeof screenLock !== 'undefined' && screenLock != null) {
    screenLock.release().then(() => {
      screenLock = null;
    });
  }
}
export async function updateScreenLock() {
  if (!isScreenLockSupported()) {
    logError('Screen Lock not supported');
    return;
  }

  navigator.wakeLock
    .request('screen')
    .then((lock) => {
      screenLock = lock;
    })
    .catch((error) => logError(error));
}
