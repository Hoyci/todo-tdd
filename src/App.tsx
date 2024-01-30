import Header from './components/Header'
import Board from './components/Board'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <div className='bg-slate-400 h-screen'>
          <Header />
          <Board />
        </div>
      </QueryClientProvider>
    )
}
