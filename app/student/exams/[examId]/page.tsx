"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { EmbeddedExam } from "@/components/EmbeddedExam"
import LessonContext from "@/context/LessonContext"
import { Loader2 } from "lucide-react"

export default function ExamPanelSections() {
  const supabase = createClient()
  const router = useRouter()
  const { examId } = useParams() as { examId: string }
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const isRetake = searchParams.get('retake') === 'true'
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  // Auth check (Redundant but safe)
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push("/auth/login")
      setIsAuthChecking(false)
    }
    checkUser()
  }, [router, supabase])

  if (isAuthChecking) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    // Mock the LessonContext as EmbeddedExam expects it, but we don't need lesson tracking here.
    <LessonContext.Provider value={{ markComplete: () => { }, isCompleted: false }}>
      <EmbeddedExam
        examId={examId}
        isRetake={isRetake}
        onExit={() => router.push("/student/dashboard")}
        onSuccessfulSubmit={(attemptId) => {
          // In standalone mode, we redirect to the specialized results page instead of showing inline results
          router.push(`/student/results/${attemptId}?attemptId=${attemptId}`)
        }}
      />
    </LessonContext.Provider>
  )
}
