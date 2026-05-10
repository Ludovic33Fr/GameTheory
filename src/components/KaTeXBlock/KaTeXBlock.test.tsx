import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KaTeXBlock } from './KaTeXBlock';

describe('KaTeXBlock', () => {
  it('renders TeX into a katex span', () => {
    const { container } = render(<KaTeXBlock tex="a^2 + b^2 = c^2" />);
    expect(container.querySelector('.katex')).not.toBeNull();
  });

  it('renders inline mode without a display wrapper', () => {
    const { container } = render(<KaTeXBlock tex="x_i" inline />);
    expect(container.querySelector('.katex-display')).toBeNull();
  });
});
