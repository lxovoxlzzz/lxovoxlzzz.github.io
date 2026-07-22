import { SITE_NAME } from '@/const/globals'

export default function Footer() {
  return (
    <footer className="w-full mt-6 p-6 text-center text-slate-400 text-xs bg-slate-950 border-t border-slate-800">
      <p>
        &copy; {new Date().getFullYear()} {SITE_NAME}
      </p>
    </footer>
  )
}
