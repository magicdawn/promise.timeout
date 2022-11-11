// with singal
declare function ptimeout<T extends unknown[], R>(
  fn: (...args: [...args: T, signal: AbortSignal]) => R,
  timeout: number
): (...args: T) => Promise<Awaited<R>>
// no singal
declare function ptimeout<T extends unknown[], R>(
  fn: (...args: [...args: T]) => R,
  timeout: number
): (...args: T) => Promise<Awaited<R>>

declare namespace ptimeout {
  export class TimeoutError extends Error {
    timeout: number
  }
}

export = ptimeout
