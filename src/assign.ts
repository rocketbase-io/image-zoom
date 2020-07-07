
export function assign<T>(target: T, values: Partial<T>): T {
  for (const key of Object.keys(values)) {
    target[key as keyof T] = values[key as keyof T] as any;
  }
  return target;
}
