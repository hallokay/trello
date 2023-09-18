import Image from 'next/image'
import { Header, Board } from '@/components'
export default function Home() {
  return (
    <main>
      {/* Header */}
      <Header />

      {/* Board */}
      <Board />
    </main>
  )
}
