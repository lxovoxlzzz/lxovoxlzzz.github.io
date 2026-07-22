import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import type { MODE, LEVEL } from '@/pages/wordbook/const'
import Header from '@/pages/wordbook/ui/header'
import Footer from '@/pages/wordbook/ui/footer'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DashboardProps {
  stats: {
    flippedToday: number
    memorizedToday: number
    memorizedTotal: number
    totalWords: number
  }
  onStart: (level: LEVEL, mode: MODE) => void
  onReset: () => void
}

export default function Dashboard({ stats, onStart, onReset }: DashboardProps) {
  const [level, setLevel] = useState<LEVEL>('600')
  const [mode, setMode] = useState<MODE>('ALL')

  const createChartData = (value: number, total: number, color: string) => {
    const clampedValue = Math.min(value, total)
    const remaining = Math.max(0, total - clampedValue)
    return {
      labels: ['達成', '残り'],
      datasets: [
        {
          data: [clampedValue, remaining],
          backgroundColor: [color, '#334155'], // 進捗カラーと背景のダークグレー
          borderWidth: 0,
          hoverOffset: 0,
        },
      ],
    }
  }

  const chartOptions: ChartOptions<'doughnut'> = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || ''
            const value = context.parsed
            return ` ${label}: ${value}`
          },
        },
      },
    },
    maintainAspectRatio: false,
  }

  const handleStart = () => {
    onStart(level, mode)
  }

  const handleResetClick = () => {
    if (
      window.confirm(
        '学習データをすべてリセットしますか？この操作は取り消せません。',
      )
    ) {
      onReset()
    }
  }

  // 各指標のパーセンテージ計算
  const getPercentage = (value: number, total: number) => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100">
      <Header title={'Wordbook Dashboard'} border />

      <main className="flex-1 w-full max-w-4xl flex flex-col gap-8 mt-4 sm:mt-0 p-4 md:p-0">
        {/* グラフセクション */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 今日めくった数 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <h3 className="text-sm font-medium text-slate-400 mb-4">
              今日めくった数
            </h3>
            <div className="relative w-36 h-36 mb-4">
              <Doughnut
                data={createChartData(
                  stats.flippedToday,
                  stats.totalWords,
                  '#0ea5e9',
                )}
                options={chartOptions}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-sky-400">
                  {getPercentage(stats.flippedToday, stats.totalWords)}%
                </span>
              </div>
            </div>
            <p className="font-mono text-sm text-slate-300">
              <span className="text-sky-400 font-bold text-lg">
                {stats.flippedToday}
              </span>
              <span className="text-slate-500 mx-1">/</span>
              {stats.totalWords} 単語
            </p>
          </div>

          {/* 今日覚えた数 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <h3 className="text-sm font-medium text-slate-400 mb-4">
              今日覚えた数
            </h3>
            <div className="relative w-36 h-36 mb-4">
              <Doughnut
                data={createChartData(
                  stats.memorizedToday,
                  stats.totalWords,
                  '#10b981',
                )}
                options={chartOptions}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-emerald-400">
                  {getPercentage(stats.memorizedToday, stats.totalWords)}%
                </span>
              </div>
            </div>
            <p className="font-mono text-sm text-slate-300">
              <span className="text-emerald-400 font-bold text-lg">
                {stats.memorizedToday}
              </span>
              <span className="text-slate-500 mx-1">/</span>
              {stats.totalWords} 単語
            </p>
          </div>

          {/* 今日までに覚えた数 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <h3 className="text-sm font-medium text-slate-400 mb-4">
              今日までに覚えた数
            </h3>
            <div className="relative w-36 h-36 mb-4">
              <Doughnut
                data={createChartData(
                  stats.memorizedTotal,
                  stats.totalWords,
                  '#6366f1',
                )}
                options={chartOptions}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-indigo-400">
                  {getPercentage(stats.memorizedTotal, stats.totalWords)}%
                </span>
              </div>
            </div>
            <p className="font-mono text-sm text-slate-300">
              <span className="text-indigo-400 font-bold text-lg">
                {stats.memorizedTotal}
              </span>
              <span className="text-slate-500 mx-1">/</span>
              {stats.totalWords} 単語
            </p>
          </div>
        </section>

        {/* 設定・スタートセクション */}
        <section className="flex flex-col items-center p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm max-w-xl mx-auto w-full gap-6">
          <h2 className="text-base font-semibold tracking-wide text-slate-300 uppercase">
            Learning Settings
          </h2>

          {/* レベル選択 */}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              単語レベル
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['600', '800', '990'] as LEVEL[]).map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`pt-3 pb-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    level === l
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20'
                      : 'bg-slate-850 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  TOEIC {l}
                </button>
              ))}
            </div>
          </div>

          {/* 出題対象のラジオボタン */}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              出題対象
            </span>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-between p-4 pb-3 rounded-xl border transition-all cursor-pointer ${
                  mode === 'ALL'
                    ? 'border-sky-500 bg-sky-950/20 text-sky-200'
                    : 'border-slate-800 bg-slate-900/20 text-slate-400 hover:bg-slate-900/50'
                }`}
              >
                <span className="text-sm font-medium">全ての単語</span>
                <input
                  type="radio"
                  name="mode"
                  value="ALL"
                  checked={mode === 'ALL'}
                  onChange={() => setMode('ALL')}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    mode === 'ALL' ? 'border-sky-500' : 'border-slate-600'
                  }`}
                >
                  {mode === 'ALL' && (
                    <div className="w-2 h-2 rounded-full bg-sky-500" />
                  )}
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-4 pb-3 rounded-xl border transition-all cursor-pointer ${
                  mode === 'UNMEMORIZED'
                    ? 'border-sky-500 bg-sky-950/20 text-sky-200'
                    : 'border-slate-800 bg-slate-900/20 text-slate-400 hover:bg-slate-900/50'
                }`}
              >
                <span className="text-sm font-medium">覚えた単語以外</span>
                <input
                  type="radio"
                  name="mode"
                  value="UNMEMORIZED"
                  checked={mode === 'UNMEMORIZED'}
                  onChange={() => setMode('UNMEMORIZED')}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    mode === 'UNMEMORIZED'
                      ? 'border-sky-500'
                      : 'border-slate-600'
                  }`}
                >
                  {mode === 'UNMEMORIZED' && (
                    <div className="w-2 h-2 rounded-full bg-sky-500" />
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* スタートボタン */}
          <button
            type="button"
            onClick={handleStart}
            className="w-full mt-4 pt-4 pb-3 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            Start
          </button>
        </section>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleResetClick}
            className="px-4 pt-2 pb-1 rounded-full text-xs font-semibold border border-rose-900/50 text-rose-400 bg-rose-950/10 hover:bg-rose-950/30 transition-all cursor-pointer"
          >
            Reset All Data
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
