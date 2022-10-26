export const convertToReal = (value: string | number) =>
  value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
