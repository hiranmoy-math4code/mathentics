"use client";

import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useCommunityModal } from "@/context/CommunityModalContext";
import { cn } from "@/lib/utils";

interface CommunityButtonProps {
    className?: string;
    variant?: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

export function CommunityButton({ className, variant, size }: CommunityButtonProps) {
    const { openCommunity } = useCommunityModal();

    return (
        <Button
            onClick={() => openCommunity()}
            className={cn("bg-emerald-600 hover:bg-emerald-700 text-white gap-2", className)}
            variant={variant}
            size={size}
        >
            <Users className="h-4 w-4" />
            Go to Community
        </Button>
    );
}
