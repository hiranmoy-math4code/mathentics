"use client";

import { useState, useRef, useEffect } from "react";
import { Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableTitleProps {
    value: string;
    onSave: (newValue: string) => void;
    isLoading?: boolean;
    className?: string;
    placeholder?: string;
}

export function EditableTitle({
    value,
    onSave,
    isLoading = false,
    className,
    placeholder = "Enter title"
}: EditableTitleProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    useEffect(() => {
        setEditValue(value);
    }, [value]);

    const handleSave = () => {
        const trimmedValue = editValue.trim();
        if (trimmedValue && trimmedValue !== value) {
            onSave(trimmedValue);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <Input
                    ref={inputRef}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={cn("h-8 text-sm", className)}
                    disabled={isLoading}
                />
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSave}
                    disabled={isLoading || !editValue.trim()}
                    className="h-8 w-8 p-0"
                >
                    <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="h-8 w-8 p-0"
                >
                    <X className="h-4 w-4 text-red-600" />
                </Button>
            </div>
        );
    }

    return (
        <div className="group flex items-center gap-2">
            <h2
                className={cn(
                    "font-semibold text-lg truncate text-slate-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                    className
                )}
                onClick={() => setIsEditing(true)}
                title={`${value} (Click to edit)`}
            >
                {value}
            </h2>
            <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <Edit2 className="h-3 w-3 text-slate-400" />
            </Button>
        </div>
    );
}
