import { useState } from "react";
import "./App.css";
import normal from "./assets/normalface.png";
import funny from "./assets/funnyface.png";
import { PiArrowDownDuotone } from "react-icons/pi";

// TODO
type PokemonType = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    back_default: string;
  };
};

/**
 * pokemonAPIからデータを取得する関数
 * @param url 取得するURL
 * @returns 取得したデータ
 */
async function fetchDataPokemon<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

function App() {
  // TODO: 完成後分解
  const [copied, setCopied] = useState(false);
  const [face, setFace] = useState(normal);
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * TODO: ピカチュウのデータを取得する関数（仮）
   * @returns ピカチュウのデータ
   */
  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDataPokemon<PokemonType>(
        "https://pokeapi.co/api/v2/pokemon/pikachu",
      );
      setPokemon(data);
    } catch (err) {
      setError("データの取得に失敗しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * TODO: メールアドレスをクリップボードにコピーする
   */
  const copyEmailToClipboard = () => {
    // TODO: 本番用のメールアドレスに変更
    navigator.clipboard
      .writeText("test@gmail.com")
      .then(() => setCopied(true))
      .catch((err) => console.error("copy failed", err));
  };

  console.log(pokemon);

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
                {loading ? "取得中..." : "ピカチュウを取得"}
              </button>
              {pokemon && (
                <div>
                  <h1 className="text-xl font-bold">{pokemon.name}</h1>
                  <ul className="flex flex-row gap-4">
                    <li>height: {pokemon.height}</li>
                    <li>weight: {pokemon.weight}</li>
                    <li>type: {pokemon.types[0].type.name}</li>
                  </ul>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={`${pokemon.name}'s front image`}
                  />
                  <img
                    src={pokemon.sprites.back_default}
                    alt={`${pokemon.name}'s back image`}
                  />
                </div>
              )}
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
