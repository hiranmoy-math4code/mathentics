'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

/**
 * Update course metadata (title and/or thumbnail_url)
 */
export async function updateCourseMetadata(data: {
    courseId: string;
    title?: string;
    thumbnailUrl?: string;
}) {
    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { error: 'Unauthorized' };
        }

        // Check admin permission
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin') {
            return { error: 'Admin access required' };
        }

        // Prepare update data
        const updateData: any = {
            updated_at: new Date().toISOString()
        };

        if (data.title !== undefined) {
            updateData.title = data.title;
        }

        if (data.thumbnailUrl !== undefined) {
            updateData.thumbnail_url = data.thumbnailUrl;
        }

        // Update course
        const { data: course, error } = await supabase
            .from('courses')
            .update(updateData)
            .eq('id', data.courseId)
            .select()
            .single();

        if (error) {
            console.error('Course update error:', error);
            throw new Error(`Failed to update course: ${error.message}`);
        }

        // Revalidate relevant paths
        revalidatePath('/admin/courses');
        revalidatePath(`/admin/courses/${data.courseId}`);
        revalidatePath(`/admin/courses/${data.courseId}/builder`);
        revalidatePath(`/courses/${data.courseId}`);

        return { success: true, data: course };
    } catch (error: any) {
        console.error('updateCourseMetadata error:', error);
        return { error: error?.message || 'Failed to update course metadata' };
    }
}

/**
 * Upload course thumbnail to Supabase Storage
 */
export async function uploadCourseThumbnail(data: {
    courseId: string;
    file: File;
}) {
    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { error: 'Unauthorized' };
        }

        // Check admin permission
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin') {
            return { error: 'Admin access required' };
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(data.file.type)) {
            return { error: 'Invalid file type. Please upload a JPG, PNG, or WebP image.' };
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (data.file.size > maxSize) {
            return { error: 'File size too large. Maximum size is 5MB.' };
        }

        // Get current course to check for existing thumbnail
        const { data: course } = await supabase
            .from('courses')
            .select('thumbnail_url')
            .eq('id', data.courseId)
            .single();

        // Delete old thumbnail if exists
        if (course?.thumbnail_url) {
            const oldPath = course.thumbnail_url.split('/').pop();
            if (oldPath) {
                await supabase.storage
                    .from('course-thumbnails')
                    .remove([`${data.courseId}/${oldPath}`]);
            }
        }

        // Generate unique filename
        const fileExt = data.file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${data.courseId}/${fileName}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('course-thumbnails')
            .upload(filePath, data.file, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            throw new Error(`Failed to upload file: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('course-thumbnails')
            .getPublicUrl(filePath);

        // Update course with new thumbnail URL
        const { error: updateError } = await supabase
            .from('courses')
            .update({
                thumbnail_url: publicUrl,
                updated_at: new Date().toISOString()
            })
            .eq('id', data.courseId);

        if (updateError) {
            console.error('Course update error:', updateError);
            // Try to clean up uploaded file
            await supabase.storage
                .from('course-thumbnails')
                .remove([filePath]);
            throw new Error(`Failed to update course: ${updateError.message}`);
        }

        // Revalidate relevant paths
        revalidatePath('/admin/courses');
        revalidatePath(`/admin/courses/${data.courseId}`);
        revalidatePath(`/admin/courses/${data.courseId}/builder`);
        revalidatePath(`/courses/${data.courseId}`);

        return { success: true, data: { url: publicUrl } };
    } catch (error: any) {
        console.error('uploadCourseThumbnail error:', error);
        return { error: error?.message || 'Failed to upload thumbnail' };
    }
}

/**
 * Delete course thumbnail
 */
export async function deleteCourseThumbnail(courseId: string) {
    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { error: 'Unauthorized' };
        }

        // Check admin permission
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin') {
            return { error: 'Admin access required' };
        }

        // Get current course
        const { data: course } = await supabase
            .from('courses')
            .select('thumbnail_url')
            .eq('id', courseId)
            .single();

        // Delete thumbnail from storage
        if (course?.thumbnail_url) {
            const oldPath = course.thumbnail_url.split('/').pop();
            if (oldPath) {
                await supabase.storage
                    .from('course-thumbnails')
                    .remove([`${courseId}/${oldPath}`]);
            }
        }

        // Update course to remove thumbnail URL
        const { error: updateError } = await supabase
            .from('courses')
            .update({
                thumbnail_url: null,
                updated_at: new Date().toISOString()
            })
            .eq('id', courseId);

        if (updateError) {
            console.error('Course update error:', updateError);
            throw new Error(`Failed to update course: ${updateError.message}`);
        }

        // Revalidate relevant paths
        revalidatePath('/admin/courses');
        revalidatePath(`/admin/courses/${courseId}`);
        revalidatePath(`/admin/courses/${courseId}/builder`);
        revalidatePath(`/courses/${courseId}`);

        return { success: true };
    } catch (error: any) {
        console.error('deleteCourseThumbnail error:', error);
        return { error: error?.message || 'Failed to delete thumbnail' };
    }
}
