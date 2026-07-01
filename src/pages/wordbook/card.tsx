import { useEffect, useState } from 'react'
import { SITE_NAME } from '@/const/globals'
import WordbookCard from '@/components/wordbookCard'
import toeic600Data from '@/data/wordbook/toeic600.json'
import toeic800Data from '@/data/wordbook/toeic800.json'
import toeic990Data from '@/data/wordbook/toeic990.json'
import {
  getMemorizedData,
  toggleMemorized,
  incrementTodayFlipped,
} from '@/utils/wordbookStorage'
import type { Level, Mode } from './index'

interface Word {
  id: number
  word: string
  meaning: string
  example: string
}

const dataMap: Record<Level, Word[]> = {
  toeic600: toeic600Data,
  toeic800: toeic800Data,
  toeic990: toeic990Data,
}

interface CardScreenProps {
  level: Level
  mode: Mode
  onFinish: () => void
}

export default function CardScreen({ level, mode, onFinish }: CardScreenProps) {
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [memorizedMap, setMemorizedMap] = useState<Record<number, string>>({})

  useEffect(() => {
    const memorized = getMemorizedData()
    setMemorizedMap(memorized)

    // Filter words based on mode
    let filtered = [...dataMap[level]]
    if (mode === 'unmemorized') {
      filtered = filtered.filter((w) => !memorized[w.id])
    }

    // Shuffle words
    const shuffled = filtered.sort(() => Math.random() - 0.5)
    setWords(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [level, mode])

  const handleFlip = () => {
    if (!isFlipped) {
      incrementTodayFlipped()
    }
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 200)
  }

  const currentWord = words[currentIndex]

  const handleMemorizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentWord) return
    const checked = e.target.checked
    toggleMemorized(currentWord.id, checked)
    
    // Update local map state
    setMemorizedMap((prev) => {
      const next = { ...prev }
      if (checked) {
        // Just set an arbitrary date string (today)
        const d = new Date()
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        next[currentWord.id] = dateStr
      } else {
        delete next[currentWord.id]
      }
      return next
    })
  }

  const isCurrentWordMemorized = currentWord ? !!memorizedMap[currentWord.id] : false

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 pt-32 sm:pt-24 pb-20">
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center bg-slate-900/90 backdrop-blur-sm z-10 gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onFinish}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            終了
          </button>
          <h1 className="font-semibold tracking-wide text-xs uppercase text-slate-400">
            Wordbook ({level.toUpperCase()})
          </h1>
        </div>

        {words.length > 0 && (
          <div className="font-mono text-sm text-slate-400">
            <span className="text-sky-300 font-bold text-xl">
              {currentIndex + 1}
            </span>
            <span className="mx-1">/</span>
            {words.length}
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md mt-4 sm:mt-0">
        {words.length === 0 ? (
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <p className="text-center text-sm">
              {mode === 'unmemorized'
                ? 'このレベルのすべての単語を覚えました！'
                : '単語が登録されていません。'}
            </p>
            <button
              type="button"
              onClick={onFinish}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              ダッシュボードに戻る
            </button>
          </div>
        ) : (
          <>
            <WordbookCard
              word={currentWord}
              isFlipped={isFlipped}
              onFlip={handleFlip}
              onNext={handleNext}
            />

            {/* Memorized Toggle Checkbox */}
            <div className="mt-8 flex items-center justify-center">
              <label className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-slate-800 bg-slate-850/60 backdrop-blur-sm cursor-pointer select-none text-slate-300 hover:text-white hover:border-slate-700 transition-all">
                <input
                  type="checkbox"
                  checked={isCurrentWordMemorized}
                  onChange={handleMemorizeChange}
                  className="w-5 h-5 rounded border-slate-700 text-sky-600 focus:ring-sky-500 focus:ring-offset-slate-900 bg-slate-800 cursor-pointer"
                />
                <span className="text-sm font-semibold tracking-wide">覚えた</span>
              </label>
            </div>
          </>
        )}
      </main>

      <footer className="fixed bottom-0 w-full p-6 text-center text-slate-400 text-xs bg-slate-900/90 backdrop-blur-sm">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </footer>
    </div>
  )
}
