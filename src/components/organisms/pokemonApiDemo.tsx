import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { PokemonType } from "../../types/global";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";

/**
 * pokemonAPIからデータを取得する関数
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
  const [flavorText, setFlavorText] = useState<string>("");

  console.log(pokemonData);

  // 画面表示時にピカチュウのデータを自動取得
  useEffect(() => {
    handleGetPokemonData("pikachu");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * species（ポケモンの説明文）を取得する関数
   * MEMO: 現在は最初にヒットしたテキストを取得しているが、バージョン指定してもいいかもしれない
   */
  const fetchSpeciesData = useCallback(async (speciesUrl: string) => {
    try {
      const response = await fetch(speciesUrl);
      const data = await response.json();

      // 現在の言語に応じて取得
      const targetLanguage = i18n.language === "ja" ? "ja-Hrkt" : "en";
      const flavorEntry = data.flavor_text_entries.find(
        (entry: any) => entry.language.name === targetLanguage,
      );

      return flavorEntry ? flavorEntry.flavor_text : "";
    } catch (error) {
      console.error("Species data fetch failed:", error);
      return "";
    }
  }, []);

  /**
   * 入力されたポケモン名でポケモンのデータを取得する関数
   * MEMO: 画面読み込み時のみ引数を使用
   */
  const handleGetPokemonData = useCallback(
    async (name?: string) => {
      const targetName = name ?? pokemonName;
      if (!targetName) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonData<PokemonType>(
          `https://pokeapi.co/api/v2/pokemon/${targetName.toLowerCase()}`,
        );
        setPokemonData(data);
        const flavor = await fetchSpeciesData(data.species.url);
        setFlavorText(flavor);
        const audioElement = new Audio(data.cries.latest);
        audioElement.addEventListener("ended", () => setIsPlaying(false));
        setAudio(audioElement);
      } catch (err) {
        setError(t("error_fetch"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [pokemonName, t, fetchSpeciesData],
  );

  /**
   * 鳴き声を再生
   */
  const playSound = useCallback(() => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, [audio]);

  /**
   * 鳴き声を停止
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
          onClick={() => handleGetPokemonData()}
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
      <div className="relative max-w-96 bg-neutral-200 border-2 border-neutral-800 rounded-md p-4 min-h-64 flex flex-col justify-center items-center">
        {loading ? (
          <p>{t("loading")}</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : pokemonData ? (
          <>
            <div className="py-10 flex items-center justify-center">
              <img
                src={pokemonData.sprites.other.showdown.front_default}
                alt={`${pokemonData.name}'s showdown image`}
                width={60}
                height={60}
              />
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={isPlaying ? stopSound : playSound}
                disabled={!audio}
                className={
                  isPlaying
                    ? "bg-red-500 text-white px-3 py-2.5 rounded-md disabled:bg-gray-400"
                    : "bg-neutral-600 text-neutral-300 px-3 py-2.5 rounded-md disabled:bg-gray-400"
                }
              >
                {isPlaying ? <HiMiniSpeakerXMark /> : <HiMiniSpeakerWave />}
              </button>
            </div>
            <h1 className="font-bold">
              <span className="text-sm">{t("id")}</span>
              <span className="text-xl">{pokemonData.id}</span>
              <span className="ml-2 text-3xl">{pokemonData.name}</span>
            </h1>
            <ul className="flex flex-row gap-4">
              <li>
                {t("height")}:
                <span className="ml-2 font-bold">
                  {pokemonData.height / 10}m
                </span>
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
            {flavorText && (
              <div className="border-t border-neutral-400 mt-4">
                <p className="mt-4">{flavorText}</p>
              </div>
            )}
            <div className="flex flex-row gap-4 items-center justify-center">
              <div className="flex flex-col content-center">
                <img
                  src={pokemonData.sprites.front_default}
                  alt={`${pokemonData.name}'s front image`}
                  width={120}
                  height={120}
                />
                <p className="text-center text-sm">front</p>
              </div>
              <div className="flex flex-col content-center">
                <img
                  src={pokemonData.sprites.back_default}
                  alt={`${pokemonData.name}'s back image`}
                  width={120}
                  height={120}
                />
                <p className="text-center text-sm">back</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
