import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HubMap } from './HubMap';

describe('HubMap', () => {
  it('renders all 7 concept titles as links', () => {
    render(
      <MemoryRouter>
        <HubMap />
      </MemoryRouter>
    );
    const titles = [
      'Dilemme du prisonnier', 'Équilibre de Nash', 'Chasse au cerf', 'Stratégies mixtes',
      'Dilemme du prisonnier itéré', 'Jeux séquentiels', 'Tragédie des biens communs',
    ];
    titles.forEach((t) => expect(screen.getAllByText(new RegExp(t)).length).toBeGreaterThan(0));
  });
});
