const KEY_MEMORIZED = 'wordbook_memorized_at'
const KEY_FLIPPED = 'wordbook_flipped_count'

export interface MemorizedData {
  [wordId: number]: string // wordId -> date string ("YYYY-MM-DD")
}

export interface FlippedData {
  [dateStr: string]: number // date string -> count
}

export function getTodayStr(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getMemorizedData(): MemorizedData {
  const raw = localStorage.getItem(KEY_MEMORIZED)
  return raw ? JSON.parse(raw) : {}
}

export function saveMemorizedData(data: MemorizedData) {
  localStorage.setItem(KEY_MEMORIZED, JSON.stringify(data))
}

export function getFlippedData(): FlippedData {
  const raw = localStorage.getItem(KEY_FLIPPED)
  return raw ? JSON.parse(raw) : {}
}

export function saveFlippedData(data: FlippedData) {
  localStorage.setItem(KEY_FLIPPED, JSON.stringify(data))
}

export function incrementTodayFlipped() {
  const today = getTodayStr()
  const data = getFlippedData()
  data[today] = (data[today] || 0) + 1
  saveFlippedData(data)
}

export function toggleMemorized(wordId: number, isMemorized: boolean) {
  const data = getMemorizedData()
  if (isMemorized) {
    data[wordId] = getTodayStr()
  } else {
    delete data[wordId]
  }
  saveMemorizedData(data)
}

export function resetAllData() {
  localStorage.removeItem(KEY_MEMORIZED)
  localStorage.removeItem(KEY_FLIPPED)
}
