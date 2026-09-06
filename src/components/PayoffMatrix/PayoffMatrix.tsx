import { CSSProperties, Fragment } from 'react';
import type { NormalFormGame, ActionProfile } from '../../games/types';
import styles from './PayoffMatrix.module.css';

interface PayoffMatrixProps {
  game: NormalFormGame;
  /** Action profiles to mark as equilibria (visual highlight). */
  equilibria?: ActionProfile[];
  /** When provided, cells become clickable. Receives the profile of the clicked cell. */
  onCellClick?: (profile: ActionProfile) => void;
  /** Optional human labels for actions, indexed [player][actionIndex]. */
  actionLabels?: string[][];
}

function isEquilibrium(profile: ActionProfile, equilibria?: ActionProfile[]): boolean {
  if (!equilibria) return false;
  return equilibria.some((eq) => eq.length === profile.length && eq.every((a, i) => a === profile[i]));
}

export function PayoffMatrix({ game, equilibria, onCellClick, actionLabels }: PayoffMatrixProps) {
  if (game.players !== 2) {
    return <div>Matrices &gt; 2 joueurs non supportées dans ce composant.</div>;
  }
  const [rowActions, colActions] = game.actions;
  const rowLabels = actionLabels?.[0] ?? rowActions;
  const colLabels = actionLabels?.[1] ?? colActions;

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `auto repeat(${colActions.length}, minmax(80px, 1fr))`,
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.grid} style={gridStyle}>
        <div />
        {colActions.map((_, j) => (
          <div key={`h-${j}`} className={styles.label}>{colLabels[j]}</div>
        ))}
        {rowActions.map((rowAction, i) => (
          <Fragment key={i}>
            <div className={styles.rowLabel}>{rowLabels[i]}</div>
            {colActions.map((colAction, j) => {
              const profile: ActionProfile = [rowAction, colAction];
              const payoffs = game.payoff(profile);
              const eq = isEquilibrium(profile, equilibria);
              const className = [
                styles.cell,
                onCellClick ? styles.clickable : '',
                eq ? styles.equilibrium : '',
              ].filter(Boolean).join(' ');
              return (
                <div
                  key={`c-${i}-${j}`}
                  className={className}
                  data-equilibrium={eq ? 'true' : undefined}
                  onClick={onCellClick ? () => onCellClick(profile) : undefined}
                  role={onCellClick ? 'button' : undefined}
                  tabIndex={onCellClick ? 0 : undefined}
                  aria-label={`Profil ${rowLabels[i]}, ${colLabels[j]} : ${payoffs.join(', ')}`}
                >
                  {payoffs.join(', ')}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
      {equilibria && equilibria.length > 0 && (
        <p className={styles.legend}>
          <span className={styles.legendSwatch} aria-hidden="true" />
          Équilibre de Nash en stratégies pures
        </p>
      )}
    </div>
  );
}
