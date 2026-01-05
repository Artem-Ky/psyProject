import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DndContext, type DragEndEvent, useSensor, useSensors, TouchSensor } from '@dnd-kit/core'
import { useAppDispatch, useAppSelector } from '@app/store/hooks'
import {
  flipCard,
  answerCorrect,
  answerIncorrect,
  retryIncorrect,
  setTopic,
} from '@app/store/repetitionGameSlice'
import type { Term } from '@entities/terms'
import { TermCard, ResultsScreen, RepetitionGameHelp } from '@features/RepetitionGame'
import { ProgressCounter, Button } from '@shared/ui'
import baseTerms from '@fakeBack/base_term.json'
import motivationTerms from '@fakeBack/motivation_term.json'
import styles from './RepetitionGameMobilePage.module.scss'

const convertToTerms = (data: Record<string, string>): Term[] => {
  return Object.entries(data).map(([term, definition]) => ({
    term,
    definition,
  }))
}

const topicData: Record<string, Term[]> = {
  base: convertToTerms(baseTerms),
  motivation: convertToTerms(motivationTerms),
}

const STORAGE_KEY = 'repetitionGame_selectedTopic'

export const RepetitionGameMobilePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    currentTopic,
    terms,
    currentIndex,
    correctAnswers,
    incorrectAnswers,
    isFlipped,
    isFinished,
  } = useAppSelector((state) => state.repetitionGame)

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    })
  )

  const currentTerm = terms[currentIndex]
  const totalTerms = terms.length

  const handleFlipCard = () => {
    dispatch(flipCard())
  }

  const handleCorrect = useCallback(() => {
    dispatch(answerCorrect())
  }, [dispatch])

  const handleIncorrect = useCallback(() => {
    dispatch(answerIncorrect())
  }, [dispatch])

  const handleRetryIncorrect = () => {
    dispatch(retryIncorrect())
  }

  const handleRestart = () => {
    if (currentTopic) {
      const termsForTopic = topicData[currentTopic]
      if (termsForTopic) {
        const shuffled = [...termsForTopic].sort(() => Math.random() - 0.5)
        dispatch(setTopic({ topic: currentTopic, terms: shuffled }))
      }
    }
  }

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { delta } = event
    
    if (delta.x > 60) {
      handleCorrect()
    } else if (delta.x < -60) {
      handleIncorrect()
    }
  }, [handleCorrect, handleIncorrect])

  const handleBack = () => {
    navigate('/game/repetition')
  }

  useEffect(() => {
    if (!currentTopic || terms.length === 0) {
      const savedTopic = localStorage.getItem(STORAGE_KEY)
      if (savedTopic && topicData[savedTopic]) {
        const shuffled = [...topicData[savedTopic]].sort(() => Math.random() - 0.5)
        dispatch(setTopic({ topic: savedTopic, terms: shuffled }))
      } else {
        navigate('/game/repetition')
      }
    }
  }, [currentTopic, terms.length, dispatch, navigate])

  if (isFinished) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Button variant="ghost" size="sm" onClick={handleBack}>
            ← Назад
          </Button>
        </div>
        <div className={styles.content}>
          <ResultsScreen
            correctCount={correctAnswers.length}
            incorrectCount={incorrectAnswers.length}
            totalCount={correctAnswers.length + incorrectAnswers.length}
            onRetryIncorrect={handleRetryIncorrect}
            onRestart={handleRestart}
            hasIncorrect={incorrectAnswers.length > 0}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button variant="ghost" size="sm" onClick={handleBack}>
          ← Назад
        </Button>
        <RepetitionGameHelp />
        <ProgressCounter current={currentIndex + 1} total={totalTerms} />
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className={styles.content}>
          <div className={styles.gameContainer}>
            <Button variant="accent" size="sm" onClick={handleFlipCard}>
              {isFlipped ? 'Скрыть ответ' : 'Показать ответ'}
            </Button>

            {currentTerm && (
              <div className={styles.cardArea}>
                <TermCard
                  term={currentTerm.term}
                  definition={currentTerm.definition}
                  isFlipped={isFlipped}
                />
              </div>
            )}

            <div className={styles.buttons}>
              <Button
                variant="danger"
                size="xl"
                round
                icon="✗"
                onClick={handleIncorrect}
                aria-label="Неверный ответ"
                className={styles.answerButton}
              />
              <Button
                variant="success"
                size="xl"
                round
                icon="✓"
                onClick={handleCorrect}
                aria-label="Верный ответ"
                className={styles.answerButton}
              />
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  )
}
