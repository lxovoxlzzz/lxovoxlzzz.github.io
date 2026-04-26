import { useEffect, useState } from 'react'
import { SITE_NAME } from '@/const/globals'
import WordbookCard from '@/components/wordbookCard'
import wordsData from '@/data/wordbook.json'

interface Word {
  id: number
  word: string
  meaning: string
  example: string
}

export default function Home() {
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    // Shuffle words on load
    const shuffled = [...wordsData].sort(() => Math.random() - 0.5)
    setWords(shuffled)
  }, [])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 200) // Small delay to allow flip animation to reset if we want, but here we just reset flipped state first
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-500">
        Loading...
      </div>
    )
  }

  const currentWord = words[currentIndex]

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-slate-400">
        <h1 className="font-semibold tracking-wide text-sm uppercase">
          Wordbook
        </h1>
        <div className="font-mono text-sm">
          <span className="text-slate-800 font-bold">{currentIndex + 1}</span>
          <span className="mx-1">/</span>
          {words.length}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <WordbookCard
          word={currentWord}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onNext={handleNext}
        />
      </main>

      <footer className="absolute bottom-0 w-full p-6 text-center text-slate-400 text-xs">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </footer>
    </div>
  )
}
