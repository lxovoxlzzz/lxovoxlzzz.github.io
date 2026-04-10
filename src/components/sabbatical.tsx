import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'

export default function Sabbatical() {
  const { t } = useTranslation()

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
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <img
          src="/sabbatical/sabbatical-main-image.png"
          alt="Sabbatical App Main Image"
          className="object-cover w-sm h-sm"
        />
        <img
          src="/sabbatical/sabbatical-input-image.png"
          alt="Sabbatical App Input Image"
          className="object-cover w-sm h-sm"
        />
      </div>
      <p className="mt-4 whitespace-pre-wrap">{t('demo.sabbatical.tech')}</p>
    </section>
  )
}
