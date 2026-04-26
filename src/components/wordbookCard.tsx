interface Word {
  id: number
  word: string
  meaning: string
  example: string
}

interface FlashcardProps {
  word: Word
  isFlipped: boolean
  onFlip: () => void
  onNext: () => void
}

export default function Flashcard({
  word,
  isFlipped,
  onFlip,
  onNext,
}: FlashcardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-80 h-96 [perspective:1000px]">
        <div
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {/* Front */}
          <div className="absolute w-full h-full bg-slate-50 border-2 border-slate-200 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 [backface-visibility:hidden]">
            <h2 className="text-4xl font-bold text-slate-800 tracking-tight">
              {word.word}
            </h2>
            <p className="mt-4 text-slate-400 text-sm">Tap to flip</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-slate-800 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="text-center">
                <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  Meaning
                </span>
                <p className="text-xl font-medium mt-1 leading-relaxed">
                  {word.meaning}
                </p>
              </div>

              <div className="w-12 h-0.5 bg-slate-600 rounded-full"></div>

              <div className="text-center">
                <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  Example
                </span>
                <p className="text-lg italic text-slate-300 mt-1 leading-relaxed">
                  "{word.example}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 h-16 w-full flex items-center justify-center">
        {!isFlipped ? (
          <button
            type="button"
            onClick={onFlip}
            className="px-8 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-full font-medium transition-colors shadow-lg active:scale-95 transform duration-150 cursor-pointer"
          >
            めくる
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors shadow-lg active:scale-95 transform duration-150 flex items-center gap-2 cursor-pointer"
          >
            次の単語へ
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-label="Next Word"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
