import { useTranslation } from 'react-i18next'
import FoxApi from '@/components/organisms/foxApi'
import NasaApi from '@/components/organisms/nasaApi'
import PokemonApi from '@/components/organisms/pokemonApi'

export default function Demo() {
  const { t } = useTranslation()
  return (
    <article className="pt-36 pb-44 px-4 bg-yellow-500">
      <h1 className="mb-16 text-4xl font-bold">Demos</h1>
      <p className="mb-16 whitespace-pre-wrap">{t('demo.description')}</p>
      <PokemonApi />
      <NasaApi />
      <FoxApi />
    </article>
  )
}
