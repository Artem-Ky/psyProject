import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '@app/store/hooks'
import { toggleTheme } from '@app/store/settingsSlice'
import styles from './ThemeSwitcher.module.scss'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.settings.theme)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <button
      className={cn(styles.switcher, className)}
      onClick={handleToggle}
      aria-label={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
    >
      <span className={styles.icon}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className={styles.label}>
        {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
      </span>
    </button>
  )
}
