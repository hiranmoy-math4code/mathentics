DROP POLICY IF EXISTS "Users can create messages in own sessions" ON public.chat_messages;
CREATE POLICY "Authenticated users can create messages" ON public.chat_messages 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);