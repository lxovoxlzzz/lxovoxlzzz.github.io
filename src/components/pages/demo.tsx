import PokemonApi from "@/components/organisms/pokemonApi";
import NasaApi from "@/components/organisms/nasaApi";
import FoxApi from "@/components/organisms/foxApi";
import { useTranslation } from "react-i18next";

export default function Demo() {
  const { t } = useTranslation();
  return (
    <article className="max-w-5xl mx-auto pt-36 pb-44">
      <h1 className="mb-16 text-4xl font-bold">Demos</h1>
      <p className="mb-16">
        {t("demo.description")}
      </p>
      <PokemonApi />
      <NasaApi />
      <FoxApi />
    </article>
  );
}
