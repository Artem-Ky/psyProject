import cn from 'classnames'
import { ThemeSwitcher } from '@features/ThemeSwitcher'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Стартовая страница</h1>
        <ThemeSwitcher />
      </header>

      <main className={styles.content}>
        <section className={styles.colorsSection}>
          <h2>Палитра цветов</h2>
          <div className={styles.colorGrid}>
            <div className={cn(styles.colorCard, styles.primary)}>
              <span className={styles.colorName}>Primary</span>
              <span className={styles.colorHex}>var(--primary-color)</span>
            </div>
            <div className={cn(styles.colorCard, styles.secondary)}>
              <span className={styles.colorName}>Secondary</span>
              <span className={styles.colorHex}>var(--secondary-color)</span>
            </div>
            <div className={cn(styles.colorCard, styles.accent)}>
              <span className={styles.colorName}>Accent</span>
              <span className={styles.colorHex}>var(--accent-color)</span>
            </div>
            <div className={cn(styles.colorCard, styles.info)}>
              <span className={styles.colorName}>Info</span>
              <span className={styles.colorHex}>var(--info-color)</span>
            </div>
            <div className={cn(styles.colorCard, styles.success)}>
              <span className={styles.colorName}>Success</span>
              <span className={styles.colorHex}>var(--success-color)</span>
            </div>
            <div className={cn(styles.colorCard, styles.danger)}>
              <span className={styles.colorName}>Danger</span>
              <span className={styles.colorHex}>var(--danger-color)</span>
            </div>
          </div>
        </section>

        <section className={styles.loremSection}>
          <h2>Примеры контента</h2>
          
          <article className={cn(styles.card, styles.cardPrimary)}>
            <h3>Блок Primary</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </article>

          <article className={cn(styles.card, styles.cardSecondary)}>
            <h3>Блок Secondary</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </article>

          <article className={cn(styles.card, styles.cardAccent)}>
            <h3>Блок Accent</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </article>

          <article className={cn(styles.card, styles.cardInfo)}>
            <h3>Блок Info</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </article>

          <article className={cn(styles.card, styles.cardSuccess)}>
            <h3>Блок Success</h3>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.
            </p>
          </article>

          <article className={cn(styles.card, styles.cardDanger)}>
            <h3>Блок Danger</h3>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
              praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.
            </p>
          </article>
        </section>
      </main>
    </div>
  )
}
