export class TimeoutError extends Error {
  timeout: number
}

export type EnsurePromise<T> = T extends Promise<any> ? T : Promise<T>

// with singal
export default function ptimeout<T extends unknown[], R>(
  fn: (...args: [...args: T, signal: AbortSignal]) => R,
  timeout: number
): (...args: T) => EnsurePromise<R>
// no singal
export default function ptimeout<T extends unknown[], R>(
  fn: (...args: [...args: T]) => R,
  timeout: number
): (...args: T) => EnsurePromise<R>
