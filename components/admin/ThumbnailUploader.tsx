"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ThumbnailUploaderProps {
    currentThumbnail: string | null;
    onUpload: (file: File) => void;
    onDelete?: () => void;
    isUploading?: boolean;
    isDeleting?: boolean;
    courseId: string;
}

export function ThumbnailUploader({
    currentThumbnail,
    onUpload,
    onDelete,
    isUploading = false,
    isDeleting = false,
    courseId
}: ThumbnailUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a JPG, PNG, or WebP image.');
            return;
        }

        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size must be less than 5MB.');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        onUpload(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleDelete = () => {
        if (onDelete && confirm('Are you sure you want to remove this thumbnail?')) {
            setPreviewUrl(null);
            onDelete();
        }
    };

    const displayThumbnail = previewUrl || currentThumbnail;
    const isLoading = isUploading || isDeleting;

    return (
        <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Course Thumbnail
            </label>

            {displayThumbnail ? (
                <div className="relative group">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                        <Image
                            src={displayThumbnail}
                            alt="Course thumbnail"
                            fill
                            className="object-cover"
                        />
                        {isLoading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-white animate-spin" />
                            </div>
                        )}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleButtonClick}
                            disabled={isLoading}
                            className="h-8 bg-white/90 hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-900"
                        >
                            <Upload className="h-3 w-3 mr-1" />
                            Replace
                        </Button>
                        {onDelete && (
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="h-8"
                            >
                                <X className="h-3 w-3 mr-1" />
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    className={cn(
                        "relative w-full aspect-video rounded-lg border-2 border-dashed transition-colors cursor-pointer",
                        dragActive
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                            : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600",
                        isLoading && "opacity-50 cursor-not-allowed"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleButtonClick}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                        {isLoading ? (
                            <>
                                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Uploading...
                                </p>
                            </>
                        ) : (
                            <>
                                <ImageIcon className="h-10 w-10 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        PNG, JPG, or WebP (max 5MB)
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleChange}
                className="hidden"
                disabled={isLoading}
            />
        </div>
    );
}
