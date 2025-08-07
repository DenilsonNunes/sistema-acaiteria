export function getLocalDate(): Date {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000; // em ms
  return new Date(now.getTime() - timezoneOffset);
}
