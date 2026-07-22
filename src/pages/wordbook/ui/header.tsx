import type { ReactNode } from 'react'

interface HeaderProps {
  title: string
  border?: boolean
  rightContent?: ReactNode
}

export default function Header({
  title,
  border = false,
  rightContent,
}: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 z-10 flex justify-between items-center gap-4 w-full h-18 p-6 pb-5 bg-slate-950 ${border ? 'border-b border-slate-800' : ''}`}
    >
      <h1 className="font-semibold tracking-wide text-xs uppercase text-slate-400">
        {title}
      </h1>
      {rightContent}
    </header>
  )
}
