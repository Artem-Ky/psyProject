import { isMobile } from 'react-device-detect'
import cn from 'classnames'
import { Button } from '@shared/ui'
import styles from './ArrowButtons.module.scss'

interface ArrowButtonsProps {
  onLeft: () => void
  onRight: () => void
  isDragging?: boolean
  className?: string
}

export const ArrowButtons = ({ onLeft, onRight, isDragging = false, className }: ArrowButtonsProps) => {
  if (isMobile || isDragging) {
    return null
  }

  return (
    <div className={cn(styles.container, className)}>
      <Button
        variant="danger"
        size="xl"
        round
        icon="✗"
        onClick={onLeft}
        aria-label="Неверный ответ"
        className={styles.leftButton}
      />
      
      <Button
        variant="success"
        size="xl"
        round
        icon="✓"
        onClick={onRight}
        aria-label="Верный ответ"
        className={styles.rightButton}
      />
    </div>
  )
}
