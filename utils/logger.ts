export function logError(error: unknown) {
  console.error(error);
  console.trace();
}

export function logDebug(info: unknown) {
  console.debug(info);
}
