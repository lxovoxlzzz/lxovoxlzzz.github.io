import PokemonApi from "@/components/organisms/pokemonApi";
import NasaApi from "@/components/organisms/nasaApi";
import FoxApi from "@/components/organisms/foxApi";

export default function Demo() {
  return (
    <article className="max-w-5xl mx-auto pt-36 pb-44">
      <h1 className="mb-16 text-4xl font-bold">Demos</h1>
      <PokemonApi />
      <NasaApi />
      <FoxApi />
    </article>
  );
}
