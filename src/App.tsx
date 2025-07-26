import { useState } from "react";
import "./App.css";
import PokemonApi from "@/components/organisms/pokemonApi";
import NasaApi from "@/components/organisms/nasaApi";
import FoxApi from "@/components/organisms/foxApi";
import normal from "@/assets/normalface.png";
import funny from "@/assets/funnyface.png";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";

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
      <Header />
      <main className="relative w-full min-h-svh bg-yellow-500">
        <article className="max-w-5xl mx-auto pt-36 pb-44">
          <h1 className="mb-16 text-4xl font-bold">Demos</h1>
          <PokemonApi />
          <NasaApi />
          <FoxApi />
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
      <Footer />
    </>
  );
}

export default App;
