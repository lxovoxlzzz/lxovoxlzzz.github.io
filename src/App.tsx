// import face from './assets/face.png'
import './App.css'

function App() {
  // TODO: 完成後分解
  return (
    <>
      <header className="h-[100vh] w-full content-center">
        <p className="mb-2 text-xl font-bold">U.Ezoe</p>
        <h1 className="text-9xl font-bold">Portfolio</h1>
      </header>
      <main>
        <article className="h-[100vh] w-full pt-16 bg-neutral-400">
          <h2 className="text-4xl font-bold">What I Can Build</h2>
          <p>実績は非公開ですが、こんなことができます。</p>
        </article>
        <article className="h-[100vh] w-full pt-16">
          <h2 className="text-4xl font-bold">About Me</h2>
          {/* <img src={face} alt="face" /> */}
          <p>私について</p>
        </article>
        <article className="h-[100vh] w-full pt-16 bg-neutral-400">
          <h2 className="text-4xl font-bold">Contact</h2>
          <p>連絡先</p>
        </article>
      </main>
      <footer className="h-20 text-center content-center">
        <p>© 2025 U.Ezoe</p>
      </footer>
    </>
  )
}

export default App
