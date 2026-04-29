import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import FoxApi from '@/components/foxApi'
import PokemonApi from '@/components/pokemonApi'
import Sabbatical from '@/components/sabbatical'

const ThreeJS = React.lazy(() => import('@/components/threejs'))

export default function Demo() {
  const { t } = useTranslation()
  return (
    <section className="py-32 md:py-44 bg-yellow-500 text-zinc-900">
      <div className="w-full max-w-4xl px-6 place-self-center">
        <h1 className="mb-8 text-4xl font-bold">Demos</h1>
        <p className="mb-16 whitespace-pre-wrap">{t('demo.description')}</p>
        <PokemonApi />
        <Suspense>
          <ThreeJS />
        </Suspense>
        <Sabbatical />
        <FoxApi />
      </div>
    </section>
  )
}
