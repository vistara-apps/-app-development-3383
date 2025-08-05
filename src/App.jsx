import React from 'react'
import { UserProvider } from './context/UserContext'
import AppRouter from './components/AppRouter'

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  )
}

export default App
