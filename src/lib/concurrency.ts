import { QR_MAX_CONCURRENT } from "./constants";

let active = 0;
const waiters: Array<() => void> = [];

function acquire(): Promise<void> {
  if (active < QR_MAX_CONCURRENT) {
    active += 1;
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    waiters.push(() => {
      active += 1;
      resolve();
    });
  });
}

function release() {
  active -= 1;
  const next = waiters.shift();
  if (next) next();
}

/** Limits concurrent QR generations to reduce CPU DoS impact. */
export async function withQrSlot<T>(fn: () => Promise<T>): Promise<T> {
  await acquire();
  try {
    return await fn();
  } finally {
    release();
  }
}
