import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex min-h-screen ${inter.className}`}>
      <div>hello world</div>
    </main>
  )
}
