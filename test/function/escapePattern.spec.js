
import escapePattern from '../../src/function/escapePattern'

describe('function/escapePattern', () => {
  it('escape ^', () => {
    expect(escapePattern('^')).toBe('\\^')
  })
  it('escape $', () => {
    expect(escapePattern('$')).toBe('\\$')
  })
  it('escape *', () => {
    expect(escapePattern('*')).toBe('\\*')
  })
  it('escape (', () => {
    expect(escapePattern('(')).toBe('\\(')
  })
  it('escape )', () => {
    expect(escapePattern(')')).toBe('\\)')
  })
  it('escape +', () => {
    expect(escapePattern('+')).toBe('\\+')
  })
  it('escape -', () => {
    expect(escapePattern('-')).toBe('\\-')
  })
  it('escape |', () => {
    expect(escapePattern('|')).toBe('\\|')
  })
  it('escape [', () => {
    expect(escapePattern('[')).toBe('\\[')
  })
  it('escape ]', () => {
    expect(escapePattern(']')).toBe('\\]')
  })
  it('escape {', () => {
    expect(escapePattern('{')).toBe('\\{')
  })
  it('escape }', () => {
    expect(escapePattern('}')).toBe('\\}')
  })
  it('escape .', () => {
    expect(escapePattern('.')).toBe('\\.')
  })
  it('escape ?', () => {
    expect(escapePattern('?')).toBe('\\?')
  })
  it('escape /', () => {
    expect(escapePattern('/')).toBe('\\/')
  })
  it('escape \\', () => {
    expect(escapePattern('\\')).toBe('\\\\')
  })
})
