import ptimeout, {OnCancel, TimeoutError} from './' // f is(n: number) => void
import {expectType} from 'tsd'

function normal(a: number, b: string): Promise<number> {
  return Promise.resolve(1)
}

function useCancel(a: number, b: string, onCancel?: OnCancel): Promise<number> {
  return Promise.resolve(1)
}

expectType<(a: number, b: string) => Promise<number>>(ptimeout(normal, 10))

expectType<(a: number, b: string) => Promise<number>>(ptimeout(useCancel, 10, true))
