import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { FoxDataType } from '@/types/demo'
import { fetchApiData } from '@/utils/api'

export default function FoxApi() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [foxData, setFoxData] = useState<FoxDataType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasFetched, setHasFetched] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies(handleGetFoxImage): suppress dependency handleGetFoxImage
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFetched) {
          handleGetFoxImage()
          setHasFetched(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }, // 画面に入る300px手前で取得を開始する
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasFetched])

  /**
   * randomfox apiからデータを取得
   */
  const handleGetFoxImage = async () => {
    setLoading(true)
    try {
      const data = await fetchApiData<FoxDataType>(`https://randomfox.ca/floof`)
      setFoxData(data)
    } catch (err) {
      setError(t('error_fetch'))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={sectionRef} className="mb-28">
      <h1 className="mb-8 text-2xl font-bold">4. Fox API</h1>
      <p className="mb-4">{t('fox_text')}</p>
      {loading && <p className="mt-8 animate-pulse">{t('fox_loading')}</p>}
      {error && <p>{error}</p>}
      {foxData && (
        <div>
          <img
            src={foxData.image}
            alt="fox"
            className="max-w-md w-full mb-4 border-4 border-neutral-800"
          />
          <p>
            <a
              href={foxData.link}
              className="text-sm underline text-blue-700 hover:text-teal-600 border-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              API: Created by xinitrc
            </a>
          </p>
        </div>
      )}
    </section>
  )
}
