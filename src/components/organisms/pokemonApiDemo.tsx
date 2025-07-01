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

export default function PokemonApiDemo() {
  const { t, i18n } = useTranslation();
  const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

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

  return (
    <div className="mb-4">
      <div className="flex justify-evenly">
        <button
          onClick={handleGetPikachu}
          disabled={loading}
          className="px-4 pt-2 pb-1 border-2 border-neutral-800 text-neutral-800 rounded"
        >
          {t("get_pikachu")}
        </button>
        <div className="flex gap-2">
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder={t("input_placeholder")}
            className="px-2 pt-2 pb-1 border-2 border-neutral-800 bg-neutral-300 rounded outline-none"
          />
          <button
            onClick={handleGetPokemonByName}
            disabled={loading || !pokemonName}
            className="px-4 pt-2 pb-1 text-white rounded bg-purple-500 border-2 border-neutral-800 disabled:bg-neutral-500"
          >
            {t("get_pokemon")}
          </button>
        </div>
      </div>
      {pokemonData && (
        <div>
          <h1 className="text-xl font-bold">{pokemonData.name}</h1>
          <ul className="flex flex-row gap-4">
            <li>
              {t("height")}: {pokemonData.height}
            </li>
            <li>
              {t("weight")}: {pokemonData.weight}
            </li>
            <li>
              {t("type")}: {pokemonData.types[0].type.name}
            </li>
            <li>
              {t("id")}: {pokemonData.id}
            </li>
          </ul>
          <div className="flex gap-2 mb-4">
            <button
              onClick={isPlaying ? stopSound : playSound}
              disabled={!audio}
              className={
                isPlaying
                  ? "bg-red-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
                  : "bg-neutral-600 text-neutral-300 px-4 pt-3 pb-2 rounded-md disabled:bg-gray-400"
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
