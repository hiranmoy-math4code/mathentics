import { useMemo } from 'react';
import { Lesson } from '@/lib/types';

export interface LessonProgress {
    lesson_id: string;
    completed: boolean;
}

export interface LessonAccessInfo {
    isSequentialLocked: boolean;
    prerequisiteId?: string;
    prerequisiteTitle?: string;
}

/**
 * Client-side hook to check lesson access based on sequential unlock settings
 * NO DATABASE QUERIES - Uses existing cached data for instant performance
 */
export function useLessonAccess(
    lessons: Lesson[],
    lessonProgress: LessonProgress[] | undefined
) {
    return useMemo(() => {
        const accessMap = new Map<string, LessonAccessInfo>();

        // Create a quick lookup map for completed lessons
        const completedSet = new Set(
            lessonProgress
                ?.filter(p => p.completed)
                .map(p => p.lesson_id) || []
        );

        // Check each lesson for sequential locks
        lessons.forEach(lesson => {
            // Check if this lesson has sequential unlock enabled
            if (lesson.sequential_unlock_enabled && lesson.prerequisite_lesson_id) {
                // Check if prerequisite is completed
                const prereqCompleted = completedSet.has(lesson.prerequisite_lesson_id);

                if (!prereqCompleted) {
                    // Find prerequisite lesson for title
                    const prereq = lessons.find(l => l.id === lesson.prerequisite_lesson_id);

                    accessMap.set(lesson.id, {
                        isSequentialLocked: true,
                        prerequisiteId: lesson.prerequisite_lesson_id,
                        prerequisiteTitle: prereq?.title || 'Previous Lesson'
                    });
                } else {
                    // Prerequisite completed, lesson is unlocked
                    accessMap.set(lesson.id, {
                        isSequentialLocked: false
                    });
                }
            } else {
                // No sequential unlock, lesson is always accessible
                accessMap.set(lesson.id, {
                    isSequentialLocked: false
                });
            }
        });

        return accessMap;
    }, [lessons, lessonProgress]);
}
