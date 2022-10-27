export const convertToReal = (value: string | number) =>
  parseInt(value as string).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
