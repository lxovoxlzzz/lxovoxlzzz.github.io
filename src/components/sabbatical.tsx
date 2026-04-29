import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import inputImage from '@/assets/sabbatical/input-image.png'
import inputThumb from '@/assets/sabbatical/input-image-thumb.webp'
import mainImage from '@/assets/sabbatical/main-image.png'
import mainThumb from '@/assets/sabbatical/main-image-thumb.webp'
import Button from '@/components/ui/Button'

export default function Sabbatical() {
  const { t } = useTranslation()
  const [expandedImage, setExpandedImage] = useState<string | null>(null)

  return (
    <section className="mb-28">
      <h1 className="mb-8 text-2xl font-bold">3. Sabbatical APP</h1>
      <p className="mb-4 whitespace-pre-wrap">
        {t('demo.sabbatical.description')}
      </p>
      <a
        href="https://sabbatical-beige.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          label={t('demo.sabbatical.button')}
          onClick={() => {}}
          width="w-52"
          height="h-12"
          bgColor="bg-gray-900"
          textColor="text-white"
        />
      </a>
      <div className="flex flex-col sm:flex-row gap-4 my-4">
        <img
          src={mainThumb}
          width={1300}
          height={1125}
          loading="lazy"
          alt="Sabbatical App Main Image"
          className="object-cover w-full sm:w-[49%] lg:w-sm h-sm cursor-pointer transition-opacity hover:opacity-90"
          onClick={() => setExpandedImage(mainImage)}
          onKeyDown={() => setExpandedImage(mainImage)}
        />
        <img
          src={inputThumb}
          width={1300}
          height={1317}
          loading="lazy"
          alt="Sabbatical App Input Image"
          className="object-cover w-full sm:w-[49%] lg:w-sm h-sm cursor-pointer transition-opacity hover:opacity-90"
          onClick={() => setExpandedImage(inputImage)}
          onKeyDown={() => setExpandedImage(inputImage)}
        />
      </div>
      <p className="mt-4 whitespace-pre-wrap">{t('demo.sabbatical.tech')}</p>

      {expandedImage && (
        // biome-ignore lint/a11y/useSemanticElements: Backdrop cannot be a button because it contains a dialog div
        <div
          className="fixed inset-0 z-50 flex items-center justify-center max-w-full bg-black/70 p-4"
          onClick={() => setExpandedImage(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setExpandedImage(null)
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div
            className="relative max-w-full md:max-w-[90%] max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute -top-12 right-0 sm:-right-12 sm:top-0 p-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
              onClick={() => setExpandedImage(null)}
              aria-label="Close"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={expandedImage}
              alt="Expanded view"
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  )
}
