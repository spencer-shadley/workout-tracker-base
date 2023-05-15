export function logError(...args: unknown[]) {
  console.error(args);
  console.trace();
}

export function logDebug(...args: unknown[]) {
  console.debug(args);
}
