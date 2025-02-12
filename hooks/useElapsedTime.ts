"use client"

import { useState, useEffect, useCallback } from "react"

export default function useElapsedTime() {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const startTimer = useCallback(() => {
    setStartTime(Date.now())
    setElapsedTime(0)
  }, [])

  const stopTimer = useCallback(() => {
    setStartTime(null)
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const updateElapsedTime = () => {
      if (startTime) {
        const elapsed = (Date.now() - startTime) / 1000
        setElapsedTime(elapsed)
        animationFrameId = requestAnimationFrame(updateElapsedTime)
      }
    }

    if (startTime) {
      animationFrameId = requestAnimationFrame(updateElapsedTime)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [startTime])

  return { elapsedTime, startTimer, stopTimer }
}

