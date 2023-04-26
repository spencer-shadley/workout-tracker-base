export function logError(message: string, error?: Error) {
  console.error(error);
  console.trace();
}
