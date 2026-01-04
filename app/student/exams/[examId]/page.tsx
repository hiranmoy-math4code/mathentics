"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useCurrentUser } from "@/hooks/student/useCurrentUser"
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

  // Auth check + Tenant membership verification
  // Replace manual auth with hook
  const { data: userProfile, isLoading: isAuthLoading } = useCurrentUser()

  // Effect to handle redirection based on auth state
  useEffect(() => {
    if (!isAuthLoading) {
      if (!userProfile) {
        router.push("/auth/login")
      } else {
        // Check for tenant membership (optional secondary check if needed, 
        // but usually handled by layout or middleware. We can keep a simple check here if strict)
        const checkTenant = async () => {
          // simplified check or trust the layout
          // For now, if we have a userProfile, we assume basic access is okay, 
          // but if strict tenant logic is needed, we can keep it inside a condition
          const { data: membership } = await supabase
            .from('user_tenant_memberships')
            .select('id, is_active')
            .eq('user_id', userProfile.id)
            .eq('is_active', true)
            .single()

          if (!membership) {
            console.error(`[EXAM] User ${userProfile.email} missing tenant membership`)
            router.push('/auth/login?error=Account setup incomplete. Please login again.')
          } else {
            setIsAuthChecking(false)
          }
        }
        checkTenant()
      }
    }
  }, [userProfile, isAuthLoading, router, supabase])

  if (isAuthChecking || isAuthLoading) {
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
          router.push(`/student/results/attempt/${attemptId}`)
        }}
      />
    </LessonContext.Provider>
  )
}
