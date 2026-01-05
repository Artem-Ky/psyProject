import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@pages/HomePage'
import { RepetitionGamePage } from '@pages/RepetitionGamePage'

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/repetition" element={<RepetitionGamePage />} />
      </Routes>
    </BrowserRouter>
  )
}
