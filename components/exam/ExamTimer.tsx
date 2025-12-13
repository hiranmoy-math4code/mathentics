"use client"

import React, { useEffect, useState, useRef, memo } from "react"
import { Clock } from "lucide-react"

interface ExamTimerProps {
    initialSeconds: number
    onTimeUp: () => void
    timeRef: React.MutableRefObject<number>
    isActive: boolean
}

function ExamTimerComponent({ initialSeconds, onTimeUp, timeRef, isActive }: ExamTimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
    const onTimeUpRef = useRef(onTimeUp)

    useEffect(() => {
        setSecondsLeft(initialSeconds)
        timeRef.current = initialSeconds
    }, [initialSeconds, timeRef])

    useEffect(() => {
        onTimeUpRef.current = onTimeUp
    }, [onTimeUp])

    useEffect(() => {
        if (!isActive || secondsLeft <= 0) return

        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    onTimeUpRef.current()
                    return 0
                }
                const newVal = prev - 1
                timeRef.current = newVal
                return newVal
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [isActive, timeRef])

    // Monitor for finish (if loaded with 0/negative)
    // Monitor for finish (if loaded with 0/negative)
    useEffect(() => {
        // Guard against race condition where secondsLeft is 0 (from initial state)
        // but initialSeconds is > 0 (new prop received but effect hasn't synced state yet)
        if (initialSeconds > 0 && secondsLeft === 0) return

        if (secondsLeft <= 0 && isActive) {
            onTimeUpRef.current()
        }
    }, [secondsLeft, isActive, initialSeconds])


    const formatTime = (s: number) => {
        const h = Math.floor(s / 3600)
        const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0")
        const sec = (s % 60).toString().padStart(2, "0")
        return h > 0 ? `${h}:${m}:${sec}` : `${m}:${sec}`
    }

    const isCritical = secondsLeft < 300 // 5 mins

    return (
        <div className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full border text-xs md:text-sm transition-colors duration-300 ${isCritical ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 animate-pulse' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'}`}>
            <Clock className={`w-3 h-3 md:w-4 md:h-4 ${isCritical ? 'text-rose-500' : 'text-emerald-500'}`} />
            <div className="font-semibold tabular-nums">{formatTime(secondsLeft)}</div>
        </div>
    )
}

export const ExamTimer = memo(ExamTimerComponent)
