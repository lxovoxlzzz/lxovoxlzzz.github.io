import "./App.css";
import PokemonApi from "@/components/organisms/pokemonApi";
import NasaApi from "@/components/organisms/nasaApi";
import FoxApi from "@/components/organisms/foxApi";
import Header from "@/components/organisms/header";
import About from "@/components/pages/about";
import Contact from "@/components/pages/contact";
import Footer from "@/components/organisms/footer";

function App() {
  return (
    <>
      <Header />
      <main className="relative w-full min-h-svh bg-yellow-500">
        <article className="max-w-5xl mx-auto pt-36 pb-44">
          <h1 className="mb-16 text-4xl font-bold">Demos</h1>
          <PokemonApi />
          <NasaApi />
          <FoxApi />
        </article>
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
