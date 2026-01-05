import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@pages/HomePage'
import { RepetitionGamePage } from '@pages/RepetitionGamePage'
import { RepetitionGameMobilePage } from '@pages/RepetitionGameMobilePage'

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/repetition" element={<RepetitionGamePage />} />
        <Route path="/game/repetition/mobile" element={<RepetitionGameMobilePage />} />
      </Routes>
    </BrowserRouter>
  )
}
