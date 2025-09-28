import './App.css'
import Footer from '@/components/organisms/footer'
import Header from '@/components/organisms/header'
import About from '@/components/pages/about'
import Contact from '@/components/pages/contact'
import Demo from '@/components/pages/demo'

function App() {
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

export default App
