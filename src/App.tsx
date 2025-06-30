import { useState, useMemo, useCallback } from "react";
import "./App.css";
import { PiArrowDownDuotone } from "react-icons/pi";
import type { PokemonType } from "./types/global";
import normal from "./assets/normalface.png";
import funny from "./assets/funnyface.png";

/**
 * pokemonAPIからデータを取得する関数
 * @param url 取得するURL
 * @returns 取得したデータ
 */
async function fetchPokemonData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

function App() {
  // TODO: 完成後分解
  const [copied, setCopied] = useState(false);
  const [face, setFace] = useState(normal);
  const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * TODO: ピカチュウのデータを取得する関数（仮）
   * @returns ピカチュウのデータ
   */
  const handleClick = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonData<PokemonType>(
        "https://pokeapi.co/api/v2/pokemon/pikachu",
      );
      setPokemonData(data);

      // 音声オブジェクトを作成
      const audioElement = new Audio(data.cries.latest);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
      setAudio(audioElement);
    } catch (err) {
      setError("データの取得に失敗しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 音声を再生する関数
   */
  const playSound = useCallback(() => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, [audio]);

  /**
   * 音声を停止する関数
   */
  const stopSound = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audio]);

  /**
   * TODO: メールアドレスをクリップボードにコピーする
   */
  const copyEmailToClipboard = useCallback(() => {
    // TODO: 本番用のメールアドレスに変更
    navigator.clipboard
      .writeText("test@gmail.com")
      .then(() => setCopied(true))
      .catch((err) => console.error("copy failed", err));
  }, []);

  console.log(pokemonData);

  // TODO: ポケモンデータの表示
  const pokemonDisplay = useMemo(() => {
    if (!pokemonData) return null;

    return (
      <div>
        <h1 className="text-xl font-bold">{pokemonData.name}</h1>
        <ul className="flex flex-row gap-4">
          <li>height: {pokemonData.height}</li>
          <li>weight: {pokemonData.weight}</li>
          <li>type: {pokemonData.types[0].type.name}</li>
          <li>id: {pokemonData.id}</li>
        </ul>
        <div className="flex gap-2 mb-4">
          <button
            onClick={playSound}
            disabled={!audio || isPlaying}
            className="bg-neutral-600 text-neutral-300 px-4 pt-3 pb-2 rounded-md disabled:bg-gray-400"
          >
            {isPlaying ? "再生中..." : "鳴き声を再生"}
          </button>
          <button
            onClick={stopSound}
            disabled={!audio || !isPlaying}
            className="bg-red-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
          >
            停止
          </button>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <img
            src={pokemonData.sprites.other.showdown.front_default}
            alt={`${pokemonData.name}'s showdown image`}
            width={60}
            height={60}
          />
          <img
            src={pokemonData.sprites.front_default}
            alt={`${pokemonData.name}'s front image`}
            width={96}
            height={96}
          />
          <img
            src={pokemonData.sprites.back_default}
            alt={`${pokemonData.name}'s back image`}
            width={96}
            height={96}
          />
        </div>
      </div>
    );
  }, [pokemonData, audio, isPlaying, playSound, stopSound]);

  return (
    <>
      <header className="relative w-full h-svh content-center">
        <div className="header--title relative flex flex-row items-center justify-center ml-[-3.5rem]">
          <p className="rotate-[270deg] origin-top text-xl font-bold">U.Ezoe</p>
          <h1 className="header--title__main text-9xl font-bold leading-tight">
            Portfolio
          </h1>
        </div>
        <div className="header--arrow absolute bottom-24 inset-x-0 flex flex-col items-center">
          <p>Scroll down</p>
          <PiArrowDownDuotone size={32} />
        </div>
      </header>
      <main className="relative">
        <article className="main--build h-svh bg-yellow-500">
          <section className="max-w-5xl mx-auto pt-36 pb-44">
            <h1 className="mb-16 text-4xl font-bold">What I Can Build</h1>
            <div>
              <button
                onClick={handleClick}
                disabled={loading}
                className="mb-4 text-yellow-500"
              >
                <p className="pt-1.5">
                  {loading ? "取得中..." : "ピカチュウを取得"}
                </p>
              </button>
              {pokemonDisplay}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
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
      <footer className="h-20 text-center content-center bg-neutral-800 text-neutral-300">
        <p>© 2025 U.Ezoe</p>
      </footer>
    </>
  );
}

export default App;
