export function unique<T>(items: T[]): T[] {
  return items.reduce<T[]>((acc, item) => {
    if (acc.indexOf(item) < 0) {
      return [...acc, item]
    } else {
      return acc
    }
  }, [])
}
