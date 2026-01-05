import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'accent' | 'ghost' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  size?: ButtonSize
  variant?: ButtonVariant
  round?: boolean
  fullWidth?: boolean
  className?: string
}

export const Button = ({
  children,
  icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'primary',
  round = false,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const hasOnlyIcon = icon && !children

  return (
    <button
      className={cn(
        styles.button,
        styles[`size-${size}`],
        styles[`variant-${variant}`],
        {
          [styles.round]: round,
          [styles.iconOnly]: hasOnlyIcon,
          [styles.fullWidth]: fullWidth,
        },
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      {children && <span className={styles.text}>{children}</span>}
      {icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </button>
  )
}
