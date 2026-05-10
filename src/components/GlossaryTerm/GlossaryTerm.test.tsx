import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlossaryTerm } from './GlossaryTerm';

describe('GlossaryTerm', () => {
  it('renders the inline label', () => {
    render(<GlossaryTerm id="strategie">stratégie</GlossaryTerm>);
    expect(screen.getByText('stratégie')).toBeInTheDocument();
  });

  it('shows the definition on hover', async () => {
    const user = userEvent.setup();
    render(<GlossaryTerm id="strategie-dominante">dominante</GlossaryTerm>);
    expect(screen.queryByRole('tooltip')).toBeNull();
    await user.hover(screen.getByText('dominante'));
    expect(screen.getByRole('tooltip')).toHaveTextContent(/au moins autant/);
  });

  it('renders even when id is unknown', () => {
    render(<GlossaryTerm id="unknown-id">x</GlossaryTerm>);
    expect(screen.getByText('x')).toBeInTheDocument();
  });
});
