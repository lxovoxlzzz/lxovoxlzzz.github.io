import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/hooks/use-toast'

export default function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()

  // TODO: メールアドレスコピー関数のみ残す
  const copyEmailToClipboard = () => {
    navigator.clipboard
      .writeText('test@gmail.com')
      .then(() => {
        toast({
          description: 'Copied 🎉',
        })
      })
      // setCopied(true))
      .catch(() => {
        toast({
          description: 'Copy failed...',
        })
      })
    // setError('Copy failed...'))
  }

  return (
    <article className="w-full bg-neutral-300">
      <section className="max-w-5xl mx-auto pt-36 pb-44">
        <h1 className="mb-16 text-4xl font-bold">Contact</h1>
        <p className="mb-8">{t('contact.message')}👇</p>
        <button
          type="button"
          onClick={copyEmailToClipboard}
          className={`text-neutral-300 px-8 py-3 rounded-md ${error ? 'bg-red-700' : 'bg-neutral-800'}`}
        >
          Copy email address
          {/* {error ? error : copied ? 'Copied 🎉' : 'Copy email address'} */}
        </button>
      </section>
    </article>
  )
}
