export function formatDateTime(dateStr: string): string {

  const date = new Date(dateStr); // cria a data com base na string UTC

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


export function formatHours(dateStr: string): string {

  const date = new Date(dateStr); // cria a data com base na string UTC


  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function formatDateAAAAMMDD(dateStr: string): string {

  const date = new Date(dateStr); // cria a data com base na string UTC

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');


  return `${year}-${month}-${day}`;

}
