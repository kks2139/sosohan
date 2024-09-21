let debouncedTimeoutId = 0;

export function callDebounced(callback: () => void, time = 500) {
  if (debouncedTimeoutId) {
    clearTimeout(debouncedTimeoutId);

    debouncedTimeoutId = window.setTimeout(() => callback(), time);

    return;
  }

  debouncedTimeoutId = window.setTimeout(() => callback(), time);
}
