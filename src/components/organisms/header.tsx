import { PiArrowDownDuotone } from 'react-icons/pi'
import LanguageButton from '@/components/molecules/languageButton'

export default function Header() {
  return (
    <header className="relative w-full h-svh content-center">
      <div className="header--title relative flex flex-row items-center justify-center ml-[-1.5rem]">
        <p className="rotate-[270deg] origin-top text-xl font-bold">U.Ezoe</p>
        <h1 className="header--title__main text-9xl font-bold leading-tight">
          Portfolio
        </h1>
      </div>
      <LanguageButton />
      <div className="header--arrow absolute bottom-24 inset-x-0 flex flex-col items-center">
        <p>Scroll down</p>
        <PiArrowDownDuotone size={32} />
      </div>
    </header>
  )
}
