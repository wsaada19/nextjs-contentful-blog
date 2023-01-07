export function sortBy<T>(selector: (value: T) => string | number, array: T[]) {
  return array.sort((a, b) => {
    const aValue = selector(a);
    const bValue = selector(b);
    if (aValue > bValue) {
      return -1;
    }
    if (aValue < bValue) {
      return 1;
    }
    return 0;
  });
}
