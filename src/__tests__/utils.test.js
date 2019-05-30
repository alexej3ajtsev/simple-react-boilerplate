import { compareValue } from '../utils'

test('3 must be between 1 and 5 numbers and return true', () => {
    expect(compareValue(1, 5, 3)).toBe(true)
})

test('1 not between 2 and 5 numbers and return false', () => {
    expect(compareValue(2, 5, 1)).toBe(false)
})

test(' "" between 0 and 5 numbers and return true', () => {
    expect(compareValue(0, 5, "")).toBe(false)
})

