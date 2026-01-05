import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '@app/store/hooks'
import { toggleTheme } from '@app/store/settingsSlice'
import { Button } from '@shared/ui'
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
    <Button
      className={cn(styles.switcher, className)}
      onClick={handleToggle}
      variant="primary"
      size="sm"
      round
      icon={theme === 'light' ? '🌙' : '☀️'}
      aria-label={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
    />
  )
}
