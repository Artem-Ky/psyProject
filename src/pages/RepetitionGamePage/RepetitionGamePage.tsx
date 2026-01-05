import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DndContext, type DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
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

const STORAGE_KEY = 'repetitionGame_selectedTopic'

export const RepetitionGamePage = () => {
  const navigate = useNavigate()
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
    })
  )

  const currentTerm = terms[currentIndex]
  const totalTerms = terms.length

  const handleSelectTopic = useCallback((topicId: string) => {
    const termsForTopic = topicData[topicId]
    if (termsForTopic) {
      localStorage.setItem(STORAGE_KEY, topicId)
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
    const { delta } = event
    
    if (delta.x > 100) {
      handleCorrect()
    } else if (delta.x < -100) {
      handleIncorrect()
    }
  }, [handleCorrect, handleIncorrect])

  const handleAnswerSubmit = (answer: string) => {
    console.log(answer) // TODO: написать алгоритм распознавания синонимов
  }

  const handleStartGame = () => {
    navigate('/game/repetition/mobile')
  }

  useEffect(() => {
    if (!currentTopic && topics.length > 0) {
      const savedTopic = localStorage.getItem(STORAGE_KEY)
      const topicToSelect = savedTopic && topicData[savedTopic] ? savedTopic : topics[0].id
      handleSelectTopic(topicToSelect)
    }
  }, [currentTopic, handleSelectTopic])

  if (isMobile) {
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
            <div className={styles.mobileStartSection}>
              <h2 className={styles.mobileTitle}>Повторение</h2>
              <p className={styles.mobileDescription}>
                Проверьте свои знания терминов по выбранной теме
              </p>
              <p className={styles.mobileStats}>
                {totalTerms} терминов в теме
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleStartGame}
                className={styles.startButton}
              >
                Начать игру
              </Button>
            </div>
          </main>
        </div>

        <ThemeSwitcher />
      </div>
    )
  }

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
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
