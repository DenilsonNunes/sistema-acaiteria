export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr); // cria a data com base na string UTC

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mês é 0-based
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
