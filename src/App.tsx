import { useState } from "react";
import './App.css'
import normal from './assets/normalface.png'
import funny from './assets/funnyface.png'

function App() {
  // TODO: 完成後分解
  const [copied, setCopied] = useState(false);
  const [isFunny, setIsFunny] = useState(false);

  const copyEmailToClipboard = () => {
    // TODO: 本番用のメールアドレスに変更
    navigator.clipboard.writeText("test@gmail.com")
      .then(() => setCopied(true))
      .catch((err) => console.error('copy failed', err));
  };

  return (
    <>
      <header className="w-full h-svh content-center">
        <div className="header--title flex flex-row items-center justify-center relative">
          <p className="rotate-[270deg] origin-top text-xl font-bold">U.Ezoe</p>
          <h1 className="text-9xl font-bold">Portfolio</h1>
        </div>
      </header>
      <main>
        <article className="h-svh bg-neutral-400">
          <section className="max-w-5xl mx-auto pt-36 pb-44">
            <h1 className="mb-16 text-4xl font-bold">What I Can Build</h1>
          </section>
        </article>
        <article className="h-svh bg-neutral-800 text-neutral-300">
          <section className="max-w-5xl mx-auto pt-36 pb-44">
            <h1 className="mb-16 text-4xl font-bold">About Me</h1>
            <img
              className="face"
              src={isFunny ? funny : normal}
              alt="face"
              width={150}
              height={150}
              onMouseEnter={() => setIsFunny(true)}
              onMouseLeave={() => setIsFunny(false)}
            />
            <div>
              <h2 className="mt-4 text-xl font-bold">U.Ezoe</h2>
              <p className="">Freelance Designer (8 yrs) & Front-end Developer (4 yrs)</p>
              <dl className="mt-4">
                <dt className="font-bold">title</dt>
                <dd>content</dd>
                <dt className="mt-4 font-bold">title</dt>
                <dd>content</dd>
              </dl>
            </div>
          </section>
        </article>
        <article className="w-full bg-neutral-300">
          <section className="max-w-5xl mx-auto pt-36 pb-44">
            <h1 className="mb-16 text-4xl font-bold">Contact</h1>
            <p>ご連絡の際は、以下のボタンからメールアドレスをコピーしてください</p>
            <p className="mb-8">To contact me, please copy my email address from the button below</p>
            <button
              onClick={copyEmailToClipboard}
              className="bg-neutral-800 text-neutral-300 px-8 py-4 rounded-md">
              {copied ? 'Copied!' : 'Copy email address'}
            </button>
          </section>
        </article>
      </main>
      <footer className="h-20 text-center content-center bg-neutral-800 text-neutral-300">
        <p>© 2025 U.Ezoe</p>
      </footer>
    </>
  )
}

export default App
