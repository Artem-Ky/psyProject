import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Term } from '@entities/terms'

interface RepetitionGameState {
  currentTopic: string | null
  terms: Term[]
  currentIndex: number
  correctAnswers: string[]
  incorrectAnswers: string[]
  isFlipped: boolean
  isFinished: boolean
  isRetryMode: boolean
}

const initialState: RepetitionGameState = {
  currentTopic: null,
  terms: [],
  currentIndex: 0,
  correctAnswers: [],
  incorrectAnswers: [],
  isFlipped: false,
  isFinished: false,
  isRetryMode: false,
}

const repetitionGameSlice = createSlice({
  name: 'repetitionGame',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<{ topic: string; terms: Term[] }>) => {
      state.currentTopic = action.payload.topic
      state.terms = action.payload.terms
      state.currentIndex = 0
      state.correctAnswers = []
      state.incorrectAnswers = []
      state.isFlipped = false
      state.isFinished = false
      state.isRetryMode = false
    },
    flipCard: (state) => {
      state.isFlipped = !state.isFlipped
    },
    answerCorrect: (state) => {
      const currentTerm = state.terms[state.currentIndex]
      if (currentTerm) {
        state.correctAnswers.push(currentTerm.term)
      }
      state.isFlipped = false
      
      if (state.currentIndex < state.terms.length - 1) {
        state.currentIndex += 1
      } else {
        state.isFinished = true
      }
    },
    answerIncorrect: (state) => {
      const currentTerm = state.terms[state.currentIndex]
      if (currentTerm) {
        state.incorrectAnswers.push(currentTerm.term)
      }
      state.isFlipped = false
      
      if (state.currentIndex < state.terms.length - 1) {
        state.currentIndex += 1
      } else {
        state.isFinished = true
      }
    },
    retryIncorrect: (state) => {
      const incorrectTerms = state.terms.filter(t => 
        state.incorrectAnswers.includes(t.term)
      )
      state.terms = incorrectTerms
      state.currentIndex = 0
      state.correctAnswers = []
      state.incorrectAnswers = []
      state.isFlipped = false
      state.isFinished = false
      state.isRetryMode = true
    },
    resetGame: (state) => {
      state.currentTopic = null
      state.terms = []
      state.currentIndex = 0
      state.correctAnswers = []
      state.incorrectAnswers = []
      state.isFlipped = false
      state.isFinished = false
      state.isRetryMode = false
    },
  },
})

export const {
  setTopic,
  flipCard,
  answerCorrect,
  answerIncorrect,
  retryIncorrect,
  resetGame,
} = repetitionGameSlice.actions

export default repetitionGameSlice.reducer
