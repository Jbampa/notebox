export const formatShortDate = (dataString: string) => {
  return new Date(dataString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
}