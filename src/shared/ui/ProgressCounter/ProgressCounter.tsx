import cn from 'classnames'
import styles from './ProgressCounter.module.scss'

interface ProgressCounterProps {
  current: number
  total: number
  className?: string
}

export const ProgressCounter = ({
  current,
  total,
  className,
}: ProgressCounterProps) => {
  return (
    <div className={cn(styles.counter, className)}>
      <span className={styles.current}>{current}</span>
      <span className={styles.separator}>/</span>
      <span className={styles.total}>{total}</span>
    </div>
  )
}
