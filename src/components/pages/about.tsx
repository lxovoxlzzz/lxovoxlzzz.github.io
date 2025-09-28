import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import funny from '@/assets/funnyface.png'
import normal from '@/assets/normalface.png'
import type { IntroductionType } from '@/types/about'

export default function About() {
  const { t, i18n } = useTranslation()
  const [face, setFace] = useState<string>(normal)
  const colon = i18n.language === 'ja' ? '：' : ' :'

  return (
    <article className="bg-neutral-800 text-neutral-300 text-[15px]">
      <section className="pt-36 pb-44 px-4">
        <h1 className="mb-16 text-4xl font-bold">About Me</h1>
        <img
          className="face"
          src={face}
          alt="face"
          width={150}
          height={150}
          onMouseEnter={() => setFace(funny)}
          onMouseLeave={() => setFace(normal)}
        />
        <div>
          <h2 className="mt-4 text-xl font-bold">U.Ezoe</h2>
          <p>Freelance Designer (8 yrs) / Front-end Developer (4 yrs)</p>
          <dl className="mt-16">
            {Object.values(
              t('about.introduction', {
                returnObjects: true,
              }),
            ).map((item: IntroductionType) => (
              <React.Fragment key={item.title}>
                <dt className="font-bold mt-6">
                  {item.title}
                  {colon}
                </dt>
                <dd>
                  <ul className="ml-4">
                    {Object.entries(item.list).map(([key, value]) => {
                      const inner = value ? String(value) : ''
                      return (
                        <li key={key} className="list-disc">
                          {inner}
                        </li>
                      )
                    })}
                  </ul>
                </dd>
              </React.Fragment>
            ))}
          </dl>
          <dl className="mt-16">
            <dt className="font-bold">
              {t('about.thoughts.title')}
              {colon}
            </dt>
            {Object.values(
              t('about.thoughts.list', {
                returnObjects: true,
              }),
            ).map((item: string) => (
              <dd key={item} className="mb-4 whitespace-pre-wrap">
                {item}
              </dd>
            ))}
          </dl>
        </div>
      </section>
    </article>
  )
}
