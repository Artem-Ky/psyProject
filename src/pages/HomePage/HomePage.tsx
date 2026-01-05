import { Header } from '@widgets/Header'
import { ThemeSwitcher } from '@features/ThemeSwitcher'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <p className={styles.centerText}>Главная страница</p>
      </main>
      <ThemeSwitcher />
    </div>
  )
}
