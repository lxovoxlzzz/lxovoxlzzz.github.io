import { useTranslation } from 'react-i18next'
import FoxDemo from '@/components/foxDemo'
import NasaApi from '@/components/nasaApi'
import PokemonApi from '@/components/pokemonApi'
import Sabbatical from '@/components/sabbatical'
import ThreeJS from '@/components/threejs'

export default function Demo() {
  const { t } = useTranslation()
  return (
    <article className="py-32 md:py-44 bg-yellow-500">
      <section className="w-full max-w-4xl px-6 place-self-center">
        <h1 className="mb-16 text-4xl font-bold">Demos</h1>
        <p className="mb-16 whitespace-pre-wrap">{t('demo.description')}</p>
        <PokemonApi />
        <ThreeJS />
        <Sabbatical />
        {/* <NasaApi /> */}
        {/* <FoxDemo /> */}
      </section>
    </article>
  )
}
