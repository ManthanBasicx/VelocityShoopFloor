import { useState } from "react";
import { Resource } from "@/types/resource";
import { useToast } from "@/components/ui/use-toast";

export const useResourceStatus = (
  initialStatus: Resource["status"] = "Unassigned",
  onStatusChange?: (newStatus: Resource["status"]) => void
) => {
  const [status, setStatus] = useState<Resource["status"]>(initialStatus);
  const { toast } = useToast();

  const handleStatusChange = (newStatus: Resource["status"]) => {
    // Prevent unnecessary updates
    if (status === newStatus) return;

    // Show toast notification for status change
    toast({
      title: "Status Updated",
      description: `Status changed from ${status} to ${newStatus}`,
    });

    setStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const isWIP = status === "WIP";
  const canChangeWorkOrder = !isWIP;

  return {
    status,
    handleStatusChange,
    isWIP,
    canChangeWorkOrder,
  };
};