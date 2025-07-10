import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { PokemonType } from "@/types/global";
import type {
  FlavorTextEntryType,
  GenusEntryType,
  NameEntryType,
} from "@/types/demo";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import pokemonNameMapJson from "@/data/pokemon-name-map.json";

const pokemonNameMap = pokemonNameMapJson as Record<string, string>;

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
  const [pokemonIDName, setPokemonIDName] = useState("");
  const [speciesData, setSpeciesData] = useState<{
    flavorText: string;
    pokemonGenre: string;
    pokemonName: string;
  } | null>(null);

  console.log(pokemonData);
  console.log(pokemonIDName);

  // 画面表示時にピカチュウのデータを自動取得
  useEffect(() => {
    handleGetPokemonData("pikachu");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * species（説明文、ジャンル、日本語名）を取得する関数
   * MEMO: 現在は最初にヒットした説明文を取得しているが、バージョン指定してもいいかもしれない
   */
  const fetchSpeciesData = useCallback(
    async (speciesUrl: string) => {
      try {
        const response = await fetch(speciesUrl);
        const data = await response.json();

        const targetLanguage = i18n.language === "ja" ? "ja-Hrkt" : "en";

        const flavorEntries: FlavorTextEntryType[] = data.flavor_text_entries;
        const genera: GenusEntryType[] = data.genera;
        const names: NameEntryType[] = data.names;

        // 説明文を取得
        const flavorEntry = flavorEntries.find(
          (entry) => entry.language.name === targetLanguage,
        );
        // ジャンルを取得
        const pokemonGenreEntry = genera.find(
          (entry) => entry.language.name === targetLanguage,
        );
        // ポケモン名を取得
        const pokemonNameEntry = names.find(
          (entry) => entry.language.name === targetLanguage,
        );

        return {
          flavorText: flavorEntry ? flavorEntry.flavor_text : "",
          pokemonGenre: pokemonGenreEntry ? pokemonGenreEntry.genus : "",
          pokemonName: pokemonNameEntry ? pokemonNameEntry.name : "",
        };
      } catch (error) {
        console.error("Species data fetch failed:", error);
        return {
          flavorText: "",
          pokemonGenre: "",
          pokemonName: "",
        };
      }
    },
    [i18n.language],
  );

  /**
   * 入力されたポケモン名でポケモンのデータを取得する関数
   * MEMO: 画面読み込み時のみ引数を使用
   */
  const handleGetPokemonData = useCallback(
    async (name?: string) => {
      let targetIDName = name ?? pokemonIDName;
      if (!targetIDName) return;

      // 日本語名が対応表にあれば英語名に変換
      if (pokemonNameMap[targetIDName]) {
        targetIDName = pokemonNameMap[targetIDName];
      }

      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonData<PokemonType>(
          `https://pokeapi.co/api/v2/pokemon/${targetIDName.toLowerCase()}`,
        );
        setPokemonData(data);
        const species = await fetchSpeciesData(data.species.url);
        setSpeciesData(species);
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
    [pokemonIDName, t, fetchSpeciesData],
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

  return (
    <div className="mb-4">
      <h1 className="mb-8 text-2xl font-bold">① Poke API</h1>
      <div className="flex flex-row gap-4">
        <div className="basis-1/2">
          <p>{t("input_favorite_pokemon")}</p>
          <div className="flex gap-2 items-center my-4">
            <input
              type="text"
              value={pokemonIDName}
              onChange={(e) => setPokemonIDName(e.target.value)}
              placeholder={t("input_placeholder")}
              className="w-56 h-10 px-2 pt-2 pb-1 border-2 border-neutral-800 bg-neutral-300 rounded outline-none"
            />
            <button
              onClick={() => handleGetPokemonData()}
              disabled={loading || !pokemonIDName}
              className="w-fit h-10 px-4 pt-2 pb-1 text-white rounded bg-purple-500 border-2 border-neutral-800 disabled:bg-neutral-500"
            >
              {t("get_pokemon")}
            </button>
          </div>
          <p className="text-sm">{t("pickup")}</p>
          {/* テキスト補助入力用のボタン */}
          {pokemonList.map((pokemon) => {
            const pokemonName =
              i18n.language === "ja" ? pokemon.jaName : pokemon.enName;
            return (
              <button
                key={pokemon.enName}
                type="button"
                onClick={() => setPokemonIDName(pokemonName)}
                className="mr-2 text-sm text-blue-600 underline hover:text-blue-800 cursor-pointer bg-transparent border-none"
              >
                {pokemonName}
              </button>
            );
          })}
        </div>

        {/* ポケモンの情報を表示 */}
        {/* <div className="relative basis-1/2 max-w-96 bg-neutral-200 border-2 border-neutral-800 rounded-md p-4 min-h-64 flex flex-col justify-center items-center">
          {loading ? (
            <p>{t("loading")}</p>
          ) : error ? (
            <p className="text-center font-bold text-rose-500 whitespace-pre">
              {error}
            </p>
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
                <span className="font-fj text-sm">{t("id")}</span>
                <span className="font-fj text-xl">{pokemonData.id}</span>
                <span className="ml-2 text-2xl">
                  {speciesData?.pokemonName}
                </span>
              </h1>
              <h2 className="text-sm">{speciesData?.pokemonGenre}</h2>
              <ul className="flex flex-row gap-4 font-fj">
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
              {speciesData && (
                <div className="border-t border-neutral-400 mt-4">
                  <p className="mt-4">{speciesData.flavorText}</p>
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
        </div> */}
        {/* ポケモンの情報を表示 */}
        <div className="relative basis-1/2 max-w-96 px-4 pt-16 pb-4 min-h-64 flex flex-col justify-center items-center bg-neutral-200 border-2 border-neutral-800 rounded-md">
          {loading ? (
            <p>{t("loading")}</p>
          ) : error ? (
            <p className="text-center font-bold text-rose-500 whitespace-pre">
              {error}
            </p>
          ) : pokemonData ? (
            <>
              <div className="w-full flex flex-row">
                <div className="basis-1/2 flex flex-col items-center justify-center">
                  <img
                    src={pokemonData.sprites.other.showdown.front_default}
                    alt={`${pokemonData.name}'s showdown image`}
                    width={60}
                    height={60}
                  />
                  <p className="mt-6 font-fj">
                    <span className="text-sm">{t("id")}</span>
                    <span className="font-fj text-xl">{pokemonData.id}</span>
                  </p>
                </div>
                <div className="basis-1/2 flex flex-col justify-center">
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
                      {isPlaying ? (
                        <HiMiniSpeakerXMark />
                      ) : (
                        <HiMiniSpeakerWave />
                      )}
                    </button>
                  </div>
                  <h1 className="text-xl font-bold">
                    {speciesData?.pokemonName}
                  </h1>
                  <h2 className="text-sm">{speciesData?.pokemonGenre}</h2>
                  <ul className="font-fj mt-2 text-sm">
                    <li className="mb-1">
                      {t("height")}
                      <span className="ml-4 font-bold">
                        {pokemonData.height / 10}m
                      </span>
                    </li>
                    <li className="mb-1">
                      {t("weight")}
                      <span className="ml-4 font-bold">
                        {pokemonData.weight / 100}kg
                      </span>
                    </li>
                    <li>
                      {t("type")}
                      <span className="ml-4 font-bold">
                        {pokemonData.types.map((t) => t.type.name).join(" / ")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {speciesData && (
                <div className="border-t border-neutral-400 mt-8">
                  <p className="mt-8">{speciesData.flavorText}</p>
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
    </div>
  );
}
