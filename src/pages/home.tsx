import Footer from '@/components/footer'
import Header from '@/components/header'
import About from '@/pages/about'
import Contact from '@/pages/contact'
import Demo from '@/pages/demo'

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative w-full min-h-svh">
        <Demo />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
