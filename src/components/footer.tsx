import { SITE_NAME } from '@/const/globals'

export default function Footer() {
  return (
    <footer className="w-full h-20 text-center content-center bg-neutral-800 text-neutral-300">
      <small>
        © {new Date().getFullYear()} {SITE_NAME}
      </small>
    </footer>
  )
}
