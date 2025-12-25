import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { toggleUserBlock, deleteUserChatHistory, checkUserBanStatus } from '@/actions/admin/userActions';
import { createClient } from '@/lib/supabase/client';

interface UserActionsParams {
    userId: string;
    userName: string;
}

export function useUserActions({ userId, userName }: UserActionsParams) {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [isBanned, setIsBanned] = useState<boolean | null>(null);

    // Confirmation dialog states
    const [blockDialogOpen, setBlockDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<'block' | 'unblock' | null>(null);

    // Prepare Supabase client for RPC calls
    const supabase = createClient();

    // Block/Unblock user mutation using RPC
    const toggleBlockMutation = useMutation({
        mutationFn: async () => {
            // Using RPC instead of Server Action to avoid Cloudflare 404s
            const { data, error } = await supabase.rpc('toggle_user_ban', {
                target_user_id: userId
            });

            if (error) throw error;

            // Check formatted response from RPC
            // Expected: { success: true, action: 'blocked' | 'unblocked' }
            const result = data as any;
            if (!result.success) throw new Error(result.error || 'Failed to toggle ban');

            return result;
        },
        onSuccess: (data: any) => {
            toast.success(`User ${data.action} successfully`);
            setIsBanned(data.action === 'blocked');
            queryClient.invalidateQueries({ queryKey: ['student-details', userId] });
        },
        onError: (error: any) => {
            toast.error('Failed to update user status: ' + error.message);
        }
    });

    // Delete chat history mutation - Now using RPC
    const deleteChatMutation = useMutation({
        mutationFn: async () => {
            const { data, error } = await supabase.rpc('delete_user_chat_history', {
                target_user_id: userId
            });

            if (error) throw error;

            const result = data as any;
            if (!result.success) throw new Error(result.error || 'Failed to delete chat history');

            return result;
        },
        onSuccess: () => {
            toast.success('Chat history deleted successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to delete chat history: ' + error.message);
        }
    });

    // Block/Unblock handler - opens confirmation dialog
    const handleToggleBlock = async () => {
        try {
            setIsLoading(true);

            // Check current ban status via RPC
            const { data, error } = await supabase.rpc('check_user_ban_status', {
                target_user_id: userId
            });

            if (error) throw error;

            const result = data as any;
            if (!result.success) throw new Error(result.error);

            const currentlyBanned = result.isBanned ?? false;
            setIsBanned(currentlyBanned);
            setConfirmAction(currentlyBanned ? 'unblock' : 'block');
            setBlockDialogOpen(true);
        } catch (error: any) {
            console.error('Ban status check failed:', error);
            // Fallback: If RPC fails (e.g. not created yet), default to 'block' logic but warn
            // toast.error('Failed to check status: ' + error.message);
            // For smoother UX before SQL is applied, we might assume unblocked
            toast.error(`Error checking status: ${error.message}. ensure admin_rpc_functions.sql is applied.`);
        } finally {
            setIsLoading(false);
        }
    };

    // Confirm block/unblock action
    const confirmToggleBlock = async () => {
        await toggleBlockMutation.mutateAsync();
    };

    // Delete chat handler - opens confirmation dialog
    const handleDeleteChat = () => {
        setDeleteDialogOpen(true);
    };

    // Confirm delete chat action
    const confirmDeleteChat = async () => {
        await deleteChatMutation.mutateAsync();
    };

    // Edit profile handler - opens edit dialog
    const handleEditProfile = () => {
        setEditProfileOpen(true);
    };

    return {
        handleToggleBlock,
        handleDeleteChat,
        handleEditProfile,
        confirmToggleBlock,
        confirmDeleteChat,
        isLoading: isLoading || toggleBlockMutation.isPending || deleteChatMutation.isPending,
        isBlocking: toggleBlockMutation.isPending,
        isDeleting: deleteChatMutation.isPending,
        isBanned,
        // Dialog states
        blockDialogOpen,
        setBlockDialogOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        editProfileOpen,
        setEditProfileOpen,
        confirmAction,
        userName,
    };
}
