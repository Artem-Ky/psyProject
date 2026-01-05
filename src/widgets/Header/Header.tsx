import { Link, useNavigate } from 'react-router-dom'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ThemeSwitcher } from '@features/ThemeSwitcher'
import styles from './Header.module.scss'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        PsyLearn
      </Link>

      <nav className={styles.nav}>
        <Menu as="div" className={styles.menuContainer}>
          <MenuButton className={styles.menuButton}>
            Игры
            <span className={styles.arrow}>▾</span>
          </MenuButton>
          <MenuItems className={styles.menuItems}>
            <MenuItem>
              {({ focus }) => (
                <button
                  className={`${styles.menuItem} ${focus ? styles.menuItemFocused : ''}`}
                  onClick={() => navigate('/game/repetition')}
                >
                  Повторение
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
        
        <ThemeSwitcher className={styles.headerThemeSwitcher} />
      </nav>
    </header>
  )
}
