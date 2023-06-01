import '../styles/globals.css'
import '../styles/progressBar.css'
import '../styles/squareTest.css'
import '../styles/analogPurs.css'
import '../styles/analogSum.css'
import '../styles/attention.css'
import '../styles/logicTest.css'
import '../styles/evenOddTest.css'
import '../styles/soundTest.css'
import '../styles/memories.css'
import '../styles/motion.css'
import '../styles/motionHard.css'

import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { Roboto } from '@next/font/google'
const roboto = Roboto({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { pathname } = router
  let showNavbar = true

  if (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') {
    showNavbar = false
  }

  return (
    <SessionProvider session={pageProps.session}>
      <main className={roboto.className}>
        {showNavbar && <Navbar />}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
