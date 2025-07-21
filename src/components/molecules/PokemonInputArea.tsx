import { useTranslation } from "react-i18next";

interface Props {
  pokemonIDName: string;
  setPokemonIDName: (name: string) => void;
  handleGetPokemonData: () => void;
  loading: boolean;
}

const pokemonList = [
  { jaName: "イーブイ", enName: "Eevee" },
  { jaName: "メタモン", enName: "ditto" },
  { jaName: "ポリゴン", enName: "Porygon" },
  { jaName: "バタフリー", enName: "Butterfree" },
  { jaName: "ラプラス", enName: "Lapras" },
  { jaName: "ミュウ", enName: "Mew" },
  { jaName: "カビゴン", enName: "Snorlax" },
  { jaName: "ミニリュウ", enName: "Dratini" },
  { jaName: "ロコン", enName: "vulpix" },
  { jaName: "コダック", enName: "psyduck" },
  { jaName: "ガーディ", enName: "growlithe" },
  { jaName: "ウツドン", enName: "weepinbell" },
  { jaName: "カモネギ", enName: "farfetchd" },
  { jaName: "ゲンガー", enName: "gengar" },
  { jaName: "カラカラ", enName: "cubone" },
  { jaName: "ヒトデマン", enName: "staryu" },
  { jaName: "デンリュウ", enName: "ampharos" },
  { jaName: "デリバード", enName: "delibird" },
  { jaName: "ポリゴン２", enName: "porygon2" },
  { jaName: "アブソル", enName: "absol" },
];

export default function PokemonInputArea({
  pokemonIDName,
  setPokemonIDName,
  handleGetPokemonData,
  loading,
}: Props) {
  const { t, i18n } = useTranslation(undefined, { keyPrefix: "poke" });
  return (
    <div className="basis-1/2">
      <p>{t("input_favorite_pokemon")}</p>
      <div className="flex gap-2 items-center my-4">
        <input
          type="text"
          value={pokemonIDName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPokemonIDName(e.target.value)
          }
          placeholder={t("input_placeholder")}
          className="w-56 h-10 px-2 pt-2 pb-1 border-2 border-neutral-800 bg-neutral-300 rounded outline-none"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.nativeEvent.isComposing &&
              !loading &&
              pokemonIDName
            ) {
              handleGetPokemonData();
            }
          }}
        />
        <button
          onClick={() => handleGetPokemonData()}
          disabled={loading || !pokemonIDName}
          className="w-fit px-4 pt-2 pb-1 text-white rounded bg-purple-500 border-2 border-neutral-800 disabled:bg-neutral-500"
        >
          {t("get_pokemon")}
        </button>
      </div>
      <p className="text-sm">{t("pickup")}</p>
      {pokemonList.map((pokemon) => {
        const pokemonName =
          i18n.language === "ja" ? pokemon.jaName : pokemon.enName;
        return (
          <button
            key={pokemon.enName}
            type="button"
            onClick={() => setPokemonIDName(pokemonName)}
            className="mr-4 text-sm text-blue-600 underline hover:text-blue-800 cursor-pointer bg-transparent border-none"
          >
            {pokemonName}
          </button>
        );
      })}
    </div>
  );
}
