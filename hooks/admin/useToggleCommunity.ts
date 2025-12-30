import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";
import { toast } from "sonner";

export const useToggleCommunity = () => {
    const queryClient = useQueryClient();
    const tenantId = getTenantId(); // ✅ Get tenant ID

    return useMutation({
        mutationFn: async ({ courseId, enabled }: { courseId: string; enabled: boolean }) => {
            const supabase = createClient();
            const { error } = await supabase
                .from("courses")
                .update({ community_enabled: enabled })
                .eq("id", courseId)
                .eq("tenant_id", tenantId); // ✅ SECURITY FIX

            if (error) throw error;
        },
        onSuccess: (_, { courseId, enabled }) => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
            queryClient.invalidateQueries({ queryKey: ["course", courseId] });
            queryClient.invalidateQueries({ queryKey: ["admin", "courses-with-channels"] });
            toast.success(enabled ? "Community enabled!" : "Community disabled");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to toggle community");
            console.error("Toggle community error:", error);
        }
    });
};
