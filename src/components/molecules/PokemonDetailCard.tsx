import { useTranslation } from "react-i18next";
import type { PokemonDataType, SpeciesDataType } from "@/types/demo";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import noImage from "@/assets/no_image.svg";

interface Props {
  pokemonData: PokemonDataType;
  speciesData: SpeciesDataType | null;
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  playSound: () => void;
  stopSound: () => void;
}

export default function PokemonDetailCard({
  pokemonData,
  speciesData,
  audio,
  isPlaying,
  playSound,
  stopSound,
}: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: "poke" });
  console.log(speciesData);
  return (
    <>
      <div className="w-full flex flex-row pt-10">
        <div className="basis-1/2 flex flex-col items-center justify-center">
          {/* ポケモンの動く画像 */}
          {pokemonData.sprites.other.showdown.front_default ? (
            <img
              src={pokemonData.sprites.other.showdown.front_default}
              alt={`${pokemonData.name}'s showdown image`}
              width={70}
              height={70}
            />
          ) : (
            <img src={noImage} alt="no image" width={80} height={80} />
          )}
          {/* 図鑑番号 */}
          <p className="mt-6 font-fj">
            <span className="text-sm">{t("id")}</span>
            <span className="font-fj text-xl">{pokemonData.id}</span>
          </p>
        </div>
        <div className="basis-1/2 flex flex-col justify-center">
          {/* 鳴き声再生・停止ボタン */}
          <div className="absolute top-5 right-5">
            <button
              onClick={isPlaying ? stopSound : playSound}
              disabled={!audio}
              className={
                isPlaying
                  ? "bg-rose-700 text-white px-3 py-2.5 aspect-square rounded-full disabled:bg-gray-400"
                  : "bg-cyan-700 text-neutral-300 px-3 py-2.5 aspect-square rounded-full disabled:bg-gray-400"
              }
            >
              {isPlaying ? <HiMiniSpeakerXMark /> : <HiMiniSpeakerWave />}
            </button>
          </div>
          {/* ポケモンの名前・ステータス */}
          <h1 className="text-2xl font-bold">{speciesData?.pokemonName}</h1>
          <h2 className="text-sm">{speciesData?.pokemonGenre}</h2>
          <ul className="font-fj mt-2 text-sm">
            <li className="mb-1">
              {t("height")}
              <span className="ml-4 font-bold">{pokemonData.height / 10}m</span>
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
      {/* ポケモンの説明 */}
      <div className="w-full border-t border-neutral-400 mt-8 mb-2">
        <p className="mt-8">
          {speciesData?.flavorText.length
            ? speciesData.flavorText
            : t("no_description")}
        </p>
      </div>
      {/* ポケモンの前後画像 */}
      <div className="flex flex-row gap-4 items-center justify-center">
        <div className="flex flex-col content-center">
          {pokemonData.sprites.front_default ? (
            <img
              src={pokemonData.sprites.front_default}
              alt={`${pokemonData.name}'s front image`}
              width={110}
              height={110}
            />
          ) : (
            <img src={noImage} alt="no image" width={110} height={110} />
          )}
          <p className="text-center text-sm">front</p>
        </div>
        <div className="flex flex-col content-center">
          {pokemonData.sprites.back_default ? (
            <img
              src={pokemonData.sprites.back_default}
              alt={`${pokemonData.name}'s back image`}
              width={110}
              height={110}
            />
          ) : (
            <img src={noImage} alt="no image" width={110} height={110} />
          )}
          <p className="text-center text-sm">back</p>
        </div>
      </div>
    </>
  );
}
