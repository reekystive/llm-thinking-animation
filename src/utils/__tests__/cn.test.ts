import { describe, expect, it } from 'vitest';
import { cn } from '../cn';

describe('cn', () => {
  it('merges classes correctly', () => {
    expect(cn('a', 'b')).toBe('a b');
    expect(cn('a', undefined, 'c')).toBe('a c');
    expect(cn('a', null, 'b', 0, 'c')).toBe('a b c');
  });

  it('merges Tailwind classes with conflict', () => {
    expect(cn('text-lg', 'text-sm')).toBe('text-sm');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('handles arrays and objects', () => {
    expect(cn(['a', 'b'], { c: true, d: false })).toBe('a b c');
    expect(cn(['a', ['b', { c: true }]])).toBe('a b c');
  });

  it('returns empty string for no input', () => {
    expect(cn()).toBe('');
  });
});
