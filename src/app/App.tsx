import { useEffect } from 'react'
import { useAppSelector } from './store/hooks'
import { StoreProvider, RouterProvider } from './providers'
import './styles'

const AppContent = () => {
  const theme = useAppSelector((state) => state.settings.theme)

  useEffect(() => {
    document.body.className = `app_${theme}_theme`
  }, [theme])

  return <RouterProvider />
}

export const App = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}
