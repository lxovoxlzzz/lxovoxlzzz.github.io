import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'

export default function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const copyEmailToClipboard = () => {
    const email = ['uta.ezoe', 'gmail.com'].join('@')
    navigator.clipboard
      .writeText(email)
      .then(() => setCopied(true))
      .catch(() => setError('Copy failed...'))
  }

  return (
    <article className="py-32 md:py-44 bg-neutral-300">
      <section className="w-full max-w-4xl px-6 place-self-center">
        <h1 className="mb-16 text-4xl font-bold">Contact</h1>
        <p className="mb-8">{t('contact.message')}👇</p>
        <Button
          label={error ? error : copied ? 'Copied 🎉' : 'Copy email address'}
          onClick={copyEmailToClipboard}
          width="w-52"
          height="h-12"
          bgColor={error ? 'bg-red-700' : 'bg-neutral-800'}
          textColor="text-neutral-300"
          borderColor={error ? 'border-red-700' : 'border-neutral-800'}
        />
      </section>
    </article>
  )
}
