export type OnCancel = (fn: (...args: any[]) => any) => void

export class TimeoutError extends Error {
  timeout: number
}

declare function ptimeout<FN>(fn: FN, timeout: number): FN

declare function ptimeout<T extends unknown[], R>(
  fn: (...args: [...args: T, onCancel?: OnCancel]) => R,
  timeout: number,
  cancel: boolean
): (...args: T) => R

export default ptimeout
