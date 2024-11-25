import { useState } from 'react'
import { Box, Container } from '@mui/material'
import { LoginForm } from '../Login'
import { ChatInterface } from './chat-interface'
import { useSocket } from '../../hooks/use-socket'

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
    <Box
      component="main"
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
      }}
    >
      <Container maxWidth={false} sx={{ minHeight: '100vh', py: 4 }}>
        {!isConnected ? (
          <LoginForm onConnect={handleConnect} />
        ) : (
          <ChatInterface socket={socket} onDisconnect={handleDisconnect} />
        )}
      </Container>
    </Box>
  )
}
