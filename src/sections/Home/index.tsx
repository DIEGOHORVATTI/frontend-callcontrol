import { useState } from 'react'
import { Box, Container } from '@mui/material'
import { LoginForm } from './login-form'
import { ChatInterface } from './chat-interface'
import { useSocket } from './hooks/use-socket'

export const Home = () => {
  const [isConnected, setIsConnected] = useState(false)
  const { socket, connect, disconnect } = useSocket()

  const handleConnect = (username: string, maxCalls: number) => {
    connect(username, maxCalls)
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    disconnect()
    setIsConnected(false)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: '100vh', py: 4 }}>
        {!isConnected ? (
          <LoginForm onConnect={handleConnect} />
        ) : (
          <ChatInterface socket={socket} onDisconnect={handleDisconnect} />
        )}
      </Box>
    </Container>
  )
}
