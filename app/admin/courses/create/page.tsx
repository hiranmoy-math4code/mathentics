"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().optional(),
    price: z.coerce.number().min(0, {
        message: "Price must be a positive number.",
    }),
    category: z.string().min(1, {
        message: "Please select a category.",
    }),
    level: z.enum(["beginner", "intermediate", "advanced", "all"]),
    course_type: z.enum(["course", "test_series"]),
    thumbnail_url: z.string().optional(),
    duration_months: z.coerce.number().int().positive().optional().nullable(),
});

export default function CreateCoursePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category: "",
            level: "all",
            course_type: "course",
            thumbnail_url: "",
            duration_months: null,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                toast.error("You must be logged in to create a course");
                return;
            }

            // MULTI-TENANT: Get tenant ID from user's membership
            const { data: membership } = await supabase
                .from('user_tenant_memberships')
                .select('tenant_id')
                .eq('user_id', user.id)
                .eq('is_active', true)
                .limit(1)
                .single();

            if (!membership) {
                toast.error("No tenant membership found. Please contact support.");
                return;
            }

            const { data, error } = await supabase
                .from("courses")
                .insert([
                    {
                        tenant_id: membership.tenant_id, // MULTI-TENANT: Required for RLS
                        creator_id: user.id,
                        title: values.title,
                        description: values.description,
                        price: values.price,
                        category: values.category,
                        level: values.level,
                        course_type: values.course_type,
                        thumbnail_url: values.thumbnail_url,
                        duration_months: values.duration_months,
                        is_published: false,
                    },
                ])
                .select()
                .single();

            if (error) {
                throw error;
            }

            toast.success("Course created successfully");
            router.push(`/admin/courses/${data.id}/builder`);
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error("Failed to create course");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Create New Course</h1>
                <p className="text-muted-foreground">
                    Start by entering the basic details of your course.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="thumbnail_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Thumbnail</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Upload a cover image for your course (600x400px, max 300KB).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Advanced React Patterns" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the name that will be displayed in the marketplace.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Briefly describe what students will learn..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="0" step="0.01" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Set to 0 for a free course.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="iit_jam">IIT-JAM Mathematics</SelectItem>
                                            <SelectItem value="csir_net">CSIR NET Mathematical Sciences</SelectItem>
                                            <SelectItem value="gate">GATE Mathematics</SelectItem>
                                            <SelectItem value="foundation">Foundation Courses</SelectItem>
                                            <SelectItem value="advanced">Advanced Topics</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Level</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                        <SelectItem value="all">All Levels</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="duration_months"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Duration (Months)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        step="1"
                                        placeholder="Leave empty for lifetime access"
                                        {...field}
                                        value={field.value ?? ''}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            field.onChange(value === '' ? null : parseInt(value));
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Number of months the course will be accessible after enrollment. Leave empty for lifetime access.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="course_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="course">Course</SelectItem>
                                        <SelectItem value="test_series">Test Series</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Courses appear in the courses section, test series appear in the test series section.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.back()}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Course
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
