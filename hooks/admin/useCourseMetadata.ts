import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCourseMetadata, uploadCourseThumbnail, deleteCourseThumbnail } from '@/actions/admin/updateCourseMetadata';
import { toast } from 'sonner';

/**
 * Hook for updating course title
 */
export function useUpdateCourseTitle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ courseId, title }: { courseId: string; title: string }) => {
            const result = await updateCourseMetadata({ courseId, title });
            if (result.error) throw new Error(result.error);
            return result.data;
        },
        onSuccess: (data, variables) => {
            toast.success('Course title updated successfully');
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['course', variables.courseId] });
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            queryClient.invalidateQueries({ queryKey: ['course-analytics', variables.courseId] });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update course title');
        }
    });
}

/**
 * Hook for uploading course thumbnail
 */
export function useUploadCourseThumbnail() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ courseId, file }: { courseId: string; file: File }) => {
            const result = await uploadCourseThumbnail({ courseId, file });
            if (result.error) throw new Error(result.error);
            return result.data;
        },
        onSuccess: (data, variables) => {
            toast.success('Thumbnail uploaded successfully');
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['course', variables.courseId] });
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            queryClient.invalidateQueries({ queryKey: ['course-analytics', variables.courseId] });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to upload thumbnail');
        }
    });
}

/**
 * Hook for deleting course thumbnail
 */
export function useDeleteCourseThumbnail() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (courseId: string) => {
            const result = await deleteCourseThumbnail(courseId);
            if (result.error) throw new Error(result.error);
            return result;
        },
        onSuccess: (data, courseId) => {
            toast.success('Thumbnail removed successfully');
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['course', courseId] });
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            queryClient.invalidateQueries({ queryKey: ['course-analytics', courseId] });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to remove thumbnail');
        }
    });
}

/**
 * Combined hook for all course metadata operations
 */
export function useCourseMetadata() {
    return {
        updateTitle: useUpdateCourseTitle(),
        uploadThumbnail: useUploadCourseThumbnail(),
        deleteThumbnail: useDeleteCourseThumbnail()
    };
}
