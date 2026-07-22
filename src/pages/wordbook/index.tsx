import { useState, useEffect, useCallback } from 'react'
import Dashboard from '@/pages/wordbook/dashboard'
import CardScreen from '@/pages/wordbook/card'
import {
  getTodayStr,
  getMemorizedData,
  getFlippedData,
  resetAllData,
} from '@/utils/wordbookStorage'
import toeic600Data from '@/data/wordbook/toeic600.json'
import toeic800Data from '@/data/wordbook/toeic800.json'
import toeic990Data from '@/data/wordbook/toeic990.json'
import type { VIEW, MODE, LEVEL } from '@/pages/wordbook/const'

export default function WordbookIndex() {
  const [view, setView] = useState<VIEW>('DASHBOARD')
  const [level, setLevel] = useState<LEVEL>('600')
  const [mode, setMode] = useState<MODE>('ALL')

  const [stats, setStats] = useState({
    flippedToday: 0,
    memorizedToday: 0,
    memorizedTotal: 0,
    totalWords: 0,
  })

  const loadStats = useCallback(() => {
    const today = getTodayStr()
    const memorized = getMemorizedData()
    const flipped = getFlippedData()

    const totalWords =
      toeic600Data.length + toeic800Data.length + toeic990Data.length
    const flippedToday = flipped[today] || 0

    const memorizedTotal = Object.keys(memorized).length
    const memorizedToday = Object.values(memorized).filter(
      (d) => d === today,
    ).length

    setStats({
      flippedToday,
      memorizedToday,
      memorizedTotal,
      totalWords,
    })
  }, [])

  useEffect(() => {
    if (view === 'DASHBOARD') {
      loadStats()
    }
  }, [view, loadStats]) // Re-load when view switches back to dashboard

  const handleStart = (selectedLevel: LEVEL, selectedMode: MODE) => {
    setLevel(selectedLevel)
    setMode(selectedMode)
    setView('CARD')
  }

  const handleFinish = () => {
    setView('DASHBOARD')
  }

  const handleReset = () => {
    resetAllData()
    loadStats()
  }

  return (
    <>
      {view === 'DASHBOARD' ? (
        <Dashboard stats={stats} onStart={handleStart} onReset={handleReset} />
      ) : (
        <CardScreen level={level} mode={mode} onFinish={handleFinish} />
      )}
    </>
  )
}
