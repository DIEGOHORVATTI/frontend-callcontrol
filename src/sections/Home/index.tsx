import { Box, Container } from '@mui/material'
import { LoginForm } from '../Login'
import { ChatInterface } from './chat-interface'
import { useSocket } from '../../hooks/use-socket'

export const Home = () => {
  const {
    connected: { isConnected },
  } = useSocket()

  console.log(isConnected)

  return (
    <Box
      component="main"
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
      }}
    >
      <Container maxWidth={false} sx={{ minHeight: '100vh', py: 4 }}>
        {!isConnected ? <LoginForm /> : <ChatInterface />}
      </Container>
    </Box>
  )
}
