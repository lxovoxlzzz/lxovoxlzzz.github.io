import { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import { MY_FAV_POKEMON_LIST } from '@/const/poke'
import { RiArrowDownDoubleFill } from "react-icons/ri"

interface Props {
  pokemonIDorName: string
  setPokemonIDorName: (name: string) => void
  handleGetPokemonData: () => void
  loading: boolean
}

export default function PokemonInputArea({
  pokemonIDorName,
  setPokemonIDorName,
  handleGetPokemonData,
  loading,
}: Props) {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'demo.poke' })
  const [isInView, setIsInView] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);

  // 表示されたらアローダウンのアニメーションを発火
  useEffect(() => {
    const target = animationRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect(); // 1回だけ
        }
      },
      { threshold: 0.2 });
    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={animationRef} className="basis-1/2">
      <p>{t('input_favorite_pokemon')}</p>
      <p className="flex items-center justify-center gap-2 w-80 mt-0 sm:mt-2">
        <span className={isInView ? "arrow-pop1" : ""}><RiArrowDownDoubleFill size={24} className="mr-1" /></span>
        <span className={isInView ? "arrow-pop2" : ""}><RiArrowDownDoubleFill size={24} className="mr-1" /></span>
        <span className={isInView ? "arrow-pop3" : ""}><RiArrowDownDoubleFill size={24} /></span>
      </p>
      <div className="flex gap-2 items-center w-80 h-10 my-4">
        <input
          type="text"
          name="pokemonIDorName"
          aria-label={t('input_placeholder')}
          value={pokemonIDorName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPokemonIDorName(e.target.value)
          }
          placeholder={t('input_placeholder')}
          className="w-full h-full px-2 pt-1 border-2 border-neutral-800 bg-neutral-300 rounded outline-none"
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.nativeEvent.isComposing &&
              !loading &&
              pokemonIDorName
            ) {
              handleGetPokemonData()
            }
          }}
        />
        <Button
          label={t('search')}
          onClick={() => handleGetPokemonData()}
          disabled={loading || !pokemonIDorName}
          width="w-fit"
          height="h-full"
          bgColor="bg-purple-500"
          textColor="text-white"
          borderColor="border-neutral-800"
          style="pt-1 whitespace-nowrap"
        />
      </div>
      <p className="text-sm">{t('pickup')}</p>
      {MY_FAV_POKEMON_LIST.map((pokemon) => {
        const pokemonName =
          i18n.language === 'ja' ? pokemon.jaName : pokemon.enName
        return (
          <button
            key={pokemon.enName}
            type="button"
            onClick={() => setPokemonIDorName(pokemonName)}
            className="mr-4 text-sm text-blue-600 underline cursor-pointer hover:text-blue-800 bg-transparent border-none"
          >
            {pokemonName}
          </button>
        )
      })}
    </div>
  )
}
