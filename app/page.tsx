'use client'

import clsx from 'clsx'
import { TiltWrapper } from '@/components/tilt'
import { Card, PARALLAX_STYLE, TRANSFORM_ANIMATION } from '@/components/card'
import { Transition } from '@/components/transition'
import { useCallback, useRef, useState } from 'react'
import useElapsedTime from '@/hooks/useElapsedTime'
import NumberFlow, {continuous} from '@number-flow/react'

const SIDE_OVERLAY_STYLE =
  'pointer-events-none fixed z-10 from-white to-transparent backdrop-blur-[1px]'

export const runtime = 'experimental-edge'

export default function Home() {
  function generateDeck(): string[] {
    const suits = ['♠', '♥', '♦', '♣']
    const values = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
    ]
    return suits
      .flatMap((suit) => values.map((value) => `${value}${suit}`))
      .concat(
        suits.flatMap((suit) => values.map((value) => `${value}${suit}`)),
        suits.flatMap((suit) => values.map((value) => `${value}${suit}`)),
        suits.flatMap((suit) => values.map((value) => `${value}${suit}`)),
      )
  }

  const deck = generateDeck()
  
  const buckets = Array.from({ length: 10 }, () => [] as string[])
  deck.forEach((card, index) => {
    buckets[index % 10].push(card)
  })

  const [isRunning, setIsRunning] = useState(false)
  const [shuffleCount, setShuffleCount] = useState(0)
  const [matchFound, setMatchFound] = useState(false)
  const [originalDeck, setOriginalDeck] = useState<string[]>([])
  const [currentDeck, setCurrentDeck] = useState<string[]>([])
  const originalDeckRef = useRef<string>('')
  const { elapsedTime, startTimer, stopTimer } = useElapsedTime()
  const [matchMessage, setMatchMessage] = useState<string | null>(null)
  const [consoleMessages, setConsoleMessages] = useState<string[]>([])

  function shuffleDeck(deck: string[]): string[] {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const runSimulation = useCallback(() => {
    if (isRunning) return

    setIsRunning(true)
    setMatchFound(false)
    setShuffleCount(0)
    setMatchMessage(null)
    setConsoleMessages([])
    startTimer()

    const newOriginalDeck = shuffleDeck(generateDeck())
    setOriginalDeck(newOriginalDeck)
    originalDeckRef.current = newOriginalDeck.join(',')

    const worker = new Worker(
      new URL('../workers/shuffleWorker.ts', import.meta.url),
    )

    worker.onmessage = (event) => {
      const { shuffledDeck, count } = event.data
      setShuffleCount(count)
      setCurrentDeck(shuffledDeck)

      const timestamp = new Date().toLocaleTimeString()
      const allCards = shuffledDeck.join(', ')

      console.log(`[${timestamp}] Shuffle count: ${(parseInt(count).toLocaleString())},  Cards: ${allCards}`)

      if (shuffledDeck.join(',') === originalDeckRef.current) {
        worker.terminate()
        setIsRunning(false)
        setMatchFound(true)
        setMatchMessage(`Match found! Time taken: ${elapsedTime.toFixed(2)} seconds`)
        stopTimer()
      }
    }

    worker.postMessage({ originalDeck: originalDeckRef.current })

    return () => worker.terminate()
  }, [isRunning, startTimer, stopTimer, elapsedTime])

  return (
    <>
      <div className="relative flex">
       
        <div className="flex-1">
          <div
            aria-hidden
            className={clsx(
              SIDE_OVERLAY_STYLE,
              '-top-1 h-32 w-full bg-gradient-to-b gradient-mask-b-20',
            )}
          />
          <div
            aria-hidden
            className={clsx(
              SIDE_OVERLAY_STYLE,
              '-bottom-1 h-32 w-full bg-gradient-to-t gradient-mask-t-20',
            )}
          />
          <div
            aria-hidden
            className={clsx(
              SIDE_OVERLAY_STYLE,
              '-left-1 h-full w-32 bg-gradient-to-r gradient-mask-r-20',
            )}
          />
          <div
            aria-hidden
            className={clsx(
              SIDE_OVERLAY_STYLE,
              '-right-1 h-full w-32 bg-gradient-to-l gradient-mask-l-20',
            )}
          />
          <div
            className="grid fixed h-screen animation-infinite-grid left-[calc(50%+101px)] sm:left-[calc(50%+202px)] w-[808px] sm:w-[1212px] md:w-[1616px] lg:w-[2020px] sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-10"
            aria-label="An infinite scrolling grid with various design related tweets."
          >
            <div>
              {buckets[0].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div>
              {buckets[1].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div className="hidden sm:block">
              {buckets[2].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div className="hidden md:block">
              {buckets[3].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div className="hidden lg:block">
              {buckets[4].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div>
              {buckets[5].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div>
              {buckets[6].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div className="hidden sm:block">
              {buckets[7].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div className="hidden md:block">
              {buckets[8].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
            <div className="hidden lg:block">
              {buckets[9].map((card, index) => (
                <Card key={`original-${index}`} value={card} />
              ))}
            </div>
          </div>

          <Transition
            className="top-[50%] left-[50%] fixed z-50 -translate-x-[50%] -translate-y-[50%]"
            as="main"
            appear
            show
            enter="transition-[filter,opacity] ease-in-out duration-1000"
            enterFrom="blur-2xl opacity-0"
            enterTo="blur-none opacity-100"
          >
            <div className={clsx('hover:scale-[1.03]', TRANSFORM_ANIMATION)}>
              <TiltWrapper className="[transform-style:preserve-3d]">
                <div
                  className={clsx(
                    'group bg-white/[0.98] p-10 border border-black/5 bg-clip-padding rounded-[32px] font-inter shadow-xl hover:shadow-2xl [transform-style:preserve-3d]',
                    TRANSFORM_ANIMATION,
                  )}
                >
                  <h1
                    className={clsx(
                      'text-3xl font-semibold mb-4 text-center',
                      PARALLAX_STYLE,
                      TRANSFORM_ANIMATION,
                    )}
                  >
                    Shuffle Matcher
                  </h1>
                  <div className={clsx(
                    'flex flex-col items-center gap-2 mb-8',
                    PARALLAX_STYLE,
                    TRANSFORM_ANIMATION
                  )}>
                    <span className="text-lg text-gray-600 font-medium">Current Shuffles</span>
                    <NumberFlow 
                      plugins={[continuous]}
                      value={shuffleCount} 
                      willChange 
                      className="text-4xl font-bold text-gray-900"
                    />
                    <span className="text-sm text-gray-400 font-semibold text-center">(Counter updates every 12,000 decks)</span>
                  </div>

                  <button
                    className={clsx(
                      'flex items-center justify-center px-6 py-3 bg-twitter-blue rounded-full text-gray-50 gap-2 font-semibold text-lg w-fit mx-auto cursor-pointer shadow-lg group-hover:shadow-xl group-hover:shadow-twitter-blue/50 shadow-twitter-blue/50',
                      PARALLAX_STYLE,
                      TRANSFORM_ANIMATION,
                    )}
                    onClick={runSimulation}
                    disabled={isRunning}
                  >
                    {isRunning ? `Time: ${elapsedTime}` : 'Start Simulation'}
                  </button>
                </div>
              </TiltWrapper>
            </div>
          </Transition>
        </div>
      </div>
      {matchMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded">
          {matchMessage}
        </div>
      )}
    </>
  )
}

