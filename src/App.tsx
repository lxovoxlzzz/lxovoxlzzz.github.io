import { useState } from "react";
import "./App.css";
import PokemonApi from "@/components/organisms/pokemonApi";
import NasaApi from "@/components/organisms/nasaApi";
import FoxApi from "@/components/organisms/foxApi";
import Header from "@/components/organisms/header";
import About from "@/components/pages/about";
import Footer from "@/components/organisms/footer";

function App() {
  const [copied, setCopied] = useState(false);

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
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
