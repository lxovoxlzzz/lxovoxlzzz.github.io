import { useState, useCallback } from "react";
import type { PokemonType } from "../../types/global";
import { useTranslation } from "react-i18next";

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

const pokemonList = [
  { jaName: "ピカチュウ", enName: "Pikachu" },
  { jaName: "イーブイ", enName: "Eevee" },
  { jaName: "ポリゴン", enName: "Porygon" },
  { jaName: "バタフリー", enName: "Butterfree" },
  { jaName: "ラプラス", enName: "Lapras" },
  { jaName: "ミュウ", enName: "Mew" },
  { jaName: "カビゴン", enName: "Snorlax" },
  { jaName: "ミニリュウ", enName: "Dratini" },
];

export default function PokemonApiDemo() {
  const { t, i18n } = useTranslation();
  const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  console.log(pokemonData);
  /**
   * ピカチュウを取得する関数
   * @returns ピカチュウのデータ
   */
  const handleGetPikachu = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonData<PokemonType>(
        "https://pokeapi.co/api/v2/pokemon/pikachu",
      );
      setPokemonData(data);
      const audioElement = new Audio(data.cries.latest);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
      setAudio(audioElement);
    } catch (err) {
      setError(t("error_fetch"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  /**
   * 入力されたポケモン名で取得する関数
   */
  const handleGetPokemonByName = useCallback(async () => {
    if (!pokemonName) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonData<PokemonType>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
      );
      setPokemonData(data);
      const audioElement = new Audio(data.cries.latest);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
      setAudio(audioElement);
    } catch (err) {
      setError(t("error_fetch"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pokemonName, t]);

  /**
   * 鳴き声を再生する
   */
  const playSound = useCallback(() => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, [audio]);

  /**
   * 鳴き声を停止する
   */
  const stopSound = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audio]);

  // TODO: 見せ方を考える
  return (
    <div className="mb-4">
      <h1 className="mb-8 text-2xl font-bold">① Pokemon API</h1>
      {/* <button
        onClick={handleGetPikachu}
        disabled={loading}
        className="w-40 h-40 pt-2 bg-neutral-800 font-bold text-neutral-300 rounded-full"
      >
        {t("get_pikachu")}
      </button> */}
      <p>{t("input_favorite_pokemon")}</p>
      {/* 日本語のみ表示 */}
      {i18n.language === "ja" && (
        <p className="text-sm">例：ピカチュウ → Pikachu</p>
      )}
      <div className="flex gap-2 items-center my-4">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder={t("input_placeholder")}
          className="w-56 h-10 px-2 pt-2 pb-1 border-2 border-neutral-800 bg-neutral-300 rounded outline-none"
        />
        <button
          onClick={handleGetPokemonByName}
          disabled={loading || !pokemonName}
          className="w-fit h-10 px-4 pt-2 pb-1 text-white rounded bg-purple-500 border-2 border-neutral-800 disabled:bg-neutral-500"
        >
          {t("get_pokemon")}
        </button>
      </div>
      {/* 日本語のみ表示 */}
      {i18n.language === "ja" && (
        <p className="text-sm">
          ⭐︎英語名が分からない方は以下をクリックでも入力できます
        </p>
      )}
      <div className="flex flex-row gap-4 mb-4">
        {pokemonList.map((pokemon) => (
          <button
            key={pokemon.enName}
            type="button"
            onClick={() => setPokemonName(pokemon.enName)}
            className="text-sm text-blue-600 underline hover:text-blue-800 cursor-pointer bg-transparent border-none p-0 m-0"
            style={{ display: "block", textAlign: "left" }}
          >
            {i18n.language === "ja" ? pokemon.jaName : pokemon.enName}
          </button>
        ))}
      </div>

      {/* ポケモンの情報を表示 */}
      {pokemonData && (
        <div className="w-fit bg-neutral-300 border-2 border-neutral-800 rounded-md p-4">
          <h1 className="text-xl font-bold">
            <span className="text-sm">{t("id")}:</span>
            <span className="">{pokemonData.id}</span>
            <span className="ml-2 text-3xl">{pokemonData.name}</span>
          </h1>
          <ul className="flex flex-row gap-4">
            <li>
              {t("height")}:
              <span className="ml-2 font-bold">{pokemonData.height / 10}m</span>
            </li>
            <li>
              {t("weight")}:
              <span className="ml-2 font-bold">
                {pokemonData.weight / 100}kg
              </span>
            </li>
            <li>
              {t("type")}:
              <span className="ml-2 font-bold">
                {pokemonData.types.map((t) => t.type.name).join(" / ")}
              </span>
            </li>
          </ul>
          <p>説明文</p>
          <div className="flex gap-2 mb-4">
            <button
              onClick={isPlaying ? stopSound : playSound}
              disabled={!audio}
              className={
                isPlaying
                  ? "bg-red-500 text-white px-4 pt-2 pb-1 rounded-md disabled:bg-gray-400"
                  : "bg-neutral-600 text-neutral-300 px-4 pt-2 pb-1 rounded-md disabled:bg-gray-400"
              }
            >
              {isPlaying ? t("stop") : t("play")}
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
      )}
      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
