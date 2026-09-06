import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Pictogram, type PictogramId } from './Pictogram';
import styles from './Sign.module.css';

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');

/* ---------------------------------------------------------------- *
 * Plaque : le carré noir qui porte un pictogramme. L'unité de base
 * du panneau — jamais une émoji, jamais un glyphe.
 * ---------------------------------------------------------------- */
interface PlateProps {
  icon: PictogramId;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'black' | 'yellow' | 'outline';
  className?: string;
}

const ICON_SIZE = { sm: 17, md: 22, lg: 28 } as const;

export function Plate({ icon, size = 'md', tone = 'black', className }: PlateProps) {
  return (
    <span
      className={cx(
        styles.plate,
        styles[size],
        tone === 'yellow' && styles.plateYellow,
        tone === 'outline' && styles.plateOutline,
        className
      )}
    >
      <Pictogram id={icon} size={ICON_SIZE[size]} />
    </span>
  );
}

/* ---------------------------------------------------------------- *
 * Bouton : plaque noire, flèche encadrée, libellé. Le libellé nomme
 * l'action, jamais l'objet.
 * ---------------------------------------------------------------- */
interface SignButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: PictogramId;
  variant?: 'solid' | 'ghost';
  children: ReactNode;
}

export function SignButton({
  icon = 'arrowRight',
  variant = 'solid',
  children,
  className,
  ...rest
}: SignButtonProps) {
  return (
    <button
      type="button"
      className={cx(styles.btn, variant === 'ghost' && styles.btnGhost, className)}
      {...rest}
    >
      <span className={styles.btnBox}>
        <Pictogram id={icon} size={15} className={styles.btnArrow} />
      </span>
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------- *
 * Panneau encastré : métal noir perforé. Toute donnée manipulable
 * vit dedans.
 * ---------------------------------------------------------------- */
interface PanelProps {
  label: string;
  icon?: PictogramId;
  aside?: ReactNode;
  children: ReactNode;
  /** Retire le rembourrage interne quand le contenu porte le sien. */
  flush?: boolean;
  className?: string;
}

export function Panel({ label, icon, aside, children, flush, className }: PanelProps) {
  return (
    <section className={cx(styles.panel, 'onBlack', className)}>
      <header className={styles.panelHead}>
        {icon && <Pictogram id={icon} size={16} />}
        <span className={styles.headLabel}>{label}</span>
        {aside && <span style={{ marginLeft: 'auto' }}>{aside}</span>}
      </header>
      <div className={flush ? undefined : styles.panelBody}>{children}</div>
    </section>
  );
}

/* Bandeau de relevé, en pied de panneau. */
export function Readout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.readout}>
      <span className={styles.readoutLabel}>{label}</span>
      <span className={styles.readoutValue}>{children}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Volet basculant : le geste natif du panneau. Une valeur qui change
 * bascule, elle ne fond pas.
 * ---------------------------------------------------------------- */
export function FlapValue({ value, className }: { value: string | number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className={cx(styles.flapWrap, className)}>
      <span key={String(value)} className={reduced ? undefined : styles.flap}>
        {value}
      </span>
    </span>
  );
}

export { styles as signStyles };
