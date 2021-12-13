export function getError(error) {
  return error.response || error.request ? "Response error" : "Undefined error";
}