import { listen } from './redux/listener'
import { useEffect } from 'react'
import { AppRoutes } from './routes'

export default function App() {
  useEffect(() => {
    listen()
  }, [])

  return <AppRoutes />
}
