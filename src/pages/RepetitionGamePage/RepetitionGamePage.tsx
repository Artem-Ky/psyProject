import { useEffect, useCallback, useState } from 'react'
import { DndContext, type DragEndEvent, useSensor, useSensors, PointerSensor, TouchSensor, type DragStartEvent } from '@dnd-kit/core'
import { isMobile } from 'react-device-detect'
import { useAppDispatch, useAppSelector } from '@app/store/hooks'
import {
  setTopic,
  flipCard,
  answerCorrect,
  answerIncorrect,
  retryIncorrect,
} from '@app/store/repetitionGameSlice'
import type { Term } from '@entities/terms'
import { Header } from '@widgets/Header'
import { ThemeSwitcher } from '@features/ThemeSwitcher'
import {
  TermCard,
  ArrowButtons,
  AnswerInput,
  ResultsScreen,
  RepetitionGameHelp,
} from '@features/RepetitionGame'
import { TopicSidebar, ProgressCounter, Button } from '@shared/ui'
import baseTerms from '@fakeBack/base_term.json'
import motivationTerms from '@fakeBack/motivation_term.json'
import styles from './RepetitionGamePage.module.scss'

const convertToTerms = (data: Record<string, string>): Term[] => {
  return Object.entries(data).map(([term, definition]) => ({
    term,
    definition,
  }))
}

const topics = [
  { id: 'base', name: 'Основы психологии' },
  { id: 'motivation', name: 'Мотивация' },
]

const topicData: Record<string, Term[]> = {
  base: convertToTerms(baseTerms),
  motivation: convertToTerms(motivationTerms),
}

export const RepetitionGamePage = () => {
  const dispatch = useAppDispatch()
  const [isDragging, setIsDragging] = useState(false)
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
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    })
  )

  const handleDragStart = useCallback((_event: DragStartEvent) => {
    if (isMobile) {
      document.body.classList.add('dragging')
    }
  }, [])

  const handleDragCancel = useCallback(() => {
    if (isMobile) {
      document.body.classList.remove('dragging')
    }
  }, [])

  const currentTerm = terms[currentIndex]
  const totalTerms = terms.length

  const handleSelectTopic = useCallback((topicId: string) => {
    const termsForTopic = topicData[topicId]
    if (termsForTopic) {
      const shuffled = [...termsForTopic].sort(() => Math.random() - 0.5)
      dispatch(setTopic({ topic: topicId, terms: shuffled }))
    }
  }, [dispatch])

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
      handleSelectTopic(currentTopic)
    }
  }

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (isMobile) {
      document.body.classList.remove('dragging')
    }
    
    const { delta } = event
    const threshold = isMobile ? 80 : 100
    
    if (delta.x > threshold) {
      handleCorrect()
    } else if (delta.x < -threshold) {
      handleIncorrect()
    }
  }, [handleCorrect, handleIncorrect])

  const handleAnswerSubmit = (answer: string) => {
    console.log(answer) // TODO: написать алгоритм распознавания синонимов
  }

  useEffect(() => {
    if (!currentTopic && topics.length > 0) {
      handleSelectTopic(topics[0].id)
    }
  }, [currentTopic, handleSelectTopic])

  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.content}>
        <TopicSidebar
          topics={topics}
          selectedTopic={currentTopic}
          onSelectTopic={handleSelectTopic}
        />

        <main className={styles.gameArea}>
          {isFinished ? (
            <ResultsScreen
              correctCount={correctAnswers.length}
              incorrectCount={incorrectAnswers.length}
              totalCount={correctAnswers.length + incorrectAnswers.length}
              onRetryIncorrect={handleRetryIncorrect}
              onRestart={handleRestart}
              hasIncorrect={incorrectAnswers.length > 0}
            />
          ) : currentTerm ? (
            <DndContext 
              sensors={sensors} 
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <div className={styles.gameHeader}>
                <RepetitionGameHelp />
                <ProgressCounter
                  current={currentIndex + 1}
                  total={totalTerms}
                />
              </div>

              <div className={styles.cardSection}>
                <Button variant="accent" onClick={handleFlipCard}>
                  {isFlipped ? 'Скрыть ответ' : 'Показать ответ'}
                </Button>

                <div className={styles.cardContainer}>
                  <ArrowButtons
                    onLeft={handleIncorrect}
                    onRight={handleCorrect}
                    isDragging={isDragging}
                  />
                  
                  <TermCard
                    term={currentTerm.term}
                    definition={currentTerm.definition}
                    isFlipped={isFlipped}
                    onDragStateChange={setIsDragging}
                  />
                </div>

                <AnswerInput onSubmit={handleAnswerSubmit} />
              </div>
            </DndContext>
          ) : (
            <div className={styles.selectTopic}>
              <p>Выберите тему слева, чтобы начать</p>
            </div>
          )}
        </main>
      </div>

      <ThemeSwitcher />
    </div>
  )
}
