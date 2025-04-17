export function getColorByTagName(tagName: string): string {
  let color;
  switch (tagName) {
    case 'Вкусно':
      color = '#f5222d';
      break;
    case 'Еженедельно':
      color = '#D3C975';
      break;
    case 'Завтрак':
      color = '#eb2f96';
      break;
    default:
      color = '#1890FF';
  }
  return color;
}
