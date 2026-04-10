import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'

export default function ThreeJSDemo() {
  const { t } = useTranslation()

  return (
    <section className="mb-28">
      <h1 className="mb-8 text-2xl font-bold">2. Three.js Demo</h1>
      <p className="mb-4 whitespace-pre-wrap">{t('demo.three.description')}</p>
      <a
        href="/src/pages/three/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          label={t('demo.three.button')}
          onClick={() => {}}
          width="w-52"
          height="h-12"
          bgColor="bg-gray-900"
          textColor="text-white"
        />
      </a>
    </section>
  )
}
