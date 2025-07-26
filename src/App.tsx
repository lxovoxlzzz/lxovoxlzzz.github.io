import "./App.css";
import Header from "@/components/organisms/header";
import Demo from "@/components/pages/demo";
import About from "@/components/pages/about";
import Contact from "@/components/pages/contact";
import Footer from "@/components/organisms/footer";

function App() {
  return (
    <>
      <Header />
      <main className="relative w-full min-h-svh bg-yellow-500">
        <Demo />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
