import { Decimal } from 'decimal.js'

type InputValue = string | number | null

export function fNumber(number: InputValue) {
  return number ? new Decimal(number).toString() : ''
}

export function fCurrency(number: InputValue) {
  const format = number ? new Decimal(number).toFixed(2) : ''

  return format ? `$${format.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : ''
}

export function fPercent(number: InputValue) {
  const format = number ? new Decimal(number).dividedBy(100).toFixed(1) : ''

  return format ? `${format}%` : ''
}

export function fData(number: InputValue) {
  const format = number ? new Decimal(number).toFixed(1) : ''

  return format ? `${format} b` : ''
}
