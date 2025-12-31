-- Enable RLS on tables if not already enabled
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 1. POLICIES FOR CHAT_SESSIONS

-- Allow users to see their own sessions
DROP POLICY IF EXISTS "Users can view own sessions" ON public.chat_sessions;
CREATE POLICY "Users can view own sessions"
ON public.chat_sessions FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to create their own sessions (and enforce they own them)
DROP POLICY IF EXISTS "Users can create own sessions" ON public.chat_sessions;
CREATE POLICY "Users can create own sessions"
ON public.chat_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 2. POLICIES FOR CHAT_MESSAGES

-- Allow users to view messages from their sessions
DROP POLICY IF EXISTS "Users can view messages from own sessions" ON public.chat_messages;
CREATE POLICY "Users can view messages from own sessions"
ON public.chat_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.chat_sessions
    WHERE id = chat_messages.session_id
    AND user_id = auth.uid()
  )
);

-- Allow users to insert messages into their sessions (ANY ROLE: 'user' or 'ai')
-- This fixes the error where saving 'ai' messages was blocked
DROP POLICY IF EXISTS "Users can insert messages into own sessions" ON public.chat_messages;
CREATE POLICY "Users can insert messages into own sessions"
ON public.chat_messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_sessions
    WHERE id = session_id -- Note: session_id is from the NEW row
    AND user_id = auth.uid()
  )
);
