
import * as pattern from '../../src/util/pattern'

describe('util/pattern', () => {
  it('escape ^', () => {
    expect(pattern.escape('^')).toBe('\\^')
  })
  it('escape $', () => {
    expect(pattern.escape('$')).toBe('\\$')
  })
  it('escape *', () => {
    expect(pattern.escape('*')).toBe('\\*')
  })
  it('escape (', () => {
    expect(pattern.escape('(')).toBe('\\(')
  })
  it('escape )', () => {
    expect(pattern.escape(')')).toBe('\\)')
  })
  it('escape +', () => {
    expect(pattern.escape('+')).toBe('\\+')
  })
  it('escape -', () => {
    expect(pattern.escape('-')).toBe('\\-')
  })
  it('escape |', () => {
    expect(pattern.escape('|')).toBe('\\|')
  })
  it('escape [', () => {
    expect(pattern.escape('[')).toBe('\\[')
  })
  it('escape ]', () => {
    expect(pattern.escape(']')).toBe('\\]')
  })
  it('escape {', () => {
    expect(pattern.escape('{')).toBe('\\{')
  })
  it('escape }', () => {
    expect(pattern.escape('}')).toBe('\\}')
  })
  it('escape .', () => {
    expect(pattern.escape('.')).toBe('\\.')
  })
  it('escape ?', () => {
    expect(pattern.escape('?')).toBe('\\?')
  })
  it('escape /', () => {
    expect(pattern.escape('/')).toBe('\\/')
  })
  it('escape \\', () => {
    expect(pattern.escape('\\')).toBe('\\\\')
  })
})
