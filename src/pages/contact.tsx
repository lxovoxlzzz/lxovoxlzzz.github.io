import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import birdHeadImage from '@/assets/birdhead.png'

export default function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const [imageState, setImageState] = useState<'idle' | 'in' | 'out'>('idle')
  const sectionRef = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)

  /**
   * 画面に入ったら鳥をスライドイン
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          setImageState('in')

          // Wait for 1s slide in + 3s display = 4000ms
          setTimeout(() => {
            setImageState('out')
          }, 4000)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  /**
   * メールアドレスをクリップボードにコピー
   */
  const copyEmailToClipboard = () => {
    const email = ['uta.ezoe', 'gmail.com'].join('@')
    navigator.clipboard
      .writeText(email)
      .then(() => setCopied(true))
      .catch(() => setError('Copy failed...'))
  }

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 text-zinc-900 bg-neutral-300"
    >
      <div className="w-full max-w-4xl px-6 place-self-center">
        <h1 className="mb-8 text-4xl font-bold">Contact</h1>
        <p className="mb-8 whitespace-pre-wrap">{t('contact.message')}</p>
        <Button
          label={error ? error : copied ? 'Copied 🎉' : 'Copy email address'}
          onClick={copyEmailToClipboard}
          width="w-52"
          height="h-12"
          bgColor={error ? 'bg-red-700' : 'bg-neutral-800'}
          textColor="text-neutral-300"
          borderColor={error ? 'border-red-700' : 'border-neutral-800'}
        />
      </div>
      <img
        src={birdHeadImage}
        alt="Bird Head"
        width="850"
        height="607"
        className={`fixed top-1/2 z-50 w-[750px] h-auto transition-all duration-1000 ease-in-out pointer-events-none transform translate-x-1/2 -translate-y-1/2 ${
          imageState === 'in' ? 'right-1/5' : '-right-full'
        }`}
      />
    </section>
  )
}
