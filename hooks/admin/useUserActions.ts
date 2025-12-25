import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleUserBlock, deleteUserChatHistory, checkUserBanStatus } from '@/actions/admin/userActions';

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

    // Block/Unblock user mutation
    const toggleBlockMutation = useMutation({
        mutationFn: async () => {
            const result = await toggleUserBlock(userId);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result;
        },
        onSuccess: (data) => {
            toast.success(`User ${data.action} successfully`);
            setIsBanned(data.action === 'blocked');
            queryClient.invalidateQueries({ queryKey: ['student-details', userId] });
        },
        onError: (error: any) => {
            toast.error('Failed to update user status: ' + error.message);
        }
    });

    // Delete chat history mutation
    const deleteChatMutation = useMutation({
        mutationFn: async () => {
            const result = await deleteUserChatHistory(userId);
            if (!result.success) {
                throw new Error(result.error);
            }
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

            // Check current ban status
            const statusResult = await checkUserBanStatus(userId);
            if (!statusResult.success) {
                throw new Error(statusResult.error);
            }

            const currentlyBanned = statusResult.isBanned ?? false;
            setIsBanned(currentlyBanned);
            setConfirmAction(currentlyBanned ? 'unblock' : 'block');
            setBlockDialogOpen(true);
        } catch (error: any) {
            toast.error('Failed to check user status: ' + error.message);
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
