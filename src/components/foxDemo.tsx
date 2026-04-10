import { useTranslation } from 'react-i18next'
import handleGetFoxImage from '@/api/getFoxImage'

export default function FoxDemo() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const { foxData, loading, error } = handleGetFoxImage()

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
