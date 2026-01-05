import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@pages/HomePage'

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
