import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PokemonDetailCard from '@/components/molecules/PokemonDetailCard'
import PokemonInputArea from '@/components/molecules/PokemonInputArea'
import pokemonNameMapJson from '@/data/pokemon-name-map.json'
import type {
  FlavorTextEntryType,
  GenusEntryType,
  NameEntryType,
  PokemonDataType,
  SpeciesDataType,
} from '@/types/demo'
import { fetchApiData } from '@/utils/api'

const pokemonNameMap = pokemonNameMapJson as Record<string, string>

export default function PokemonApi() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'demo.poke' })
  const [pokemonData, setPokemonData] = useState<PokemonDataType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [pokemonIDorName, setPokemonIDorName] = useState('')
  const [speciesData, setSpeciesData] = useState<SpeciesDataType | null>(null)

  // 初期表示時にピカチュウのデータを自動取得
  // biome-ignore lint/correctness/useExhaustiveDependencies(handleGetPokemonData): suppress dependency handleGetPokemonData
  // biome-ignore lint/correctness/useExhaustiveDependencies(i18n.language): suppress dependency i18n.language
  useEffect(() => {
    handleGetPokemonData('pikachu')
  }, [i18n.language])

  /**
   * species（説明文、ジャンル、日本語名）を取得する関数
   * MEMO: 現在は最初にヒットした説明文を取得しているが、バージョン指定してもいいかもしれない
   */
  const fetchSpeciesData = useCallback(
    async (speciesUrl: string) => {
      try {
        const response = await fetch(speciesUrl)
        const data = await response.json()

        const targetLanguage = i18n.language === 'ja' ? 'ja-Hrkt' : 'en'

        const flavorEntries: FlavorTextEntryType[] = data.flavor_text_entries
        const genera: GenusEntryType[] = data.genera
        const names: NameEntryType[] = data.names

        // 説明文を取得
        const flavorEntry = flavorEntries.find(
          (entry) => entry.language.name === targetLanguage,
        )
        // ジャンルを取得
        const pokemonGenreEntry = genera.find(
          (entry) => entry.language.name === targetLanguage,
        )
        // ポケモン名を取得
        const pokemonNameEntry = names.find(
          (entry) => entry.language.name === targetLanguage,
        )

        setError(null)

        return {
          flavorText: flavorEntry ? flavorEntry.flavor_text : '',
          pokemonGenre: pokemonGenreEntry ? pokemonGenreEntry.genus : '',
          pokemonName: pokemonNameEntry ? pokemonNameEntry.name : '',
        }
      } catch (error) {
        console.error('Species data fetch failed:', error)
        return {
          flavorText: '',
          pokemonGenre: '',
          pokemonName: '',
        }
      }
    },
    [i18n.language],
  )

  /**
   * 入力されたポケモン名でポケモンのデータを取得する関数
   * MEMO: 画面読み込み時のみ引数を使用
   */
  const handleGetPokemonData = useCallback(
    async (name?: string) => {
      let targetIDName = name ?? pokemonIDorName

      if (!targetIDName) return

      setLoading(true)

      // 日本語UIのときだけ日本語→英語変換
      if (i18n.language === 'ja' && pokemonNameMap[targetIDName]) {
        targetIDName = pokemonNameMap[targetIDName]
      }

      try {
        // pokemonのデータを取得
        const data = await fetchApiData<PokemonDataType>(
          `https://pokeapi.co/api/v2/pokemon/${targetIDName.toLowerCase()}`,
        )
        setPokemonData(data)
        // speciesを取得
        const species = await fetchSpeciesData(data.species.url)
        setSpeciesData(species)
        // audioをセット
        const audioElement = new Audio(data.cries.latest)
        audioElement.addEventListener('ended', () => setIsPlaying(false))
        setAudio(audioElement)
      } catch (err) {
        setError(t('error_fetch'))
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [pokemonIDorName, t, fetchSpeciesData, i18n.language],
  )

  /**
   * 鳴き声を再生
   */
  const playSound = useCallback(() => {
    if (audio) {
      audio.play()
      setIsPlaying(true)
    }
  }, [audio])

  /**
   * 鳴き声を停止
   */
  const stopSound = useCallback(() => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    }
  }, [audio])

  return (
    <section className="mb-28">
      <h1 className="mb-8 text-2xl font-bold">1. Poke API</h1>
      <div className="flex flex-row gap-4">
        {/* ポケモン名の入力・リスト表示 */}
        <PokemonInputArea
          pokemonIDorName={pokemonIDorName}
          setPokemonIDorName={setPokemonIDorName}
          handleGetPokemonData={handleGetPokemonData}
          loading={loading}
        />
        {/* ポケモンデータのカード表示 */}
        <div className="relative basis-1/2 max-w-96 min-h-96 p-6 flex flex-col justify-center items-center bg-neutral-200 border-2 border-neutral-800 rounded-md">
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            <div className="text-center text-red-600 font-bold whitespace-pre">
              {error}
            </div>
          ) : (
            pokemonData && (
              <PokemonDetailCard
                pokemonData={pokemonData}
                speciesData={speciesData}
                audio={audio}
                isPlaying={isPlaying}
                playSound={playSound}
                stopSound={stopSound}
              />
            )
          )}
        </div>
      </div>
    </section>
  )
}
