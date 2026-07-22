import { useEffect, useState } from 'react'
import WordbookCard from '@/pages/wordbook/wordbookCard'
import toeic600Data from '@/data/wordbook/toeic600.json'
import toeic800Data from '@/data/wordbook/toeic800.json'
import toeic990Data from '@/data/wordbook/toeic990.json'
import {
  getMemorizedData,
  toggleMemorized,
  incrementTodayFlipped,
} from '@/utils/wordbookStorage'
import type { MODE, LEVEL } from '@/pages/wordbook/const'
import type { Word } from '@/pages/wordbook/types'
import Header from '@/pages/wordbook/ui/header'
import Footer from '@/pages/wordbook/ui/footer'

const dataMap: Record<LEVEL, Word[]> = {
  600: toeic600Data,
  800: toeic800Data,
  990: toeic990Data,
}

interface CardScreenProps {
  level: LEVEL
  mode: MODE
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
    if (mode === 'UNMEMORIZED') {
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

  const isCurrentWordMemorized = currentWord
    ? !!memorizedMap[currentWord.id]
    : false

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
      <Header
        title={`Wordbook (TOEIC ${level})`}
        rightContent={
          words.length > 0 && (
            <div className="font-mono text-sm text-slate-400">
              <span className="text-sky-300 font-bold text-xl">
                {currentIndex + 1}
              </span>
              <span className="mx-1">/</span>
              {words.length}
            </div>
          )
        }
      />

      <main className="flex-1 flex flex-col items-center justify-center w-full mt-18 max-w-md p-6">
        {words.length === 0 ? (
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <p className="text-center text-sm">
              {mode === 'UNMEMORIZED'
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
              isCurrentWordMemorized={isCurrentWordMemorized}
              handleMemorizeChange={handleMemorizeChange}
            />
            <button
              type="button"
              onClick={onFinish}
              className="mt-6 px-4 pt-2 pb-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
            >
              FINISH
            </button>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
