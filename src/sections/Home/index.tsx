import { LoginForm } from '../Login'
import { ChatInterface } from './chat-interface'

import { MainContent } from '@/components'

import { useSocket } from '@/hooks/use-socket'

export const Home = () => {
  const {
    connected: { isConnected },
  } = useSocket()

  console.log(isConnected)

  return <MainContent>{!isConnected ? <LoginForm /> : <ChatInterface />}</MainContent>
}
