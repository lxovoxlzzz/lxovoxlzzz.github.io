import { HiArrowUturnRight } from 'react-icons/hi2'

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
  isCurrentWordMemorized: boolean
  handleMemorizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Flashcard({
  word,
  isFlipped,
  onFlip,
  onNext,
  isCurrentWordMemorized,
  handleMemorizeChange,
}: FlashcardProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-80 [perspective:1000px]">
        <div
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {/* Front */}
          <div className="absolute w-full h-full bg-slate-800 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 [backface-visibility:hidden]">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              {word.word}
            </h2>
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
              {/* Memorized Toggle Checkbox */}
              <div className="flex items-center justify-center">
                <label className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-800 bg-slate-850/60 backdrop-blur-sm cursor-pointer select-none text-slate-300 hover:text-white hover:border-slate-700 transition-all">
                  <input
                    type="checkbox"
                    checked={isCurrentWordMemorized}
                    onChange={handleMemorizeChange}
                    className="w-4 h-4 mt-[-3px] rounded border-slate-700 text-sky-600 focus:ring-sky-500 focus:ring-offset-slate-900 bg-slate-800 cursor-pointer"
                  />
                  <span className="text-slate-400 text-xs font-semibold tracking-wide">
                    I've memorized this word
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 h-16 w-full flex items-center justify-center">
        {!isFlipped ? (
          <button
            type="button"
            onClick={onFlip}
            className="flex items-center gap-4 px-8 pt-3 pb-2 bg-sky-600 hover:bg-sky-800 text-white rounded-full font-medium transition-colors shadow-lg active:scale-95 transform duration-150 cursor-pointer"
          >
            Flip Card <HiArrowUturnRight size={18} className="mt-[-4px]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="flex items-center gap-4 px-8 pt-3 pb-2 bg-sky-600 hover:bg-sky-800 text-white rounded-full font-medium transition-colors shadow-lg active:scale-95 transform duration-150 flex items-center gap-2 cursor-pointer"
          >
            Next Word <HiArrowUturnRight size={18} className="mt-[-4px]" />
          </button>
        )}
      </div>
    </div>
  )
}
