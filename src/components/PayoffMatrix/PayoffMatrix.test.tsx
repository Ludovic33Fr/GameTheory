import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PayoffMatrix } from './PayoffMatrix';
import { prisonersDilemma } from '../../games/prisoners';

describe('PayoffMatrix', () => {
  it('renders a payoff cell for each combination of actions', () => {
    render(<PayoffMatrix game={prisonersDilemma} />);
    // 2 actions per player → 4 cells with payoff text
    expect(screen.getAllByText(/-?\d+, -?\d+/).length).toBe(4);
  });

  it('highlights cells passed via equilibria', () => {
    const { container } = render(
      <PayoffMatrix game={prisonersDilemma} equilibria={[['D', 'D']]} />
    );
    expect(container.querySelectorAll('[data-equilibrium="true"]').length).toBe(1);
  });

  it('calls onCellClick when interactive', async () => {
    const onCellClick = vi.fn();
    const user = userEvent.setup();
    render(<PayoffMatrix game={prisonersDilemma} onCellClick={onCellClick} />);
    await user.click(screen.getAllByText(/-?\d+, -?\d+/)[0]);
    expect(onCellClick).toHaveBeenCalledWith(['C', 'C']);
  });
});
