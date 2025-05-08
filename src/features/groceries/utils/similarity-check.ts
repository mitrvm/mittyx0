export function findSimilarNames(input: string, items: string[]): string[] {
  const normalizedInput = input.toLowerCase().trim();

  return items.filter((item) => {
    const normalizedItem = item.toLowerCase().trim();

    if (normalizedInput.length < 3) return false;

    if (normalizedInput === normalizedItem) return true;

    if (
      normalizedItem.includes(normalizedInput) ||
      normalizedInput.includes(normalizedItem)
    )
      return true;

    if (Math.abs(normalizedItem.length - normalizedInput.length) <= 2) {
      const shorter =
        normalizedInput.length < normalizedItem.length
          ? normalizedInput
          : normalizedItem;
      const longer =
        normalizedInput.length < normalizedItem.length
          ? normalizedItem
          : normalizedInput;

      return longer.includes(shorter);
    }

    return false;
  });
}
