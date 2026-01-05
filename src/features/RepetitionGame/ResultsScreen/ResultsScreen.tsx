import cn from 'classnames'
import { Button } from '@shared/ui'
import styles from './ResultsScreen.module.scss'

interface ResultsScreenProps {
  correctCount: number
  incorrectCount: number
  totalCount: number
  onRetryIncorrect: () => void
  onRestart: () => void
  hasIncorrect: boolean
}

export const ResultsScreen = ({
  correctCount,
  incorrectCount,
  totalCount,
  onRetryIncorrect,
  onRestart,
  hasIncorrect,
}: ResultsScreenProps) => {
  const percentage = Math.round((correctCount / totalCount) * 100)
  const isExcellent = percentage === 100
  const isGood = percentage >= 70
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {isExcellent ? (
          <>
            <div className={styles.emoji}>🎉</div>
            <h2 className={styles.title}>Поздравляем!</h2>
            <p className={styles.subtitle}>Вы ответили правильно на все вопросы!</p>
          </>
        ) : (
          <>
            <div className={styles.emoji}>{isGood ? '👍' : '💪'}</div>
            <h2 className={styles.title}>
              {isGood ? 'Хороший результат!' : 'Продолжайте учиться!'}
            </h2>
          </>
        )}

        <div className={styles.stats}>
          <div className={cn(styles.stat, styles.correct)}>
            <span className={styles.statNumber}>{correctCount}</span>
            <span className={styles.statLabel}>Верно</span>
          </div>
          <div className={cn(styles.stat, styles.total)}>
            <span className={styles.statNumber}>{percentage}%</span>
            <span className={styles.statLabel}>Результат</span>
          </div>
          <div className={cn(styles.stat, styles.incorrect)}>
            <span className={styles.statNumber}>{incorrectCount}</span>
            <span className={styles.statLabel}>Неверно</span>
          </div>
        </div>

        <div className={styles.actions}>
          {hasIncorrect && (
            <Button variant="primary" fullWidth onClick={onRetryIncorrect}>
              Повторить неверные ({incorrectCount})
            </Button>
          )}
          <Button variant="outline" fullWidth onClick={onRestart}>
            Начать заново
          </Button>
        </div>
      </div>
    </div>
  )
}
