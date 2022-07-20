import ptimeout, { TimeoutError } from './'
import { expectType } from 'tsd'

function normal(a: number, b: string): Promise<number> {
  return Promise.resolve(1)
}

function useCancel(a: number, b: string, signal: AbortSignal): Promise<number> {
  return Promise.resolve(1)
}

expectType<(a: number, b: string) => Promise<number>>(ptimeout(normal, 10))
expectType<(a: number, b: string) => Promise<number>>(ptimeout(useCancel, 10))
