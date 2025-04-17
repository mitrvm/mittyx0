export function getColorByCategoryName(category: string): string {
  let color;
  switch (category) {
    case 'Молочные продукты':
      color = '#91db7b';
      break;
    case 'Фрукты':
      color = '#D3C975';
      break;
    case 'Снеки':
      color = '#eb2f96';
      break;
    default:
      color = '#1890FF';
  }
  return color;
}
