import { useState } from "react";
import "./App.css";
import { PiArrowDownDuotone } from "react-icons/pi";
import PokemonApiDemo from "./components/organisms/pokemonApiDemo";
import normal from "./assets/normalface.png";
import funny from "./assets/funnyface.png";
import LanguageButton from "./components/molecules/languageButton";

function App() {
  const [copied, setCopied] = useState(false);
  const [face, setFace] = useState(normal);

  // メールアドレスコピー関数のみ残す
  const copyEmailToClipboard = () => {
    navigator.clipboard
      .writeText("test@gmail.com")
      .then(() => setCopied(true))
      .catch((err) => console.error("copy failed", err));
  };

  return (
    <>
      <header className="relative w-full h-svh content-center">
        <div className="header--title relative flex flex-row items-center justify-center ml-[-3.5rem]">
          <p className="rotate-[270deg] origin-top text-xl font-bold">U.Ezoe</p>
          <h1 className="header--title__main text-9xl font-bold leading-tight">
            Portfolio
          </h1>
        </div>
        <LanguageButton />
        <div className="header--arrow absolute bottom-24 inset-x-0 flex flex-col items-center">
          <p>Scroll down</p>
          <PiArrowDownDuotone size={32} />
        </div>
      </header>
      <main className="relative w-full">
        <article className="main--build h-svh bg-yellow-500">
          <section className="max-w-5xl mx-auto pt-36 pb-44">
            <h1 className="mb-16 text-4xl font-bold">Demos</h1>
            <PokemonApiDemo />
          </section>
        </article>
        <article className="h-svh bg-neutral-800 text-neutral-300">
          <section className="max-w-5xl mx-auto pt-36 pb-44">
            <h1 className="mb-16 text-4xl font-bold">About Me</h1>
            <img
              className="face"
              src={face}
              alt="face"
              width={150}
              height={150}
              onMouseEnter={() => setFace(funny)}
              onMouseLeave={() => setFace(normal)}
            />
            <div>
              <h2 className="mt-4 text-xl font-bold">U.Ezoe</h2>
              <p className="">
                Freelance Designer (8 yrs) & Front-end Developer (4 yrs)
              </p>
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
            <p>
              ご連絡の際は、以下のボタンからメールアドレスをコピーしてください
            </p>
            <p className="mb-8">
              To contact me, please copy my email address from the button below
            </p>
            <button
              onClick={copyEmailToClipboard}
              className="bg-neutral-800 text-neutral-300 px-8 py-4 rounded-md"
            >
              {copied ? "Copied!" : "Copy email address"}
            </button>
          </section>
        </article>
      </main>
      <footer className="w-full h-20 text-center content-center bg-neutral-800 text-neutral-300">
        <p>© 2025 U.Ezoe</p>
      </footer>
    </>
  );
}

export default App;
