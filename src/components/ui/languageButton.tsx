import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import type { LangType } from '@/types/global'

const langs = [
  { lang: 'ja', label: '日本語' },
  { lang: 'en', label: 'English' },
] as const

const LangButton = ({ lang, label }: { lang: LangType; label: string }) => {
  const { i18n } = useTranslation()
  return (
    <Button
      label={label}
      onClick={() => i18n.changeLanguage(lang)}
      bgColor={i18n.language === lang ? 'bg-yellow-500' : 'bg-transparent'}
      borderColor="border-neutral-800"
    />
  )
}

export default function LanguageButton() {
  return (
    <div className="header--language flex flex-row gap-2 justify-center mt-4 transition-opacity duration-700">
      {langs.map(({ lang, label }) => (
        <LangButton key={lang} lang={lang} label={label} />
      ))}
    </div>
  )
}
