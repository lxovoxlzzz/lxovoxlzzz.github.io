import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { FoxDataType } from '@/types/demo'
import { fetchApiData } from '@/utils/api'

export default function GetFoxImage() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [foxData, setFoxData] = useState<FoxDataType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies(handleGetFoxImage): suppress dependency handleGetFoxImage
  useEffect(() => {
    handleGetFoxImage()
  }, [])

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
  return { foxData, loading, error }
}
