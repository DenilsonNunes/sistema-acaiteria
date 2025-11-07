export function pedidoEmEdicao(): boolean {
  const order = localStorage.getItem("@OrderStorage");
  return order !== null;
}