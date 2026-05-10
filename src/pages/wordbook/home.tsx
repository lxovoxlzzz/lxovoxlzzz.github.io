import { useEffect, useState } from 'react'
import { SITE_NAME } from '@/const/globals'
import WordbookCard from '@/components/wordbookCard'
import toeic600Data from '@/data/wordbook/toeic600.json'
import toeic800Data from '@/data/wordbook/toeic800.json'
import toeic990Data from '@/data/wordbook/toeic990.json'

interface Word {
  id: number
  word: string
  meaning: string
  example: string
}

type Level = 'toeic600' | 'toeic800' | 'toeic990'

const dataMap: Record<Level, Word[]> = {
  toeic600: toeic600Data,
  toeic800: toeic800Data,
  toeic990: toeic990Data,
}

export default function Home() {
  const [level, setLevel] = useState<Level>('toeic600')
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    // Shuffle words on load or level change
    const shuffled = [...dataMap[level]].sort(() => Math.random() - 0.5)
    setWords(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [level])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 200)
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-500">
        Loading...
      </div>
    )
  }

  const currentWord = words[currentIndex]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 pt-32 sm:pt-24 pb-20">
      <header className="fixed top-0 left-0 w-full p-6 flex flex-col sm:flex-row justify-between items-center bg-slate-900/90 backdrop-blur-sm z-10 gap-4 sm:gap-0">
        <h1 className="font-semibold tracking-wide text-sm uppercase text-slate-400">
          Wordbook
        </h1>
        <div className="flex gap-2">
          {(['toeic600', 'toeic800', 'toeic990'] as Level[]).map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 pt-2 pb-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                level === l
                  ? 'bg-sky-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="font-mono text-sm text-slate-400">
          <span className="text-sky-300 font-bold text-xl">
            {currentIndex + 1}
          </span>
          <span className="mx-1">/</span>
          {words.length}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md mt-4 sm:mt-0">
        <WordbookCard
          word={currentWord}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onNext={handleNext}
        />
      </main>

      <footer className="fixed bottom-0 w-full p-6 text-center text-slate-400 text-xs bg-slate-900/90 backdrop-blur-sm">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </footer>
    </div>
  )
}
