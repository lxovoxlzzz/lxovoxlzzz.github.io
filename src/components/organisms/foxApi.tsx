import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { FoxDataType } from '@/types/demo'
import { fetchApiData } from '@/utils/api'

export default function FoxApiDemo() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [foxData, setFoxData] = useState<FoxDataType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies(handleGetFoxData): suppress dependency handleGetFoxData
  useEffect(() => {
    handleGetFoxData()
  }, [])

  /**
   * Fox apiからデータを取得する処理
   */
  const handleGetFoxData = useCallback(async () => {
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
  }, [t])

  return (
    <section className="mb-28">
      <h1 className="mb-8 text-2xl font-bold">3. Fox API</h1>
      <p className="mb-4">{t('fox_text')}</p>
      {loading && <p>Loading...</p>}
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
              className="text-sm text-blue-600 underline hover:text-blue-800 border-none"
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
