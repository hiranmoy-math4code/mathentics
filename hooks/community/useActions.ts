import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useTenantId } from "@/lib/tenant";

const supabase = createClient();

export const useSendMessage = (channelId: string) => {
    const queryClient = useQueryClient();
    const tenantId = useTenantId();

    return useMutation({
        mutationFn: async ({ content, attachments = [] }: { content: string; attachments?: any[] }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error("Not authenticated");
            }

            const { data, error } = await supabase
                .from("community_messages")
                .insert({
                    tenant_id: tenantId,
                    channel_id: channelId,
                    user_id: user.id,
                    content,
                    attachments,
                })
                .select(`
                    *,
                    profiles!user_id (
                        full_name,
                        avatar_url,
                        role
                    )
                `)
                .single();

            if (error) {
                throw error;
            }

            return data;
        },
        onMutate: async ({ content, attachments = [] }) => {
            await queryClient.cancelQueries({ queryKey: ["community", "messages", channelId] });

            const previousMessages = queryClient.getQueryData(["community", "messages", channelId]);

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return { previousMessages };

            // Fetch user profile for optimistic message
            const { data: profile } = await supabase
                .from("profiles")
                .select("full_name, avatar_url, role")
                .eq("id", user.id)
                .single();

            const optimisticMessage = {
                id: `temp-${Date.now()}`,
                content,
                channel_id: channelId,
                user_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                attachments,
                is_pinned: false,
                is_announcement: false,
                parent_message_id: null,
                profiles: profile || {
                    full_name: user.user_metadata.full_name || "You",
                    avatar_url: user.user_metadata.avatar_url,
                    role: user.user_metadata.role || "student",
                },
                community_reactions: [],
            };

            queryClient.setQueryData(["community", "messages", channelId], (old: any) => {
                if (!old) return { pages: [[optimisticMessage]], pageParams: [0] };

                const newPages = [...old.pages];
                newPages[0] = [optimisticMessage, ...newPages[0]];

                return {
                    ...old,
                    pages: newPages,
                };
            });

            return { previousMessages };
        },
        onSuccess: () => {
            toast.success("Message sent!");
        },
        onError: (error: any, _, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(["community", "messages", channelId], context.previousMessages);
            }

            const errorMessage = error.message || "Failed to send message";
            toast.error(errorMessage);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["community", "messages", channelId] });
        },
    });
};

export const useToggleReaction = () => {
    const queryClient = useQueryClient();
    const tenantId = useTenantId();

    return useMutation({
        mutationFn: async ({ messageId, emoji }: { messageId: string; emoji: string }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // Check if reaction exists
            const { data: existing } = await supabase
                .from("community_reactions")
                .select("id")
                .eq("message_id", messageId)
                .eq("user_id", user.id)
                .eq("emoji", emoji)
                .eq("tenant_id", tenantId)
                .maybeSingle();

            if (existing) {
                // Remove reaction
                const { error } = await supabase
                    .from("community_reactions")
                    .delete()
                    .eq("id", existing.id)
                    .eq("tenant_id", tenantId);
                if (error) throw error;
            } else {
                // Add reaction
                const { error } = await supabase
                    .from("community_reactions")
                    .insert({
                        tenant_id: tenantId,
                        message_id: messageId,
                        user_id: user.id,
                        emoji,
                    });
                if (error) throw error;
            }
        },
        onSuccess: (_, { messageId }) => {
            // Invalidate specific message or channel messages
            queryClient.invalidateQueries({ queryKey: ["community", "messages"] });
        },
        onError: () => {
            toast.error("Failed to update reaction");
        }
    });
};
